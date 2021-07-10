export default class App {
  constructor($app) {
    this.state = {
      isRoot: false,  // 현재 페이지가 메인페이지인지 판단하는 플래그
      nodes: [],      // 현재 화면에 따라 출력해야할 nodes 데이터
      depth: [],      // 상위 디렉토리에서 하위 디렉토리까지 이동 시 거쳐온 서브 디렉토리 
    }

    const breadcurmb = new Breadcrumb({
      $app,
      initialState: this.state.depth
    });

    const nodes = new Nodes({
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
  }
}