require('dotenv').config();
const mysql = require('mysql2');

let pool;

if (process.env.MYSQL_URL) {
  // Use connection string from environment variable if present
  pool = mysql.createPool(process.env.MYSQL_URL);
} else {
  // Fallback to individual environment variables
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
  connection.release();
});

module.exports = pool.promise();
