import normalizeJson from "../middlewares/normalizeJson.js";
import {
  createPaperController,
  deletePaperController,
  getAllPapersController,
  getPaperByIdController,
  papersMetadataController,
  updatePaperController,
} from "../model/papersModels.js";
import handleResponse from "../routes/handleResponse.js";

export const getAllPapers = async (req, res, next) => {
  const pageReq = parseInt(req.query.page) || 1;
  const limitReq = parseInt(req.query.limit) || 10;

  try {
    const [papers, total] = await Promise.all([
      getAllPapersController(pageReq, limitReq),
      papersMetadataController(),
    ]);

    const totalPage = Math.ceil(total / limitReq);
    if (pageReq > totalPage && totalPage !== 0) {
      handleResponse(res, 404, "Accessing out of range page");
      return;
    }

    handleResponse(res, 200, "Papers fetched successfully", papers, {
      total_data: total,
      total_page: Math.ceil(total / limitReq),
      limit: limitReq,
      page: pageReq,
    });
  } catch (err) {
    next(err);
  }
};

export const getPaperById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const paper = await getPaperByIdController(id);
    handleResponse(res, 200, "Paper fetched successfully", paper);
  } catch (err) {
    next(err);
  }
};

export const createPaper = async (req, res, next) => {
  const payload = normalizeJson(req.body);
  try {
    const paper = await createPaperController(payload);
    handleResponse(res, 201, "Paper created successfully", paper);
  } catch (err) {
    next(err);
  }
};

export const updatePaper = async (req, res, next) => {
  const payload = normalizeJson(req.body);
  const id = req.params.id;
  try {
    const paper = await updatePaperController(id, payload);
    handleResponse(res, 200, "Paper updated successfully", paper);
  } catch (err) {
    next(err);
  }
};

export const deletePaper = async (req, res, next) => {
  const id = req.params.id;
  try {
    const paper = await deletePaperController(id);
    handleResponse(res, 200, "Paper deleted successfully", paper);
  } catch (err) {
    next(err);
  }
};
