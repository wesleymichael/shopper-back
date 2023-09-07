import { getAllProducts, updateProduct, validateProduct } from '@/controllers/products.controller.ts';
import validateSchema from '@/middleware/validateSchema.middleware.ts';
import productUpdateSchema from '@/schemas/productsUpdate.schema.ts';
import { Router } from 'express';

const productsRouter = Router();

productsRouter.get('/products', getAllProducts);
productsRouter.post('/validate', validateProduct);
productsRouter.put('/products', validateSchema(productUpdateSchema), updateProduct);

export default productsRouter;
