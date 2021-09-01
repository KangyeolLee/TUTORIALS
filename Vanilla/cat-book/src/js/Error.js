export default class Error {
  constructor({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.classList.add('error');

    $app.append(this.$target);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if (this.state) {
      this.$target.innerHTML = `<div class="error-message">${this.state} (사유) <br/><br/> 새로고침(F5)를 누르세요!</div>`;
      this.$target.style.display = 'flex';
    }
  }
}