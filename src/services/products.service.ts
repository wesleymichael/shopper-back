import { ProductInputValidate, ProductOutput } from '@/models/products.models';
import productsRepository from '@/repository/products.repository.ts';

async function getAllProducts() {
  return await productsRepository.getAllProducts();
}

async function validateProduct(body: ProductInputValidate) {
  const answer = new ProductOutput();
  const { product_code: code, new_price } = body;

  //Validação do body (input)
  if (validateNumber(new_price)) {
    answer.error = 'New_price is not sent or is invalid';
  } else {
    answer.new_price = new_price;
  }

  if (validateNumber(code)) {
    answer.error = 'Product_code is not sent or is invalid';
  } else {
    answer.code = code;
  }
  return formatAnswer(answer);

  const product = await productsRepository.getProductsByCode(code);
  return product;
}

function validateNumber(value: unknown): boolean {
  return !value || Number.isNaN(Number(value));
}

function formatAnswer(answer: ProductOutput) {
  console.log(answer);
  return {
    code: answer.code || 0,
    name: answer.name || '',
    current_price: answer.current_price || 0,
    new_price: answer.new_price || 0,
    error: answer.error || [],
  };
}

const productsService = {
  getAllProducts,
  validateProduct,
};

export default productsService;
