import axios from "axios";
const baseUrl = "http://localhost:4000/people";

export function getPeople() {
  const req = axios(baseUrl);
  return req.then(({ data }) => data);
}

export function createContact(newObject) {
  const req = axios.post(baseUrl, newObject);
  return req.then(({ data }) => data);
}

export function updateContact(id, newObject) {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then(({ data }) => data);
}

export function deleteContact(id) {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then(({ data }) => data);
}
