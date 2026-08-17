const baseUrl = '/api/users'

export async function getAllUsersService() {
  const res = await fetch(baseUrl)

  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }

  return await res.json()
}
