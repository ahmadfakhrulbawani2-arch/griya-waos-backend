import pool from "../configs/db.js";

const createBooksTable = async () => {
  // isbn cant be updated
  const query = `
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE TABLE IF NOT EXISTS books (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR(500) NOT NULL,
      pdf_url TEXT NOT NULL,
      image_url TEXT,
      author VARCHAR(500) NOT NULL,
      year INT NOT NULL,
      citation TEXT,
      publisher VARCHAR(500) NOT NULL,
      synopsis TEXT,
      isbn VARCHAR(500) NOT NULL UNIQUE, 
      pages INT NOT NULL,
      first_label VARCHAR(100) NOT NULL,
      second_label VARCHAR(100) NOT NULL,
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
