import express from "express";
const router = express.Router();
import { crear } from "../controllers/semestersController.js"

// CRUD
router.post("/semesters", crear) // Crea un nuevo semestre

export default router;