const baseUrl = 'http://localhost:4000/notes';

export async function getAllNotes() {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error('Failed to fetch notes');
  }

  return await res.json();
}

export async function createNote(content) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, important: false }),
  };

  const res = await fetch(baseUrl, options);

  if (!res.ok) {
    throw new Error('Failed to create note');
  }

  return await res.json();
}

export async function updateNote(id, updatedNote) {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedNote),
  };

  const res = await fetch(`${baseUrl}/${id}`, options);

  if (!res.ok) {
    throw new Error('Failed to update note');
  }

  return await res.json();
}
