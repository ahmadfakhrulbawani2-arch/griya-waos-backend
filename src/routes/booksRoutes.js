import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBooksById,
  updateBook,
} from "../controllers/booksHandler.js";

const router = express.Router();

router.get("/books", getAllBooks);
router.get("/books/:id", getBooksById);
router.post("/books", createBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;
