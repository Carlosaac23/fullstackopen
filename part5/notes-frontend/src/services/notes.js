import axios from 'axios';
const baseUrl = '/api/notes';

let token = null;

export function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

export async function getAll() {
  const res = await axios(baseUrl);
  return res.data;
}

export async function create(newObject) {
  const config = { headers: { Authorization: token } };

  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
}

export async function update(id, newObject) {
  const res = await axios.put(`${baseUrl}/${id}`, newObject);
  return res.data;
}
