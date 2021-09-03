import Component from '@/Core/Component';
import { Props, State, PaymentsModelType, PaymentType } from '@/utils/types';
import './styles';
import { asyncSetState, customEventEmitter, html } from '@/utils/helper';
import PaymentsModel from '@/Model/PaymentsModel';

interface UserPaymentState extends State {
  paymentList?: PaymentType[];
}

export default class PaymentDropdown extends Component<
  UserPaymentState,
  Props
> {
  paymentModel!: PaymentsModelType;
  $dropdownSlider!: HTMLElement;
  startX!: number;
  posX!: number;
  offsetLeft = 0;
  pressed: boolean = false;

  setup() {
    this.paymentModel = PaymentsModel;
    this.paymentModel.subscribe(this.paymentModel.key, this);

    this.$state = {
      paymentList: [],
    };

    asyncSetState(this.paymentModel.getUserPayments());
  }

  template() {
    const { paymentList } = this.$state!;
    return html`
      <ul class="payment-dropdown">
        ${paymentList
          ?.map(
            (payment) => `
          <li class="payment-list">${payment.type}</li>
        `
          )
          .join('')}
      </ul>
    `;
  }

  mounted() {
    this.$dropdownSlider = this.$target.querySelector(
      '.payment-dropdown'
    ) as HTMLElement;
  }

  handleClickOnList(e: MouseEvent) {
    const target = <HTMLElement>e.target;
    target.scrollIntoView();
    this.focusoutOtherLists();
    target.classList.add('clicked');
    const input = document.querySelector(
      'input[name="payment"]'
    ) as HTMLInputElement;
    const inputbarWrapper = document.querySelector(
      '.input-bar-wrapper'
    ) as HTMLElement;
    input.value = target.innerText;
    customEventEmitter(
      'inputchangePayment',
      { value: input.value },
      inputbarWrapper
    );
  }

  focusoutOtherLists() {
    const others = this.$target.querySelectorAll('.payment-list');
    others.forEach((list) => list.classList.remove('clicked'));
  }

  mouseDown(e: PointerEvent) {
    this.pressed = true;
    this.startX = e.pageX - this.$dropdownSlider.offsetLeft;
    this.$dropdownSlider.style.cursor = 'grabbing';
  }

  mouseEnter() {
    this.$dropdownSlider.style.cursor = 'grab';
  }

  mouseUp() {
    this.pressed = false;
    this.$dropdownSlider.style.cursor = 'grab';
    this.offsetLeft += this.startX - (this.posX ?? this.startX);
    const count = this.$dropdownSlider.childElementCount;
    const offsetWidth =
      this.$dropdownSlider.firstElementChild!.getBoundingClientRect().width;
    const totalWidth = count * offsetWidth;

    if (this.offsetLeft >= totalWidth / 2 - 150) {
      this.offsetLeft = totalWidth / 2 - 150;
    } else if (this.offsetLeft < 0) {
      this.offsetLeft = 0;
    }

    this.$dropdownSlider.scrollLeft = this.offsetLeft * 3;
  }

  mouseLeave() {
    this.pressed = false;
  }

  mouseMove(e: PointerEvent) {
    if (this.pressed) {
      this.posX = e.pageX;
    }
  }

  setEvent() {
    this.addEvent('click', '.payment-list', (e: MouseEvent) =>
      this.handleClickOnList(e)
    );
    this.addEvent('pointerdown', '.payment-dropdown', (e: PointerEvent) =>
      this.mouseDown(e)
    );
    this.addEvent('pointerup', '.payment-dropdown', () => this.mouseUp());
    this.addEvent('pointermove', '.payment-dropdown', (e: PointerEvent) =>
      this.mouseMove(e)
    );
    this.addEvent('pointerenter', '.payment-dropdown', () => this.mouseEnter());
    this.addEvent('pointerleave', '.payment-dropdown', () => this.mouseLeave());
  }

  setUnmount() {
    this.paymentModel.unsubscribe(this.paymentModel.key, this);
  }
}
