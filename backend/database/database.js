import '../config/env.js';

import mysql from "mysql2/promise";
import fs from "fs";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT,

  waitForConnections: true,
  connectionLimit: 10,

  

  ssl: {
    ca: fs.readFileSync(process.env.DB_SSL_CERT)
  }
});

console.log("Connected To Databases");

export default pool;
