export default class Breadcrumb {
  constructor({ $app, initialState }) {
    this.state = initialState;
        
    this.$target = document.createElement('nav');
    this.$target.classList.add('Breadcrumb');
    $app.append(this.$target);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `<div class="nav-item">root</div>${
      this.state.map(
        (node, index) => `<div class="nav-item" data-indx="${index}">${node.name}</div>`
      ).join('')
    }`;
  }
}