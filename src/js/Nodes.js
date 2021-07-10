export default class Nodes {
  constructor({ $app, initialState, onClick, onBackClick }) {
    this.state = initialState;
    this.onClick = onClick;
    this.onBackClick = onBackClick;

    this.$target = document.createElement('ul');
    this.$target.classList.add('Nodes');
    $app.append(this.$target);

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if(this.state.nodes) {
      const nodesTemplate = this.state.nodes.map(node => {
        const path = node.type === "FILE" ? './assets/file.png' : './assets/directory.png';

        return `
          <div class="Node" data-node-id="${node.id}">
            <img src="${path}" alt="현재위치 아이콘 이미지" />
            <div>${node.name}</div>
          </div>
        `
      }).join('');

      this.$target.innerHTML = !this.state.isRoot 
        ? `<div class="Node"><img src="./assets/prev.png" alt="뒤로가기 버튼"/></div>${nodesTemplate}`
        : nodesTemplate; 
    }

    this.$target.querySelectorAll('.Node').forEach($node => {
      $node.addEventListener('click', e => {
        const { nodeId } = e.target.dataset;

        if (!nodeId) {
          this.onBackClick();
          return;
        }

        const selectedNode = this.state.nodes.find(node => node.id === nodeId);

        if (selectedNode) {
          this.onClick(selectedNode);
        }
      })
    })
  }
}