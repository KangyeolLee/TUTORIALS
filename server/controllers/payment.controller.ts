import { Request, Response, NextFunction } from 'express';
import paymentServices from '../services/payment.services';
import { ResultRawType } from '../types/types';
import { getPayload } from '../utils/getPayload';

class PaymentController {
  async findPayments(req: Request, res: Response, next: NextFunction) {
    try {
      // userId 로그인 세션에서 가져와야 함!!
      const userId = getPayload(req);
      const payments = await paymentServices.findPayments(userId);

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
      const {
        raw: { insertId },
      }: ResultRawType = result!;

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
      // 선택한 카테고리의 고유 id 값을 의미
      const { paymentId } = req.params;
      const result = await paymentServices.deleteUserPaymentByUserId({
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
