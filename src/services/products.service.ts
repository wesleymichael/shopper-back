import productsRepository from '@/repository/products.repository.ts';

async function getAllProducts() {
  return await productsRepository.getAllProducts();
}

const productsService = {
  getAllProducts,
};

export default productsService;
