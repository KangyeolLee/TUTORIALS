const IMAGE_PATH_PREFIX = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public`;

export default class ImageView {
  constructor({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.classList.add('Modal', 'ImageView');
    this.$target.setAttribute('tabindex', -1);

    this._addEventListener();

    $app.append(this.$target);

    this.render();
  }

  _addEventListener () {
    this.$target.addEventListener('click', e => {
      const className = e.target.className;

      if (className !== 'Modal ImageView') {
        return;
      }

      this.setState(null);
    });

    this.$target.addEventListener('keydown', e => {
      if(e.key === 'Escape') {
        this.setState(null);
      }
    })
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `<div class="content">
      ${this.state 
        ? `<img src="${IMAGE_PATH_PREFIX}${this.state}" />`
        : ''}  
    </div>`;

    this.$target.style.display = this.state ? 'block' : 'none';
    this.$target.focus();
  }
}