// controllers/SemestersController.js
import express from "express";
import Semestre from "./Semestre"; // Asegúrate de proporcionar la ruta correcta al archivo Semestre

const router = express.Router();

// Ruta para obtener todos los semestres
router.get("/", async (req, res) => {
  try {
    const semesters = await Semestre.find();
    res.json(semesters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un semestre por su ID
router.get("/:id", async (req, res) => {
  try {
    const semester = await Semestre.findById(req.params.id);
    if (!semester) {
      return res.status(404).json({ message: "Semester not found" });
    }
    res.json(semester);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para crear un nuevo semestre
router.post("/", async (req, res) => {
  try {
    const semester = new Semestre(req.body);
    await semester.save();
    res.status(201).json(semester);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para actualizar un semestre por su ID
router.put("/:id", async (req, res) => {
  try {
    const semester = await Semestre.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!semester) {
      return res.status(404).json({ message: "Semester not found" });
    }
    res.json(semester);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar un semestre por su ID
router.delete("/:id", async (req, res) => {
  try {
    const semester = await Semestre.findByIdAndDelete(req.params.id);
    if (!semester) {
      return res.status(404).json({ message: "Semester not found" });
    }
    res.json({ message: "Semester deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
