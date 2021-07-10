import request from "./api";
import Breadcrumb from "./BreadCrumb";
import Nodes from "./Nodes";

export default class App {
  constructor($app) {
    this.state = {
      isRoot: false,  // 현재 페이지가 메인페이지인지 판단하는 플래그
      nodes: [],      // 현재 화면에 따라 출력해야할 nodes 데이터
      depth: [],      // 상위 디렉토리에서 하위 디렉토리까지 이동 시 거쳐온 서브 디렉토리 
    }

    // _variables는 클래스에서 private member를 의미하는 일종의 컨벤션
    // 공식적으로 private 키워드를 지원하지 않기 때문에 사용하는 컨벤션으로 문법적으로 강제되지 않는 규약
    // stage-3 단계에서 js class 에서도 private 접근제어자를 사용할 수 있는 문법(#)을 지원하고 있으나
    // 일부 모던 브라우저를 제외하면 아직 정식으로 채택되지 않아 사용이 불가능하므로 여기서는 사용하지 않음
    // 타입스크립트를 사용한다면 private 접근제어자 사용이 가능하나, 타입스크립트 역시 내부적으로 자바스크립트로 돌아가기 때문에
    // 별도로 외부에서 접근이 불가능하도록 변환한다.

    this._breadcurmb = new Breadcrumb({
      $app,
      initialState: this.state.depth
    });

    this._nodes = new Nodes({
      $app,
      initialState: {
        isRoot: this.state.isRoot,
        nodes: this.state.nodes,
      },
      onClick: (node) => {
        if (node.type === 'DIRECTORY') {
          // Node의 타입이 디렉토리인 경우 넘겨주는 콜백 작성
        } else if (node.type === 'FILE') {
          // Node의 타입이 파일인 경우 넘겨주는 콜백 작성
        }
      }
    });

    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this._breadcurmb.setState(this.state.depth);
    this._nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  }

  async init() {
    try {
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (error) {
      throw new Error(`통신 중 에러가 발생했습니다: ${error.message}`);
    }
  }
}