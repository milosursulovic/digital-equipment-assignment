import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAllPersons,
  createPerson,
  deletePerson,
} from "../controllers/personController.js";

const router = express.Router();

router.get("/", protect, getAllPersons);
router.post("/", protect, createPerson);
router.delete("/:id", protect, deletePerson);

export default router;
