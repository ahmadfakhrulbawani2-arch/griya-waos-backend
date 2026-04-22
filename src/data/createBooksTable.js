import pool from "../configs/db.js";

const createBooksTable = async () => {
  const query = `
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE TABLE IF NOT EXISTS books (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR(500) NOT NULL UNIQUE,
      author VARCHAR(500) NOT NULL UNIQUE,
      year INT NOT NULL,
      citation TEXT NOT NULL,
      publisher VARCHAR(500) NOT NULL,
      synopsis TEXT NOT NULL,
      isbn CHAR(500) NOT NULL,
      pages INT NOT NULL,
      first_label CHAR(100) NOT NULL,
      second_label CHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    pool.query(query);
    console.log("Book table created if not exists");
  } catch (err) {
    console.log("Error creating books table: ", err);
  }
};

export default createBooksTable;
