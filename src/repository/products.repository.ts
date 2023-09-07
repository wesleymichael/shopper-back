import client from '@/config/database.ts';

async function getAllProducts() {
  try {
    const result = await client.query('SELECT * FROM products');
    return result[0];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

async function getProductsByCode(code: number) {
  const result = await client.query(`SELECT * FROM products p WHERE p.code = ? LIMIT 1`, [code]);
  return result[0];
}

async function updateProduct(code: number, variation: number) {
  return await client.query(
    `
    UPDATE products p SET p.sales_price = p.sales_price * ? WHERE p.code = ? LIMIT 1`,
    [variation, code],
  );
}

async function updateProductPack(code: number, increase_price: number) {
  return await client.query(
    `
    UPDATE products p SET p.sales_price = p.sales_price + ? WHERE p.code = ? LIMIT 1`,
    [increase_price, code],
  );
}

async function getProductCode() {
  const result = await client.query('SELECT DISTINCT code FROM products;');
  const codes = result[0] as { code: number }[];
  const productCodeHashTable: { [key: number]: boolean } = {};
  for (const item of codes) {
    productCodeHashTable[item.code] = true;
  }
  return productCodeHashTable;
}

const productsRepository = {
  getAllProducts,
  getProductsByCode,
  updateProduct,
  updateProductPack,
  getProductCode,
};

export default productsRepository;
