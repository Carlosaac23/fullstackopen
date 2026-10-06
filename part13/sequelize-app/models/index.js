import { Note } from "./note.js";
import { User } from "./user.js";

User.hasMany(Note);
Note.belongsTo(User);

async function syncModels() {
  await Note.sync({ alter: true });
  await User.sync({ alter: true });
}

export { Note, User, syncModels };
