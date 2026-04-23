import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBooksById,
  updateBook,
} from "../controllers/booksHandler.js";
import authJWT from "../middlewares/authJWT.js";
import authUsername from "../middlewares/authUsername.js";

const router = express.Router();

router.get("/books", getAllBooks);
router.get("/books/:id", getBooksById);
router.post("/books", authJWT, createBook);
router.put("/books/:id", authJWT, updateBook);
router.delete("/books/:id", authJWT, deleteBook);

export default router;
