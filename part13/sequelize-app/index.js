import express from "express";
import { env } from "./utils/config.js";
import { connectToDatabase } from "./utils/db.js";
import notesRouter from "./controllers/notes.js";

const app = express();

app.use(express.json());

app.use("/api/notes", notesRouter);

async function start() {
  await connectToDatabase();
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}

start();
