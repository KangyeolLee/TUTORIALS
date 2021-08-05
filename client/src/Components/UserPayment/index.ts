import './styles';
import Component from '@/Core/Component';
import { PaymentsModelType, PaymentType, Props, State } from '@/utils/types';
import { asyncSetState, html } from '@/utils/helper';
import { svgIcons } from '@/assets/svgIcons';
import PaymentsModel from '@/Model/PaymentsModel';
import PaymentElem from '../PaymentElem';

interface UserPaymentState extends State {
  paymentList?: PaymentType[];
}

export default class UserPayment extends Component<UserPaymentState, Props> {
  paymentModel!: PaymentsModelType;

  async setup() {
    this.paymentModel = PaymentsModel;
    this.paymentModel.subscribe(this.paymentModel.key, this);

    asyncSetState(this.paymentModel.getUserPayments());
  }

  template() {
    return html`
      <section class="content-box-title user-payment-title">
        <span class="title">지불 수단</span>
        <span class="add-button">${svgIcons.add}</span>
      </section>
      <ul class="user-payments-icons">
        ${this.$state?.paymentList === undefined
          ? ''
          : this.$state.paymentList
              .map((payment) => {
                return PaymentElem(payment);
              })
              .join('')}
      </ul>
    `;
  }

  setUnmount() {
    this.paymentModel.unsubscribe(this.paymentModel.key, this);
  }

  setEvent() {
    this.addEvent('click', '.user-payments', this.handleClick.bind(this));
  }

  handleDeletePayment(target: HTMLElement) {
    const id = Number(
      target.closest<HTMLDivElement>('.payment-icon')?.dataset.id
    );

    // TODO category delete => 삭제된 카테고리 '미분류'로 설정
    asyncSetState(this.paymentModel.deleteUserPayment(id));
  }

  handleAddPayment(target: HTMLElement) {
    const randomColor = `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
    const isEditing = this.$target.querySelector('.payment-icon[data-id="-1"]');
    if (isEditing) {
      const color = isEditing.querySelector('.icon') as HTMLElement;
      color.style.backgroundColor = randomColor;
      return;
    }

    const paymentsIcon = this.$target.querySelector(
      '.user-payments-icons'
    ) as HTMLElement;
    const icon = document.createElement('div');
    icon.innerHTML = PaymentElem({ type: '', id: -1 });
    const newPayment = icon.firstElementChild as HTMLElement;
    paymentsIcon.append(newPayment);

    const paymentType = newPayment.querySelector(
      '.payment-type'
    ) as HTMLDivElement;

    paymentType.contentEditable = 'true';
    const selection = window.getSelection() as Selection;
    const range = document.createRange();
    range.collapse(true);
    range.setStart(newPayment as Node, 0);
    range.setEnd(newPayment as Node, 1);
    selection.removeAllRanges();
    selection.addRange(range);

    // blur: focus가 해제될 때(버블링 X)
    paymentType.addEventListener(
      'blur',
      function handleBlur(this: any) {
        paymentType.removeEventListener('blur', handleBlur);
        paymentType.removeAttribute('contentEditable');

        const editedText = paymentType.textContent as string;

        if (editedText.length === 0) {
          newPayment.remove();
          return;
        }
        // TODO category update

        asyncSetState(this.paymentModel.createUserPayment(editedText));
      }.bind(this)
    );

    paymentType.addEventListener(
      'keydown',
      function (e: KeyboardEvent) {
        if (e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
          paymentType.blur();
        }
      }.bind(this)
    );
  }

  handleClick(e: Event) {
    const target = e.target as HTMLElement;
    const deleteIcon = target.closest<HTMLDivElement>('.delete-icon');
    const addButton = target.closest<HTMLDivElement>('.add-button');
    if (deleteIcon) {
      this.handleDeletePayment(target);
      return;
    }
    if (addButton) {
      this.handleAddPayment(target);
      return;
    }
  }
}
