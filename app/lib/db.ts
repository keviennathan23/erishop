import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST, // pakai PUBLIC host
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
});