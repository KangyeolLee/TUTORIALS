import ProductService from '@/services/product.service';
import { Request, Response } from 'express';
import ApiResponse from '@/api/middlewares/response-format';
import HttpStatusCode from '@/types/statusCode';

class ProductController {
  async getProduct(req: Request, res: Response) {
    //테스트용 id
    // const data = await ProductService.getProducts(60704);
    // res.status(200).json({ success: true, data, content: data.content });
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    const details = await ProductService.getProductById(id);
    const thumbnails = await ProductService.getProductThumbnails(id);

    if (!details) {
      return ApiResponse(
        res,
        HttpStatusCode.BAD_REQUEST,
        '해당 상품이 존재하지 않습니다'
      );
    }

    const result = { details, thumbnails };
    return ApiResponse(res, HttpStatusCode.OK, '해당 상품 조회 성공', result);
  }

  async serchProduct(req: Request, res: Response) {
    const { q } = req.query;
    const searchData = await ProductService.searchProductTitle(q as string);
    res.json(searchData);
  }

  async getProducts(req: Request, res: Response) {
    const { category, limit } = req.query;
    const products = await ProductService.getProducts({ category, limit });
    if (!products) {
      ApiResponse(res, HttpStatusCode.BAD_REQUEST, '상품이 존재하지 않습니다');
    } else {
      ApiResponse(res, HttpStatusCode.OK, '상품 조회 성공', products);
    }
  }

  async getBestProducts(req: Request, res: Response) {
    const { limit = 8 } = req.query;
    const products = await ProductService.getBestProudcts(+limit);
    if (!products) {
      ApiResponse(res, HttpStatusCode.BAD_REQUEST, '상품이 존재하지 않습니다');
    } else {
      ApiResponse(res, HttpStatusCode.OK, '상품 조회 성공', products);
    }
  }

  async getRecommandProducts(req: Request, res: Response) {
    const { limit = 8 } = req.query;
    const products = await ProductService.getRecommandProducts(+limit);

    if (!products) {
      ApiResponse(res, HttpStatusCode.BAD_REQUEST, '상품이 존재하지 않습니다');
    } else {
      ApiResponse(res, HttpStatusCode.OK, '상품 조회 성공', products);
    }
  }

  async getCategories(req: Request, res: Response) {
    const categories = await ProductService.getCategories();

    if (!categories) {
      ApiResponse(res, HttpStatusCode.BAD_REQUEST, '카테고리가 없습니다');
    } else {
      ApiResponse(res, HttpStatusCode.OK, null, categories);
    }
  }
}

export default new ProductController();
