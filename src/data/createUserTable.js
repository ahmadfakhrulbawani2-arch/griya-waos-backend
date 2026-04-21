import pool from "../configs/db.js";

const createUserTable = async () => {
  const query = `
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username VARCHAR(100) NOT NULL UNIQUE,
      email VARCHAR(300) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      update_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    pool.query(query);
    console.log("User table created if not exists");
  } catch (err) {
    console.log("Error creating users table: ", err);
  }
};

export default createUserTable;
