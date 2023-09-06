import client from '@/config/database.ts';

async function getPackByCode(code: number) {
  const result = await client.query(`SELECT * FROM packs WHERE packs.pack_id = ?`, [code]);
  return result[0];
}

async function getPackByProductId(product_id: number) {
  const result = await client.query(`SELECT * FROM packs WHERE packs.product_id = ?`, [product_id]);
  return result[0];
}

const packsRepository = {
  getPackByCode,
  getPackByProductId,
};

export default packsRepository;
