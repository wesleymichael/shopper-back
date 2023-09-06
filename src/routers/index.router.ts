import { Router } from 'express';
import productsRouter from './products.router.ts';

const router = Router();
router.use(productsRouter);

export default router;
