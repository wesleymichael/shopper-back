import { Product, ProductInputValidate, ProductOutput } from '@/models/products.models';
import productsRepository from '@/repository/products.repository.ts';

async function getAllProducts() {
  return await productsRepository.getAllProducts();
}

async function validateProduct(body: ProductInputValidate) {
  const answer = validateBody(body);
  if (answer.error.length !== 0) {
    return formatAnswer(answer);
  }

  const product = (await productsRepository.getProductsByCode(answer.code)) as Product[];
  answer.name = product[0].name;
  answer.current_price = product[0].sales_price;

  if (answer.new_price < product[0].cost_price) {
    answer.error.push('New price below cost price');
  }

  if (!isPriceVariationValid(answer.new_price, product[0].sales_price)) {
    answer.error.push('Invalid price variation (greater than 10%)');
  }
  return formatAnswer(answer);
}

function isPriceVariationValid(sales_price: number, new_price: number) {
  const max_variation = 1.1;
  const min_variation = 0.9;
  const priceVariation = new_price / sales_price;

  if (priceVariation > max_variation || priceVariation < min_variation) {
    return false;
  }
  return true;
}

function validateBody(body: ProductInputValidate): ProductOutput {
  const answer = new ProductOutput();
  const { product_code: code, new_price } = body;

  if (validateNumber(body.new_price)) {
    answer.error.push('New_price is not sent or is invalid');
  } else {
    answer.new_price = new_price;
  }

  if (validateNumber(code)) {
    answer.error.push('Product_code is not sent or is invalid');
  } else {
    answer.code = code;
  }

  return answer;
}

function validateNumber(value: unknown): boolean {
  return !value || Number.isNaN(Number(value));
}

function formatAnswer(answer: ProductOutput) {
  return {
    code: answer.code || 0,
    name: answer.name || '',
    current_price: answer.current_price || 0,
    new_price: answer.new_price || 1,
    error: answer.error || [],
  };
}

const productsService = {
  getAllProducts,
  validateProduct,
};

export default productsService;
