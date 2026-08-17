const baseUrl = '/api/blogs'
let token = null

export function setToken(newToken) {
  token = newToken ? `Bearer ${newToken}` : null
}

export async function getAllBlogsService() {
  const res = await fetch(baseUrl)

  if (!res.ok) {
    throw new Error('Failed to fetch blogs')
  }

  return await res.json()
}

export async function createBlogService(payload) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(payload),
  }

  const res = await fetch(baseUrl, config)

  if (!res.ok) {
    const errorMsg = await res.json()
    throw new Error(errorMsg.error)
  }

  return await res.json()
}

export async function updateBlogService(id, payload) {
  const config = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }

  const res = await fetch(`${baseUrl}/${id}`, config)

  if (!res.ok) {
    throw new Error('Failed to update blog')
  }

  return await res.json()
}

export async function deleteBlogService(id) {
  const config = {
    method: 'DELETE',
    headers: { Authorization: token },
  }

  const res = await fetch(`${baseUrl}/${id}`, config)

  if (!res.ok) {
    const errorMsg = await res.json()
    throw new Error(errorMsg.error)
  }
}
