import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import categoryServices from '../services/category.services';
import { ResultRawType } from '../types/types';
import { getPayload } from './../utils/getPayload';

const CategoryServices = Container.get(categoryServices);

class CategoryController {
  async findCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getPayload(req);
      const categories = await CategoryServices.findCategories(userId);

      return res.status(200).json({
        categories,
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getPayload(req);
      const { type, color } = req.body;
      const result = await CategoryServices.createCategory({
        userId,
        type,
        color,
      });
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
      const { categoryId } = req.params;
      const result = await CategoryServices.deleteUserCategoryByUserId({
        userId,
        id: +categoryId,
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

export default new CategoryController();
