import {
  booksMetadataController,
  createBookController,
  deleteBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController,
} from "../model/booksModels.js";
import handleResponse from "../routes/handleResponse.js";

export const getAllBooks = async (req, res, next) => {
  const pageReq = parseInt(req.query.page) || 1;
  const limitReq = parseInt(req.query.limit) || 10;

  try {
    const [books, total] = await Promise.all([
      getAllBooksController(pageReq, limitReq),
      booksMetadataController(),
    ]);

    handleResponse(res, 200, "Books fetched successfully", books, {
      total_data: total,
      total_page: Math.ceil(total / limitReq),
      limit: limitReq,
      page: pageReq,
    });
  } catch (err) {
    next(err);
  }
};

export const getBooksById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const book = await getBookByIdController(id);
    handleResponse(res, 200, "Book fetched successfully", book);
  } catch (err) {
    next(err);
  }
};

export const createBook = async (req, res, next) => {
  const payload = req.body;
  try {
    const book = await createBookController(payload);

    handleResponse(res, 201, "Book created successfully", book);
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    const book = await updateBookController(id, payload);
    handleResponse(res, 200, "Book updated successfully", book);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  try {
    const book = await deleteBookController(id);
    handleResponse(res, 200, "Book deleted successfully", book);
  } catch (err) {
    next(err);
  }
};
