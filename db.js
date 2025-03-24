import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

export async function inserirRelatorios(relatorios) {
  for (const linha of relatorios) {
    await connection.execute(
      `INSERT INTO relatorios (id, balance, outflow, credit, inflow, date)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         balance = VALUES(balance),
         outflow = VALUES(outflow),
         credit = VALUES(credit),
         inflow = VALUES(inflow),
         date = VALUES(date)`,
      [
        linha.id,
        linha.balance,
        linha.outflow,
        linha.credit,
        linha.inflow,
        linha.date.toISOString().slice(0, 10)
      ]
    );
  }
}
