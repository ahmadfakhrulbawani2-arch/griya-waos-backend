import express from "express";
import {
  createPaper,
  deletePaper,
  getAllPapers,
  getPaperById,
  updatePaper,
} from "../controllers/papersHandlers.js";
import authJWT from "../middlewares/authJWT.js";
import authUsername from "../middlewares/authUsername.js";

const router = express.Router();

router.get("/papers", getAllPapers);
router.get("/papers/:id", getPaperById);
router.post("/papers", authJWT, createPaper);
router.put("/papers/:id", authJWT, updatePaper);
router.delete("/papers/:id", authJWT, deletePaper);

export default router;
