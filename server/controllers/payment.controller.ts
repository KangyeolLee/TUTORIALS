import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import paymentServices from '../services/payment.services';
import { extractInsertId, getPayload } from '../utils/helper';

const PaymentServices = Container.get(paymentServices);

class PaymentController {
  async findPayments(req: Request, res: Response, next: NextFunction) {
    try {
      // userId 로그인 세션에서 가져와야 함!!
      const userId = getPayload(req);
      const payments = await PaymentServices.findPayments(userId);

      return res.status(200).json({
        payments,
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      // userId 로그인 세션에서 가져와야 함!!
      const userId = getPayload(req);
      const { type } = req.body;

      const result = await paymentServices.createPayment({ userId, type });
      const insertId = extractInsertId(result);

      return res.status(200).json({
        insertId,
        type,
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getPayload(req);
      const { paymentId } = req.params;
      const result = await PaymentServices.deleteUserPaymentByUserId({
        userId,
        id: +paymentId,
      });

      return res.status(200).json({
        result,
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PaymentController();
