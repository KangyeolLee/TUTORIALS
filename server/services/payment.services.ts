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
      const payment = await getCustomRepository(
        PaymentRepository
      ).createPaymentForUser(type);
      const {
        raw: { insertId: paymentId },
      }: ResultRawType = payment;

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
