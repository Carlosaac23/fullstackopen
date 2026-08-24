import { connectToDatabase } from './db.js';
import { startServer } from './server.js';

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

async function main() {
  await connectToDatabase(MONGODB_URI);
  startServer(PORT);
}

main();
