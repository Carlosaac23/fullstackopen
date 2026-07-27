import axios from "axios";
const baseUrl = "http://localhost:4000/notes";

export function getAll() {
  const req = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    important: true,
  };
  return req.then(({ data }) => data.concat(nonExisting));
}

export function create(newObject) {
  const req = axios.post(baseUrl, newObject);
  return req.then(({ data }) => data);
}

export function update(id, newObject) {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then(({ data }) => data);
}
