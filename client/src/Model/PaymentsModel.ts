import { createPayment, deletePayment, getPayments } from '@/api/payment';
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
    this.paymentList = res.data.payments;
    return this.notify(this.key, {
      paymentList: this.paymentList,
    });
  }

  async deleteUserPayment(id: number) {
    const res = await deletePayment(id);
    this.paymentList = this.paymentList.filter(
      (category) => category.id !== id
    );
    return this.notify(this.key, {
      paymentList: this.paymentList,
    });
  }

  async createUserPayment(type: string) {
    const res = await createPayment(type);
    this.paymentList = [
      ...this.paymentList,
      {
        type,
        id: res.data.insertId,
      },
    ];
    return this.notify(this.key, {
      paymentList: this.paymentList,
    });
  }
}

export default new PaymentsModel();
