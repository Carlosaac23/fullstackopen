import { randomUUID } from "node:crypto";

import express from "express";
import morgan from "morgan";
const app = express();

let contacts = [
  {
    id: "1",
    name: "Arto Hellas",
    phone: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    phone: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    phone: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
  },
];

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

app.get("/info", (req, res) => {
  const result = `
    <div>
      <p>Phonebook has info for ${contacts.length} people</p>
      <p>${new Date()}</p>
    </div>
  `;

  res.send(result);
});

app.post("/api/contacts", (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "missing name or phone" });
  }

  const nameAlreadyExists = contacts.find((contact) => contact.name === name);

  if (nameAlreadyExists) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const contact = {
    id: randomUUID(),
    name,
    phone,
  };

  contacts = [...contacts, contact];
  res.status(201).json(contact);
});

app.get("/api/contacts/:id", (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    res.status(404).end();
  }

  res.json(contact);
});

app.delete("/api/contacts/:id", (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    res.status(404).end();
  }

  contacts = contacts.filter((contact) => contact.id !== id);
  res.status(204).end();
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server working at http://localhost:${PORT}`);
});
