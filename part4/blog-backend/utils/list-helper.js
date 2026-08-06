export function dummy(blogs) {
  return 1
}

export function totalLikes(blogs) {
  if (blogs.length === 1) return blogs[0].likes

  return blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

export function favoriteBlog(blogs) {
  return blogs.reduce((acc, curr) => (curr.likes > acc.likes ? curr : acc), blogs[0])
}
