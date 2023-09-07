import productsService from '@/services/products.service.ts';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getAllProducts(req: Request, res: Response) {
  try {
    const results = await productsService.getAllProducts();
    return res.status(httpStatus.OK).send(results);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function validateProduct(req: Request, res: Response) {
  try {
    const result = await productsService.validateProduct(req.body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const result = await productsService.updateProduct(req.body.products);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
