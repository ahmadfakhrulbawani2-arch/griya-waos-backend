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
router.post("/:username/papers", authJWT, authUsername, createPaper);
router.put("/:username/papers/:id", authJWT, authUsername, updatePaper);
router.delete("/:username/papers/:id", authJWT, authUsername, deletePaper);

export default router;
