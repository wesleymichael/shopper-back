import { getAllProducts } from '@/controllers/products.controller.ts';
import { Router } from 'express';

const productsRouter = Router();

productsRouter.get('/products', getAllProducts);
productsRouter.get('/products/:code', () => console.log('Products router: get products by code'));

export default productsRouter;
