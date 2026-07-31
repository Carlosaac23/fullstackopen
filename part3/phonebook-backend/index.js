import { Contact } from "./models/contact.js";

import express from "express";
import morgan from "morgan";
const app = express();

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.get("/api/contacts", (req, res) => {
  Contact.find({}).then((contacts) => {
    res.json(contacts);
  });
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

app.get("/api/contacts/:id", (req, res, next) => {
  const { id } = req.params;

  Contact.findById(id)
    .then((contact) => {
      if (!contact) return res.status(404).json({ error: "Contact not found" });

      res.json(contact);
    })
    .catch((error) => next(error));
});

app.post("/api/contacts", (req, res, next) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "missing name or phone" });
  }

  const contact = new Contact({
    name,
    phone,
  });

  contact
    .save()
    .then((savedContact) => {
      res.status(201).json(savedContact);
    })
    .catch((error) => next(error));
});

app.put("/api/contacts/:id", (req, res, next) => {
  const { id } = req.params;
  const { phone } = req.body;

  Contact.findById(id)
    .then((contact) => {
      if (!contact) return res.status(404).json({ error: "Contact not found" });

      contact.phone = phone;

      return contact.save().then((updatedContact) => {
        res.json(updatedContact);
      });
    })
    .catch((error) => next(error));
});

app.delete("/api/contacts/:id", (req, res, next) => {
  const { id } = req.params;

  Contact.findByIdAndDelete(id)
    .then((deletedContact) => {
      if (!deletedContact) return res.status(404).json({ error: "Contact not found" });

      res.status(204).end();
    })
    .catch((error) => next(error));
});

function errorHandler(error, req, res, next) {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server working at http://localhost:${PORT}`);
});
