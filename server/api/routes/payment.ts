import { Router } from 'express';
import PaymentController from '../../controllers/payment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

export default (app: Router) => {
  app.use('/payments', router);

  router.get(`/`, authMiddleware, PaymentController.findPayments);

  router.post(`/`, authMiddleware, PaymentController.createPayment);

  router.delete(
    `/:paymentId`,
    authMiddleware,
    PaymentController.deleteCategory
  );
};
