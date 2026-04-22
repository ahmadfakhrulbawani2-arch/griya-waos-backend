import pool from "../configs/db.js";

const createPapersTable = async () => {
  // doi can be inserted or not, but it must be unique
  const query = `
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE TABLE IF NOT EXISTS papers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      doi VARCHAR(500) UNIQUE, 
      title VARCHAR(500) NOT NULL,
      author VARCHAR(500) NOT NULL,
      publisher VARCHAR(500) NOT NULL,
      year INT NOT NULL,
      abstract TEXT,
      citation TEXT,
      first_label VARCHAR(100) NOT NULL,
      second_label VARCHAR(100) NOT NULL,
      pages INT NOT NULL,
      pdf_url TEXT NOT NULL,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    pool.query(query);
    console.log("Paper table created if not exists");
  } catch (err) {
    console.log("Error creating paper table: ", err);
  }
};

export default createPapersTable;
