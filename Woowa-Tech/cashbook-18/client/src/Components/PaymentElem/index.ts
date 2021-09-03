import './styles';
import { svgIcons } from '@/assets/svgIcons';
import { PaymentType } from '@/utils/types';

const PaymentElem = (payment: PaymentType) => `
<div class="payment-icon" data-id="${payment.id}">
  <span class="card-icon"><span class="card-magnetic"></span></span>
  <span class="payment-type">${payment.type}</span>
  <div class="delete-icon">${svgIcons.delete}</div>
</div>
`;

export default PaymentElem;
