import request from "./api.js";
import Breadcrumb from "./BreadCrumb.js";
import Nodes from "./Nodes.js";
import ImageView from './ImageView.js';
import Loading from './Loading.js';
import Error from "./Error.js";

const cache = {};

export default class App {
  constructor($app) {
    this.state = {
      isRoot: true,          // 현재 페이지가 메인페이지인지 판단하는 플래그
      isLoading: true,        // 로딩여부 체크값
      error: null,            // 에러가 발생하는 경우의 에러메시지
      nodes: [],              // 현재 화면에 따라 출력해야할 nodes 데이터
      depth: [],              // 상위 디렉토리에서 하위 디렉토리까지 이동 시 거쳐온 서브 디렉토리 
      selectedFilePath: null  // 이미지뷰어에서 출력할 이미지의 경로
    }

    // _variables는 클래스에서 private member를 의미하는 일종의 컨벤션
    // 공식적으로 private 키워드를 지원하지 않기 때문에 사용하는 컨벤션으로 문법적으로 강제되지 않는 규약
    // stage-3 단계에서 js class 에서도 private 접근제어자를 사용할 수 있는 문법(#)을 지원하고 있으나
    // 일부 모던 브라우저를 제외하면 아직 정식으로 채택되지 않아 사용이 불가능하므로 여기서는 사용하지 않음
    // 타입스크립트를 사용한다면 private 접근제어자 사용이 가능하나, 타입스크립트 역시 내부적으로 자바스크립트로 돌아가기 때문에
    // 별도로 외부에서 접근이 불가능하도록 변환한다.

    this._breadcurmb = new Breadcrumb({
      $app,
      initialState: this.state.depth,
      onClick: (index) => this._breadcurmbOnClick(index),
    });

    this._nodes = new Nodes({
      $app,
      initialState: {
        isRoot: this.state.isRoot,
        nodes: this.state.nodes,
      },
      onClick: (node) => this._nodesOnClick(node),
      onBackClick: () => this._nodesOnBackClick(),
    });

    this._imageView = new ImageView({
      $app,
      initialState: this.state.selectedFilePath,
    });

    this._loading = new Loading({
      $app,
      initialState: this.state.isLoading,
    })

    this._error = new Error({
      $app,
      initialState: this.state.error,
    });

    this.init();
  }

  async _getNodesData(id) {
    this.setState({
      ...this.state,
      selectedFilePath: null,
      isLoading: true,
    });

    try {
      const nodes = await request(id);
      return nodes;
    } catch (error) {
      this.setState({
        ...this.state,
        error: error.message,
      });
    } finally {
      this.setState({
        ...this.state,
        selectedFilePath: null,
        isLoading: false,
      })
    }
  }

  // App 컴포넌트도 렌더링을 위한 별도의 setState를 가지고 있음
  // 해당 메서드에서는 자신의 state뿐만아니라 자신이 관리하는 하위 컴포넌트의
  // setState까지 모두 관리하여 렌더링 로직을 수행
  setState(nextState) {
    this.state = nextState;
    this._breadcurmb.setState(this.state.depth);
    this._nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    this._imageView.setState(this.state.selectedFilePath);
    this._loading.setState(this.state.isLoading);
    this._error.setState(this.state.error);
  }

  async init() {
    const rootNodes = await this._getNodesData();
    this.setState({
      ...this.state,
      isRoot: true,
      nodes: rootNodes,
    });

    cache.root = rootNodes;
  }

  _breadcurmbOnClick(index) {
    if (index === null) {
      this.setState({
        ...this.state,
        selectedFilePath: null,
        isRoot: true,
        depth: [],
        nodes: cache.root,
      });

      return;
    }

    if (index === this.state.depth.length-1) {
      return;
    }

    const nextState = { ...this.state };
    const nextDepth = nextState.depth.slice(0, index+1);

    this.setState({
      ...nextState,
      isRoot: false,
      selectedFilePath: null,
      depth: nextDepth,
      nodes: cache[nextDepth[nextDepth.length-1].id],
    });
  }

  async _nodesOnClick(node) {
    if (node.type === 'DIRECTORY') {
      if (cache.hasOwnProperty(node.id)) {
        this.setState({
          ...this.state,
          selectedFilePath: null,
          nodes: cache[node.id],
          depth: [...this.state.depth, node],
          isRoot: false,
        });

        return;
      }

      const nextNodes = await this._getNodesData(node.id);
      this.setState({
        ...this.state,
        depth: [...this.state.depth, node],
        nodes: nextNodes,
        selectedFilePath: null,
        isRoot: false,
      });

      cache[node.id] = nextNodes;
    } else if (node.type === 'FILE') {
      this.setState({
        ...this.state,
        selectedFilePath: node.filePath,
        isRoot: false,
      });
    }
  }

  _nodesOnBackClick() {
    const nextState = { ...this.state };
    nextState.depth.pop();
          
    const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length-1].id;

    if (!prevNodeId) {
      this.setState({
        ...nextState,
        isRoot: true,
        selectedFilePath: null,
        nodes: cache.root,
      });

      return;
    }

    this.setState({
      ...nextState,
      isRoot: false,
      selectedFilePath: null,
      nodes: cache[prevNodeId],
    });        
  }
}
