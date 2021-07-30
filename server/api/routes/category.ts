import { Router } from 'express';
import categoryController from '../../controllers/category.controller';

const router = Router();

export default (app: Router) => {
  app.use('/categories', router);

  router.get(`/`, categoryController.findCategories);

  router.post(`/`, categoryController.createCategory);

  router.delete(`/:categoryId`, categoryController.deleteCategory);
};
