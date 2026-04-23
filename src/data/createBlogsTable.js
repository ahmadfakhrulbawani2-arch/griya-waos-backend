import pool from "../configs/db.js";

const createBlogsTable = async () => {
  // isbn cant be updated
  const query = `
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE TABLE IF NOT EXISTS blogs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR(500) NOT NULL UNIQUE,
      image_url TEXT,
      author VARCHAR(500),
      first_label VARCHAR(100),
      second_label VARCHAR(100),
      content TEXT NOT NULL,
      pdf_url TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    pool.query(query);
    console.log("Blogs table created if not exists");
  } catch (err) {
    console.log("Error creating blogs table: ", err);
  }
};

export default createBlogsTable;
