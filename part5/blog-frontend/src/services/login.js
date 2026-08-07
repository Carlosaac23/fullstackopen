import axios from 'axios';
const baseUrl = '/api/login';

export async function login(credentials) {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
}
