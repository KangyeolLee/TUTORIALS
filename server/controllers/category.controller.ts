import { Request, Response, NextFunction } from 'express';
import categoryServices from '../services/category.services';

class CategoryController {
  async findCategories(req: Request, res: Response, next: NextFunction) {
    try {
      // userId 로그인 세션에서 가져와야 함!!
      const userId = 1;
      const categories = await categoryServices.findCategories(userId);
      // const categories = 'hello';

      return res.status(200).json({
        categories,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
