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

  setup() {
    this.paymentModel = PaymentsModel;
    this.paymentModel.subscribe(this.paymentModel.key, this);

    this.$state = {
      paymentList: [],
    };

    asyncSetState(this.paymentModel.getUserPayments());
  }

  template() {
    console.log(this.$state);
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

  handleClickOnList(e: MouseEvent) {
    const target = <HTMLElement>e.target;
    target.scrollIntoView();
    const input = document.querySelector(
      'input[name="payment"]'
    ) as HTMLInputElement;
    input.value = target.innerText;
    console.log(input, input.value);
    customEventEmitter('inputchangePayment', { value: input.value });
  }

  setEvent() {
    this.addEvent('click', '.payment-list', (e: MouseEvent) =>
      this.handleClickOnList(e)
    );
  }

  setUnmount() {
    this.paymentModel.unsubscribe(this.paymentModel.key, this);
  }
}
