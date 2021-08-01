import { Request, Response, NextFunction } from 'express';
import categoryServices from '../services/category.services';
import { ResultRawType } from '../types/types';
import { getPayload } from './../utils/getPayload';

class CategoryController {
  async findCategories(req: Request, res: Response, next: NextFunction) {
    try {
      // userId 로그인 세션에서 가져와야 함!!
      const userId = getPayload(req);
      console.log(userId);

      const categories = await categoryServices.findCategories(userId);

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
      // userId 로그인 세션에서 가져와야 함!!
      const userId = getPayload(req);

      const { type, color } = req.body;
      const result = await categoryServices.createCategory({
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
      // 선택한 카테고리의 고유 id 값을 의미
      const { categoryId } = req.params;
      const result = await categoryServices.deleteUserCategoryByUserId({
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
