import { Product, ProductInputUpdate, ProductInputValidate, ProductOutput } from '@/models/products.models';
import productsRepository from '@/repository/products.repository.ts';
import packsServices from './packs.service';
import { Pack } from '@/models/packs.models';
import { notFoundError } from '@/errors';

async function getAllProducts() {
  return await productsRepository.getAllProducts();
}

async function validateProduct(body: ProductInputValidate[]) {
  const resultArray = await Promise.all(
    body.map(async (product) => {
      const answer = validateBody(product);
      if (answer.error.length !== 0) return formatAnswer(answer);

      const resultProduct = (await productsRepository.getProductsByCode(answer.code)) as Product[];
      if (resultProduct.length === 0) {
        answer.error.push('There is no product registered with this code');
        return formatAnswer(answer);
      }

      answer.name = resultProduct[0].name;
      answer.current_price = resultProduct[0].sales_price;

      if (answer.new_price < resultProduct[0].cost_price) {
        answer.error.push('New price below cost price');
      }

      if (!isPriceVariationValid(answer.new_price, resultProduct[0].sales_price)) {
        answer.error.push('Invalid price variation (greater than 10%)');
      }
      return formatAnswer(answer);
    }),
  );

  return resultArray;
}

async function updateProduct(body: ProductInputUpdate[]) {
  try {
    for (const product of body) {
      const { code, variation } = product;

      // Atualize o produto individual
      const productByCode = await productsRepository.getProductsByCode(code);
      if (!productByCode) {
        throw notFoundError('Product not found');
      }
      await productsRepository.updateProduct(code, variation);

      // Atualize os itens que compõem o pack
      const pack = (await packsServices.getPackByCode(code)) as Pack[];
      for (const item of pack) {
        await productsRepository.updateProduct(item.product_id, variation);
      }

      // Atualize o pack que o produto pertence
      const packByProductId = (await packsServices.getPackByProductId(code)) as Pack[];
      for (const item of packByProductId) {
        const productInPack = (await productsRepository.getProductsByCode(item.product_id)) as Product[];
        const increase_price = (variation - 1) * item.qty * productInPack[0].sales_price;
        await productsRepository.updateProductPack(item.pack_id, increase_price);
      }
    }
    return { message: 'Update successfully' };
  } catch (error) {
    throw new Error('Failed to update products: ' + error.message);
  }
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
    code: Number(answer.code) || 0,
    name: answer.name || '',
    current_price: answer.current_price || 0,
    new_price: answer.new_price || 0,
    error: answer.error || [],
  };
}

const productsService = {
  getAllProducts,
  validateProduct,
  updateProduct,
};

export default productsService;
