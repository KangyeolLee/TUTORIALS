import { Router } from 'express';
import paymentController from '../../controllers/payment.controller';

const router = Router();

export default (app: Router) => {
  app.use('/payments', router);

  router.get(`/`, paymentController.findPayments);

  router.post(`/`, paymentController.createPayment);

  router.delete(`/:paymentId`, paymentController.deleteCategory);
};
