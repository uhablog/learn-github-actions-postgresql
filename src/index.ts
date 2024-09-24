import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// .envファイルの読み込み
dotenv.config();

// PostgreSQL接続プールの設定 (環境変数を利用)
console.log({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
});
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
});

const app = express();
app.use(express.json());

app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mytable');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// データの登録エンドポイント
app.post('/data', async (req, res) => {
  const { name, age } = req.body;
  try {
    await pool.query('INSERT INTO mytable (name, age) VALUES ($1, $2)', [name, age]);
    res.status(201).send('Data inserted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// サーバー起動
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
