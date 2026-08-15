const baseUrl = "http://localhost:4000/notes";

export async function getNotes() {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await res.json();
}

export async function createNote(payload) {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  const res = await fetch(baseUrl, config);

  if (!res.ok) {
    throw new Error("Failed to create note");
  }

  return await res.json();
}

export async function updateNote(payload) {
  const config = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  const res = await fetch(`${baseUrl}/${payload.id}`, config);

  if (!res.ok) {
    throw new Error("Failed to update note");
  }

  return await res.json();
}
