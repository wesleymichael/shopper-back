import joi from 'joi';

const productUpdateSchema = joi.object({
  code: joi.number().required(),
  variation: joi.number().required(),
});

export default productUpdateSchema;
