import { Sequelize } from "sequelize";
import { env } from "./config.js";

export const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: "postgres",
});

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");
  } catch (error) {
    console.log("failed to connect to database: ", error);
    return process.exit(1);
  }

  return null;
}
