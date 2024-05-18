import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // Increase the timeout to 10 seconds
};

const pool = mysql.createPool(config);

export default pool;
