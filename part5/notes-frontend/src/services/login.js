import axios from 'axios';

const baseUrl = '/api/login';

export async function loginService(credentials) {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
}
