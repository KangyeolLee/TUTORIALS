import { Service } from 'typedi';
import { getCustomRepository } from 'typeorm';
import {
  PaymentRepository,
  UserPaymentRepository,
} from '../repositories/payment.repository';
import {
  PaymentType,
  ResultRawType,
  UserPaymentForRemoval,
} from '../types/types';

@Service()
export default class PaymentService {
  async findPayments(userId: number) {
    try {
      const payments = await getCustomRepository(
        UserPaymentRepository
      ).findAllByUserId(userId);
      return payments;
    } catch (error) {
      throw new Error('[결제수단 쿼리 에러] ' + error);
    }
  }

  async createPayment({ userId, type }: PaymentType) {
    try {
      const existedPayment = await getCustomRepository(
        PaymentRepository
      ).findPaymentByType(type);

      // ID가 있는 경우에는 추가하지 않고 해당 페이먼트ID로 유저페이먼트에 추가
      let paymentId;
      if (existedPayment) {
        paymentId = existedPayment.id;
      } else {
        const category = await getCustomRepository(
          PaymentRepository
        ).createPaymentForUser(type);
        paymentId = category.raw.insertId.paymentId;
      }

      const result = await getCustomRepository(
        UserPaymentRepository
      ).createUserPaymentByUserId({ userId, paymentId });

      return result;
    } catch (error) {
      throw new Error('[결제수단 쿼리 에러] ' + error);
    }
  }

  async deleteUserPaymentByUserId({ userId, id }: UserPaymentForRemoval) {
    try {
      const result = await getCustomRepository(
        UserPaymentRepository
      ).deleteUserPaymentByUserId({ userId, id });

      return result;
    } catch (error) {
      throw new Error('[카테고리 쿼리 에러]' + error);
    }
  }
}
