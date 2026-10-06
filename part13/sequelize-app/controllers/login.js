import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { env } from "../utils/config.js";

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  const passwordCorrect = password === "secret"; // Replace with actual password verification

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  const userForToken = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(userForToken, env.JWT_SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

export default router;
