const baseUrl = "http://localhost:4000/anecdotes";

export async function getAnecdotes() {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch anecdotes");
  }

  return await res.json();
}

export async function createAnecdote(payload) {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  const res = await fetch(baseUrl, config);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return await res.json();
}

export async function updateAnecdote(payload) {
  const config = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  const res = await fetch(`${baseUrl}/${payload.id}`, config);

  if (!res.ok) {
    throw new Error("Failed to update anecdote");
  }

  return await res.json();
}
