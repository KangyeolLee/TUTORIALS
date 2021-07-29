import { Router, Request, Response, NextFunction } from 'express';
import categoryController from '../../controllers/category.controller';

const router = Router();

export default (app: Router) => {
  app.use('/categories', router);

  router.get(`/`, categoryController.findCategories);

  router.post(`/`, (req: Request, res: Response, next: NextFunction) => {
    return res
      .json({
        message: 'ok',
        ok: true,
      })
      .status(200);
  });

  router.delete(
    `/:categoryId`,
    (req: Request, res: Response, next: NextFunction) => {
      return res
        .json({
          message: 'ok',
          ok: true,
        })
        .status(200);
    }
  );
};
