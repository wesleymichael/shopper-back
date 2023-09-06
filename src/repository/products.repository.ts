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
  const result = await client.query(`SELECT * FROM products p WHERE p.code = ?`, [code]);
  return result[0];
}

async function updateProduct(code: number, sales_price: number) {
  return await client.query(
    `
    UPDATE products p SET p.sales_price = ? WHERE p.code = ? LIMIT 1`,
    [sales_price, code],
  );
}

const productsRepository = {
  getAllProducts,
  getProductsByCode,
  updateProduct,
};

export default productsRepository;
