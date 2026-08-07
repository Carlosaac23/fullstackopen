import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

export function setToken(newToken) {
  token = `Bearer ${newToken}`
}

export async function getAllBlogsService() {
  const res = await axios(baseUrl)
  return res.data
}

export async function createBlogService(blogData) {
  const config = { headers: { Authorization: token } }

  const res = await axios.post(baseUrl, blogData, config)
  return res.data
}

export async function updateBlogService(id, updateData) {
  const res = await axios.put(`${baseUrl}/${id}`, updateData)
  return res.data
}

export async function deleteBlogService(id) {
  const config = { headers: { Authorization: token } }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}
