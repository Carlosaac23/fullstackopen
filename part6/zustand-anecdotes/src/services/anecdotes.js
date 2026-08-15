const baseUrl = 'http://localhost:4000/anecdotes';

export async function getAllAnecdotes() {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error('Failed to fetch anecdotes');
  }

  return await res.json();
}

export async function createAnecdote(anecdote) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: anecdote, votes: 0 }),
  };

  const res = await fetch(baseUrl, options);

  if (!res.ok) {
    throw new Error('Failed to create anecdote');
  }

  return await res.json();
}

export async function voteAnecdote(id, anecdote) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(anecdote),
  };

  const res = await fetch(`${baseUrl}/${id}`, options);

  if (!res.ok) {
    throw new Error('Failed to vote for anecdote');
  }

  return await res.json();
}

export async function deleteAnecdote(id) {
  const options = {
    method: 'DELETE',
  };

  const res = await fetch(`${baseUrl}/${id}`, options);

  if (!res.ok) {
    throw new Error('Failed to delete anecdote');
  }

  return await res.json();
}
