const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Добавим отладочный вывод
console.log('DB Config:', {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  // Добавим дополнительные опции для отладки
  ssl: false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Добавим обработчик ошибок
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

// Проверка подключения
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connection successful');
    client.release();
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
}

testConnection();

module.exports = pool;