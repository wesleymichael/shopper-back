import joi from 'joi';

const productSchema = joi.object({
  products: joi.array().items(
    joi.object({
      code: joi.number().required(),
      variation: joi.number().required(),
    }),
  ),
});

export default productSchema;
