import { Router } from 'express';
import ProductController from '@/controllers/product.controller';
import wrapAsync from '@/utils/wrapAsync';
import authJWT from '@/api/middlewares/auth.middleware';
import multerS3 from '@/api/middlewares/s3.middleware';

const router = Router();

router.get('/', wrapAsync(ProductController.getProducts));
router.get('/search', wrapAsync(ProductController.serchProduct));
router.get('/recommand', wrapAsync(ProductController.getRecommandProducts));
router.get('/best', wrapAsync(ProductController.getBestProducts));
router.get('/category', wrapAsync(ProductController.getCategories));
router.get('/:id', wrapAsync(ProductController.getProductById));
router.get('/review/count/:id', ProductController.getProductReviewsCountById);
router.get(
  '/review/:id/:offset',
  wrapAsync(ProductController.getProductReviewsById)
);
router.get('/question/:id/:offset', ProductController.getProductQuestionsById);

router.post(
  '/review',
  authJWT,
  multerS3.array('images', 3),
  ProductController.postProductReviewById
);

router.delete(
  '/review/:id',
  authJWT,
  ProductController.deleteProductReviewById
);

export default router;
