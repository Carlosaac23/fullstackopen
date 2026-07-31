import axios from "axios";
const baseUrl = "/api/notes";

export function getAll() {
  const req = axios.get(baseUrl);
  return req.then(({ data }) => data);
}

export function create(newObject) {
  const req = axios.post(baseUrl, newObject);
  return req.then(({ data }) => data);
}

export function update(id, newObject) {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then(({ data }) => data);
}
