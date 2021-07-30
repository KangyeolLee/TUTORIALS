import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import { IValidationType, MainModelType, Props, State } from '@/utils/types';
import { svgIcons } from '@/assets/svgIcons';
import Main from '@/Components/Main';
import MainModel from '@/Model/MainModel';
import { IHistory } from '@/utils/types';

export default class MainView extends Component<State, Props> {
  model!: MainModelType;
  inputCondition: boolean[] = new Array();
  validation!: IValidationType;
  date!: {
    year: number;
    month: number;
    day: number;
  };

  setup() {
    this.model = MainModel;
    this.date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    };
    this.validation = {
      date: true,
      category: false,
      content: false,
      payment: false,
      price: false,
    };
  }

  template() {
    return html`
      <section class="main-wrapper container">
        <ul class="input-bar">
          <li>
            <label for="date">일자</label>
            <input
              type="text"
              maxlength="4"
              name="date-year"
              placeholder="2021"
              class="input-date"
              value=${new Date().getFullYear()}
            />
            <span>/</span>
            <input
              type="text"
              maxlength="2"
              name="date-month"
              placeholder="08"
              class="input-date"
              value=${new Date().getMonth() + 1}
            />
            <span>/</span>
            <input
              type="text"
              maxlength="2"
              name="date-day"
              placeholder="31"
              class="input-date"
              value=${new Date().getDate()}
            />
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

    // date
    this.addEvent(
      'input',
      'input[name="date-year"]',
      this.validateYear.bind(this)
    );
    this.addEvent(
      'input',
      'input[name="date-month"]',
      this.validateMonth.bind(this)
    );
    this.addEvent(
      'input',
      'input[name="date-day"]',
      this.validateDay.bind(this)
    );

    this.addEvent(
      'input',
      'input[name="category"]',
      this.validateCategory.bind(this)
    );
    this.addEvent(
      'input',
      'input[name="content"]',
      this.validateContent.bind(this)
    );
    this.addEvent(
      'input',
      'input[name="payment"]',
      this.validatePayment.bind(this)
    );
    this.addEvent(
      'input',
      'input[name="price"]',
      this.validatePrice.bind(this)
    );
  }

  setUnmount() {
    // 구독 해제
    this.model.unsubscribe(this.model.key, this);
  }

  handleSubmitButton() {
    if (!this.isValidated()) return;

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
      date: `${this.date.year}-${this.date.month}-${this.date.day}`,
      type: 0,
      category: $categoryInput.value,
      content: $contentInput.value,
      payment: $paymentInput.value,
      price: parseInt($priceInput.value),
    };

    this.model.addHistory(newHistory);

    $categoryInput.value = '';
    $contentInput.value = '';
    $paymentInput.value = '';
    $priceInput.value = '';

    this.validation = {
      date: true,
      category: false,
      content: false,
      payment: false,
      price: false,
    };
    this.checkValidated();
  }

  validateYear(e: HTMLInputElement) {
    let year: number = parseInt((<HTMLInputElement>e.target).value);
    if (!year) return;

    if (year > 2050) year = 2050;
    else if (year < 2000) year = 2000;
    (<HTMLInputElement>e.target).value = String(year);
    this.date.year = year;
  }
  validateMonth(e: HTMLInputElement) {
    let month: number = parseInt((<HTMLInputElement>e.target).value);
    if (!month) return;

    if (month > 12) month = 12;
    else if (month < 1) month = 1;
    (<HTMLInputElement>e.target).value = String(month);
    this.date.month = month;
  }
  validateDay(e: HTMLInputElement) {
    const lastDay = new Date(this.date.year, this.date.month, 0).getDate();
    let day: number = parseInt((<HTMLInputElement>e.target).value);
    if (!day) return;

    if (day > lastDay) day = lastDay;
    else if (day < 1) day = 1;
    (<HTMLInputElement>e.target).value = String(day);
    this.date.day = day;
  }

  validateCategory(e: HTMLInputElement) {
    if (e.target.value === '') this.validation.category = false;
    else this.validation.category = true;
    this.checkValidated();
  }
  validateContent(e: HTMLInputElement) {
    if (e.target.value === '') this.validation.content = false;
    else this.validation.content = true;
    this.checkValidated();
  }
  validatePayment(e: HTMLInputElement) {
    if (e.target.value === '') this.validation.payment = false;
    else this.validation.payment = true;
    this.checkValidated();
  }
  validatePrice(e: HTMLInputElement) {
    if (e.target.value === '') this.validation.price = false;
    else this.validation.price = true;
    this.checkValidated();
  }

  checkValidated(): void {
    const submitBtn = this.$target.querySelector(
      '#main-input-submit'
    ) as HTMLElement;
    if (this.isValidated()) submitBtn.setAttribute('active', '');
    else submitBtn.removeAttribute('active');
  }

  isValidated(): boolean {
    const { date, category, content, payment, price } = this.validation;
    return date && category && content && payment && price;
  }
}
