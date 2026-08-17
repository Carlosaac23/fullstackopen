const baseUrl = '/api/login'

export async function loginService(credentials) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }

  const res = await fetch(baseUrl, config)

  if (!res.ok) {
    const errorMsg = await res.json()
    throw new Error(errorMsg.error)
  }

  return await res.json()
}
