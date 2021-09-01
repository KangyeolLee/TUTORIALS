export default class Breadcrumb {
  constructor({ $app, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick;
        
    this.$target = document.createElement('nav');
    this.$target.classList.add('Breadcrumb');
    $app.append(this.$target);

    this._addClickEventListener();
  }

  _addClickEventListener() {
    this.$target.addEventListener('click', e => {
      const $navItem = e.target.closest('.nav-item');

      if ($navItem) {
        const { index } = $navItem.dataset;
        this.onClick(index ? +index : null);
      }
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `<div class="nav-item">root</div>${
      this.state.map(
        (node, index) => `<div class="nav-item" data-index="${index}">${node.name}</div>`
      ).join('')
    }`;
  }
}