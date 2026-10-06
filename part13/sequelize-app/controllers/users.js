import { Router } from "express";
import { User, Note } from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.findAll({ include: { model: Note } });

  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

export default router;
