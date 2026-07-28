import axios from "axios";
const baseUrl = "http://localhost:4000/people";

export function getAll() {
  const req = axios(baseUrl);
  return req.then(({ data }) => data);
}

export function create(newObject) {
  const req = axios.post(baseUrl, newObject);
  return req.then(({ data }) => data);
}
