import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';
import { svgIcons } from '@/assets/svgIcons';
import Main from '@/Components/Main';
import MainModel from '@/Model/MainModel';
import { IHistory } from '@/utils/types';

export default class MainView extends Component<State, Props> {
  model: any;
  inputCondition: boolean[] = new Array();

  setup() {
    this.model = MainModel;
  }

  template() {
    return html`
      <section class="main-wrapper container">
        <ul class="input-bar">
          <li>
            <label for="date">일자</label>
            <input type="text" name="date" />
          </li>
          <li>
            <label for="category">분류</label>
            <input name="category" placeholder="선택하세요" />
          </li>
          <li>
            <label for="content">내용</label>
            <input type="text" name="content" placeholder="입력하세요" />
          </li>
          <li>
            <label for="payment">결제수단</label>
            <input name="payment" placeholder="선택하세요" />
          </li>
          <li>
            <label for="price">금액</label>
            <div id="data-input">
              ${svgIcons.minus}
              <input type="text" name="price" placeholder="선택하세요" />원
            </div>
          </li>
          <button id="main-input-submit">${svgIcons.check}</button>
        </ul>
        <div class="main"></div>
      </section>
    `;
  }

  mounted() {
    const $main = this.$target.querySelector('.main') as HTMLElement;
    new Main($main);
  }

  setEvent() {
    this.addEvent(
      'click',
      '#main-input-submit',
      this.handleSubmitButton.bind(this)
    );
  }

  setUnmount() {
    // 구독 해제
    this.model.unsubscribe(this.model.key, this);
  }

  handleSubmitButton() {
    const $dateInput = this.$target.querySelector(
      'input[name="date"]'
    ) as HTMLInputElement;
    const $categoryInput = this.$target.querySelector(
      'input[name="category"]'
    ) as HTMLInputElement;
    const $contentInput = this.$target.querySelector(
      'input[name="content"]'
    ) as HTMLInputElement;
    const $paymentInput = this.$target.querySelector(
      'input[name="payment"]'
    ) as HTMLInputElement;
    const $priceInput = this.$target.querySelector(
      'input[name="price"]'
    ) as HTMLInputElement;

    const newHistory: IHistory = {
      date: $dateInput.value,
      type: 0,
      category: $categoryInput.value,
      content: $contentInput.value,
      payment: $paymentInput.value,
      price: parseInt($priceInput.value),
    };

    this.model.addHistory(newHistory);

    $dateInput.value = '';
    $categoryInput.value = '';
    $contentInput.value = '';
    $paymentInput.value = '';
    $priceInput.value = '';
  }
}
