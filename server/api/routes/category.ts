import { Router } from 'express';
import CategoryController from '../../controllers/category.controller';
import { authMiddleware } from './../middlewares/auth.middleware';

const router = Router();

export default (app: Router) => {
  app.use('/categories', router);

  router.get(`/`, authMiddleware, CategoryController.findCategories);

  router.post(`/`, authMiddleware, CategoryController.createCategory);

  router.delete(
    `/:categoryId`,
    authMiddleware,
    CategoryController.deleteCategory
  );
};
