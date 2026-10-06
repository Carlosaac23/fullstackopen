import express from "express";
import { env } from "./utils/config.js";
import { connectToDatabase } from "./utils/db.js";
import { syncModels } from "./models/index.js";

import notesRouter from "./controllers/notes.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";

const app = express();

app.use(express.json());

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

async function start() {
  await connectToDatabase();
  await syncModels();
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}

start();
