import packsRepository from '@/repository/packs.repository';

async function getPackByCode(code: number) {
  return await packsRepository.getPackByCode(code);
}

const packsServices = {
  getPackByCode,
};

export default packsServices;
