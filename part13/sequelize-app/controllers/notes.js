import { Router } from "express";
import { Note } from "../models/index.js";

const router = Router();

async function noteFinder(req, res, next) {
  const id = req.params.id;
  req.note = await Note.findByPk(id);

  if (!req.note) {
    return res.status(404).end();
  }

  next();
}

router.get("/", async (req, res) => {
  const notes = await Note.findAll();

  res.json(notes);
});

router.post("/", async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      important: req.body.important || false,
      date: new Date(),
    });

    res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", noteFinder, async (req, res) => {
  res.json(req.note);
});

router.put("/:id", async (req, res) => {
  req.note.important = req.body.important;
  await req.note.save();
  res.json(req.note);
});

router.delete("/:id", async (req, res) => {
  await req.note.destroy();
  res.status(204).end();
});

export default router;
