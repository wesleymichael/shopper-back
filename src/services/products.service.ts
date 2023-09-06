import { Product, ProductInputUpdate, ProductInputValidate, ProductOutput } from '@/models/products.models';
import productsRepository from '@/repository/products.repository.ts';
import packsServices from './packs.service';
import { Pack } from '@/models/packs.models';

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

async function updateProduct(body: ProductInputUpdate) {
  const { code, variation } = body;

  //Atualizei o pack ou o produto individual
  await productsRepository.updateProduct(code, variation);

  //Atualização dos itens que compõe o pack
  const pack = (await packsServices.getPackByCode(code)) as Pack[];
  pack.map(async (item) => {
    await productsRepository.updateProduct(item.product_id, variation);
  });

  //Atualização do pack que o produto pertence
  const packByProductId = (await packsServices.getPackByProductId(code)) as Pack[];
  await Promise.all(
    packByProductId.map(async (item) => {
      const productInPack = (await productsRepository.getProductsByCode(item.product_id)) as Product[];
      const increase_price = (variation - 1) * item.qty * productInPack[0].sales_price;
      await productsRepository.updateProductPack(item.pack_id, increase_price);
    }),
  );

  return { message: 'Update successfully' };
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
  updateProduct,
};

export default productsService;
