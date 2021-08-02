import { getPayments } from '@/api/payment';
import Observable from '@/Core/Observable';
import { PaymentType } from '@/utils/types';

class PaymentsModel extends Observable {
  key: string = 'payment';
  paymentList: PaymentType[];

  constructor() {
    super();
    this.paymentList = [];
  }

  async getUserPayments() {
    const res = await getPayments();
    const nextPaymentList = res.data.payments;
    return this.notify(this.key, {
      paymentList: nextPaymentList,
    });
  }
}

export default new PaymentsModel();
