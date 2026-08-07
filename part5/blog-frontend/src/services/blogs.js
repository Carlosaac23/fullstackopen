import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

export function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

export async function getAll() {
  const res = await axios(baseUrl);
  return res.data;
}

export async function createBlog(blogData) {
  const config = { headers: { Authorization: token } };

  const res = await axios.post(baseUrl, blogData, config);
  return res.data;
}
