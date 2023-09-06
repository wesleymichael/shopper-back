import packsRepository from '@/repository/packs.repository';

async function getPackByCode(code: number) {
  return await packsRepository.getPackByCode(code);
}

async function getPackByProductId(product_id: number) {
  return await packsRepository.getPackByProductId(product_id);
}

const packsServices = {
  getPackByCode,
  getPackByProductId,
};

export default packsServices;
