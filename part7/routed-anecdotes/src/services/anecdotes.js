const baseUrl = "http://localhost:4000/anecdotes";

export async function getAllAnecdotes() {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await res.json();
}

export async function createAnecdote(payload) {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create note");
  }

  return await res.json();
}

export async function deleteAnecdoteById(id) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete note");
  }
}
