import Component from '@/Core/Component';
import './styles';
import {
  html,
  asyncSetState,
  addComma,
  makeDateForm,
  extractDate,
} from '@/utils/helper';
import { svgIcons } from '@/assets/svgIcons';
import {
  Props,
  HistoryModelType,
  IValidationType,
  IHistory,
} from '@/utils/types';
import HistoryModel from '@/Model/HistoryModel';
import CategoryDropdown from '@/Components/CategoryDropdown/index';
import PaymentDropdown from '@/Components/PaymentDropdown';
import dayjs from 'dayjs';

type editorModeType = 'edit' | 'new';
interface InputBarState {
  editorMode: editorModeType;
  historyId?: number;
}

export default class InputBar extends Component<InputBarState, Props> {
  model!: HistoryModelType;
  editorMode!: editorModeType;
  inputCondition: boolean[] = new Array();
  validation!: IValidationType;
  editState!: InputBarState;
  date!: {
    year: number;
    month: number;
    day: number;
  };

  setup() {
    this.classIDF = 'InputBar';
    this.model = HistoryModel;
    this.date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    };
    this.validation = {
      isExpense: true,
      date: true,
      category: false,
      content: false,
      payment: false,
      price: false,
    };
    this.$state = {
      editorMode: 'new',
      historyId: -1,
    };
  }

  template() {
    return html`
      <div class="input-bar-content">
        ${svgIcons.add}
        <div class="input-content-wrapper">
          <div class="input-bar-title">
            <span
              >내역
              ${this.$state!.editorMode === 'new' ? '추가' : '수정'}하기</span
            >
            <span class="input-submit-button">${svgIcons.delete}</span>
          </div>
          <ul class="input-bar">
            <li class="check-btn">
              <div class="input-list-item outcome" data-type="0" active>
                지출
              </div>
              <div class="input-list-item income" data-type="1">수입</div>
            </li>
            <li class="input-list-item date-list">
              <label for="date">일자</label>
              <div class="input-wrapper">
                <input
                  class="date-picker"
                  value=${dayjs(new Date()).format('YYYY-MM-DD')}
                  type="date"
                  min="2000-01-01"
                  max="2050-12-31"
                />
                <input
                  type="hidden"
                  type="text"
                  maxlength="4"
                  name="date-year"
                  placeholder="2021"
                  class="input-date"
                  value=${new Date().getFullYear()}
                />
                <input
                  type="hidden"
                  type="text"
                  maxlength="2"
                  name="date-month"
                  placeholder="08"
                  class="input-date"
                  value=${new Date().getMonth() + 1}
                />
                <input
                  type="hidden"
                  type="text"
                  maxlength="2"
                  name="date-day"
                  placeholder="31"
                  class="input-date"
                  value=${new Date().getDate()}
                />
              </div>
            </li>
            <li class="input-list-item">
              <label for="category" class="dropdown-selector">분류</label>
              <span class="selected-category">미선택</span>
              <input name="category" type="hidden" />
              <div class="category-dropdown-wrapper"></div>
            </li>
            <li class="input-list-item">
              <label for="payment" class="dropdown-selector">결제수단</label>
              <span class="selected-payment">미선택</span>
              <input name="payment" type="hidden" />
              <div class="payment-dropdown-wrapper"></div>
            </li>
            <li class="input-list-item content-list">
              <label for="content">내용</label>
              <div class="input-wrapper">
                <input
                  class="content-input"
                  type="text"
                  name="content"
                  placeholder="내용을 입력하세요..."
                />
                <span class="focus-border"></span>
              </div>
            </li>
            <li class="input-list-item price-list">
              <label for="price">금액</label>
              <div id="data-input">
                ${svgIcons.minus}
                <div class="input-wrapper">
                  <input
                    class="price-input"
                    type="text"
                    name="price"
                    placeholder="가격을 입력하세요..."
                  />
                  <span class="focus-border"></span>
                </div>
                <span>원</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  mounted() {
    const $categoryDropdown = this.$target.querySelector(
      '.category-dropdown-wrapper'
    ) as HTMLElement;
    new CategoryDropdown($categoryDropdown);

    const $paymentDropdown = this.$target.querySelector(
      '.payment-dropdown-wrapper'
    ) as HTMLElement;
    new PaymentDropdown($paymentDropdown);
  }

  setEvent() {
    this.addEvent('click', 'label[for="price"]', () => {
      const target = this.$target.querySelector(
        '.input-list-item.price-list'
      ) as HTMLElement;
      target.classList.add('open');
    });
    this.addEvent('click', 'label[for="content"]', () => {
      const target = this.$target.querySelector(
        '.input-list-item.content-list'
      ) as HTMLElement;
      target.classList.add('open');
    });
    this.addEvent('click', 'label[for="category"]', (e: MouseEvent) => {
      const target = <HTMLElement>e.target;
      const categoryDropdown = target.parentElement?.querySelector(
        '.category-dropdown-wrapper'
      ) as HTMLElement;
      categoryDropdown.classList.toggle('open');
    });
    this.addEvent('click', 'label[for="payment"]', (e: MouseEvent) => {
      const target = <HTMLElement>e.target;
      const paymentDropdown = target.parentElement?.querySelector(
        '.payment-dropdown-wrapper'
      ) as HTMLElement;
      paymentDropdown.classList.toggle('open');
    });
    this.addEvent(
      'click',
      '.input-bar-content:not([clicked])',
      (e: MouseEvent) => {
        const target = (<HTMLElement>e.target).closest(
          '.input-bar-content'
        ) as HTMLDivElement;
        this.initAllInputValues();
        target.setAttribute('clicked', '');
      }
    );

    this.addEvent(
      'click',
      '.check-btn',
      this.handleHistoryTypeButton.bind(this)
    );

    this.addEvent(
      'click',
      '.input-submit-button',
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
      'inputchangeCategory',
      this.$target.className,
      this.validateCategory.bind(this),
      true
    );

    this.addEvent(
      'input',
      'input[name="content"]',
      this.validateContent.bind(this)
    );

    this.addEvent(
      'inputchangePayment',
      this.$target.className,
      this.validatePayment.bind(this),
      true
    );

    this.addEvent(
      'input',
      'input[name="price"]',
      this.validatePrice.bind(this)
    );

    this.addEvent(
      'edit-history',
      this.$target.className,
      (e: CustomEvent) => this.handleEditHistory(e.detail),
      true
    );
    // document.addEventListener('edit-history', ((e: CustomEvent) =>
    //   this.handleEditHistory(e.detail)) as EventListener);
  }

  handleEditHistory(detail: IHistory) {
    this.setState({
      editorMode: 'edit',
      historyId: detail.id,
    });
    this.validation = {
      isExpense: detail.type ? false : true,
      date: true,
      category: true,
      content: true,
      payment: true,
      price: true,
    };
    this.checkValidated();
    // TODO 분류와 결제 수단 가져오기
    const inputBar = this.$target.querySelector(
      '.input-bar-content'
    ) as HTMLDivElement;
    const historyType = inputBar.querySelector(
      `.check-btn>[data-type="${detail.type}"]`
    ) as HTMLDivElement;
    const anotherHistoryType = inputBar.querySelector(
      `.check-btn>[data-type="${detail.type ? 0 : 1}"]`
    ) as HTMLDivElement;
    const category = inputBar.querySelector(
      `[name="category"]`
    ) as HTMLInputElement;
    const selectedCategory = inputBar.querySelector(
      `.selected-category`
    ) as HTMLSpanElement;
    const dateYear = inputBar.querySelector(
      `[name="date-year"]`
    ) as HTMLInputElement;
    const dateMonth = inputBar.querySelector(
      `[name="date-month"]`
    ) as HTMLInputElement;
    const dateDay = inputBar.querySelector(
      `[name="date-day"]`
    ) as HTMLInputElement;
    const content = inputBar.querySelector(
      `[name="content"]`
    ) as HTMLInputElement;
    const payment = inputBar.querySelector(
      `[name="payment"]`
    ) as HTMLInputElement;
    const selectedPayment = inputBar.querySelector(
      `.selected-payment`
    ) as HTMLSpanElement;
    const datepicker = inputBar.querySelector(
      '[type="date"]'
    ) as HTMLInputElement;
    const price = inputBar.querySelector(`[name="price"]`) as HTMLInputElement;
    const date = extractDate(detail.createdAt);

    historyType?.setAttribute('active', '');
    anotherHistoryType?.removeAttribute('active');
    category.value = detail.category;
    selectedCategory.innerText = detail.category;
    dateYear.value = date.year.toString();
    dateMonth.value = date.month.toString();
    dateDay.value = date.day.toString();
    datepicker.value = dayjs(`${date.year}-${date.month}-${date.day}`).format(
      'YYYY-MM-DD'
    );
    content.value = detail.content;
    payment.value = detail.payment;
    selectedPayment.innerText = detail.payment;
    price.value = addComma(String(detail.price));

    inputBar.setAttribute('clicked', '');
  }

  initAllInputValues() {
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
    const dateYear = this.$target.querySelector(
      `[name="date-year"]`
    ) as HTMLInputElement;
    const dateMonth = this.$target.querySelector(
      `[name="date-month"]`
    ) as HTMLInputElement;
    const dateDay = this.$target.querySelector(
      `[name="date-day"]`
    ) as HTMLInputElement;
    const $selectedPayment = this.$target.querySelector(
      '.selected-payment'
    ) as HTMLElement;
    const $selectedCategory = this.$target.querySelector(
      '.selected-category'
    ) as HTMLElement;
    const categoryDropdown = this.$target.querySelector(
      '.category-dropdown-wrapper'
    ) as HTMLElement;
    const paymentDropdown = this.$target.querySelector(
      '.payment-dropdown-wrapper'
    ) as HTMLElement;
    const target = this.$target.querySelector(
      '.input-bar-content'
    ) as HTMLDivElement;
    const submitBtn = this.$target.querySelector(
      '.input-submit-button'
    ) as HTMLElement;
    const historyType = this.$target.querySelector(
      `.input-list-item.outcome`
    ) as HTMLDivElement;
    const anotherHistoryType = this.$target.querySelector(
      `.input-list-item.income`
    ) as HTMLDivElement;

    $categoryInput.value = '';
    $selectedCategory.innerText = '미선택';
    $selectedCategory.classList.remove('valid');
    dateYear.value = `${new Date().getFullYear()}`;
    dateMonth.value = `${new Date().getMonth() + 1}`;
    dateDay.value = `${new Date().getDate()}`;
    $contentInput.value = '';
    $paymentInput.value = '';
    $selectedPayment.innerText = '미선택';
    $selectedPayment.classList.remove('valid');
    $priceInput.value = '';
    categoryDropdown.classList.remove('open');
    paymentDropdown.classList.remove('open');
    target.removeAttribute('clicked');
    submitBtn.removeAttribute('active');
    historyType.setAttribute('active', '');
    anotherHistoryType.removeAttribute('active');

    this.validation = {
      isExpense: true,
      date: true,
      category: false,
      content: false,
      payment: false,
      price: false,
    };

    this.setState({
      editorMode: 'new',
      historyId: -1,
    });
  }

  handleSubmitButton() {
    if (!this.isValidated()) {
      this.initAllInputValues();
      return;
    }

    const { historyId } = this.$state!;
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
    const dateYear = this.$target.querySelector(
      `[name="date-year"]`
    ) as HTMLInputElement;
    const dateMonth = this.$target.querySelector(
      `[name="date-month"]`
    ) as HTMLInputElement;
    const dateDay = this.$target.querySelector(
      `[name="date-day"]`
    ) as HTMLInputElement;
    const datepicker = this.$target.querySelector(
      'input[type="date"]'
    ) as HTMLInputElement;

    const newHistory: IHistory = {
      // createdAt: makeDateForm({
      //   year: +dateYear.value,
      //   month: +dateMonth.value,
      //   day: +dateDay.value,
      // }),
      createdAt: datepicker.value,
      type: this.validation.isExpense ? 0 : 1,
      category: $categoryInput.value,
      content: $contentInput.value,
      payment: $paymentInput.value,
      price: parseInt($priceInput.value.replace(/,/g, '')),
      id: historyId !== -1 ? historyId : (Math.random() * 10) >> 0,
    };

    const { editorMode } = this.$state!;
    if (editorMode === 'new') asyncSetState(this.model.addHistory(newHistory));
    else if (editorMode === 'edit')
      asyncSetState(this.model.updateHistory(newHistory));

    this.initAllInputValues();
    this.checkValidated();
  }

  validateYear(e: KeyboardEvent) {
    let year: number = parseInt((<HTMLInputElement>e.target).value);
    if (!year) return;

    if (year > 2050) year = 2050;
    else if (year < 2000) year = 2000;
    (<HTMLInputElement>e.target).value = String(year);
    this.date.year = year;
  }
  validateMonth(e: KeyboardEvent) {
    let month: number = parseInt((<HTMLInputElement>e.target).value);
    if (!month) return;

    if (month > 12) month = 12;
    else if (month < 1) month = 1;
    (<HTMLInputElement>e.target).value = dayjs(month).format('MM');
    this.date.month = month;
  }
  validateDay(e: KeyboardEvent) {
    const lastDay = new Date(this.date.year, this.date.month, 0).getDate();
    let day: number = parseInt((<HTMLInputElement>e.target).value);
    if (!day) return;

    if (day > lastDay) day = lastDay;
    else if (day < 1) day = 1;
    (<HTMLInputElement>e.target).value = String(day);
    this.date.day = day;
  }

  validateCategory(e: Event) {
    const $selectedCategory = this.$target.querySelector(
      '.selected-category'
    ) as HTMLElement;
    const input = (<CustomEvent>e).detail;
    if (input.value === '') this.validation.category = false;
    else {
      this.validation.category = true;
      $selectedCategory.innerText = input.value;
      $selectedCategory.classList.add('valid');
    }
    this.checkValidated();
  }
  validateContent(e: KeyboardEvent) {
    if ((<HTMLInputElement>e.target).value === '')
      this.validation.content = false;
    else this.validation.content = true;
    this.checkValidated();
  }
  validatePayment(e: Event) {
    const $selectedPayment = this.$target.querySelector(
      '.selected-payment'
    ) as HTMLElement;
    const input = (<CustomEvent>e).detail;
    if (input.value === '') this.validation.payment = false;
    else {
      this.validation.payment = true;
      $selectedPayment.innerText = input.value;
      $selectedPayment.classList.add('valid');
    }
    this.checkValidated();
  }
  validatePrice(e: KeyboardEvent) {
    if ((<HTMLInputElement>e.target).value === '')
      this.validation.price = false;
    else {
      const price = (<HTMLInputElement>e.target).value.replace(/,/g, '');
      (<HTMLInputElement>e.target).value = addComma(price);
      this.validation.price = true;
    }
    this.checkValidated();
  }

  checkValidated(): void {
    const submitBtn = this.$target.querySelector(
      '.input-submit-button'
    ) as HTMLElement;

    if (this.isValidated()) {
      submitBtn.innerHTML = svgIcons.check;
      submitBtn.setAttribute('active', '');
    } else {
      submitBtn.innerHTML = svgIcons.delete;
      submitBtn.removeAttribute('active');
    }
  }

  handleHistoryTypeButton(e: MouseEvent) {
    const target = (<HTMLElement>e.target).closest(
      '.input-list-item'
    ) as HTMLElement;
    if (!target) return;

    const type = Number(target.dataset.type);
    const otherType = target.parentNode?.querySelector(
      `[data-type="${+type ? 0 : 1}"]`
    ) as HTMLElement;
    this.validation.isExpense = +type ? false : true;
    otherType.removeAttribute('active');
    target.setAttribute('active', '');

    const priceIcon = this.$target.querySelector(
      '#data-input>svg'
    ) as HTMLElement;
    priceIcon.outerHTML = this.validation.isExpense
      ? svgIcons.minus
      : svgIcons.add;
  }

  isValidated(): boolean {
    const { date, category, content, payment, price } = this.validation;
    return date && category && content && payment && price;
  }

  setUnmount() {
    // 구독 해제
    this.model.unsubscribe(this.model.key, this);
  }
}
