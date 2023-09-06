import joi from 'joi';

const productValidateSchema = joi.object({
  product_code: joi.number().required(),
  new_price: joi.number().required(),
});

export default productValidateSchema;
