import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URL } = process.env;

console.log(DATABASE_URL);

const pool = mysql.createPool(DATABASE_URL);

export default pool;
