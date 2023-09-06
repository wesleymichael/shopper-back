import { getAllProducts, validateProduct } from '@/controllers/products.controller.ts';
import { Router } from 'express';

const productsRouter = Router();

productsRouter.get('/products', getAllProducts);
productsRouter.post('/validate', validateProduct);

export default productsRouter;
