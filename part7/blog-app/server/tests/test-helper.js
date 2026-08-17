import Blog from '../models/blog.js'
import User from '../models/user.js'

export const initialBlogs = [
  {
    title: 'My first blog',
    author: 'John Doe',
    url: 'www.example.com',
    likes: 7,
  },
  {
    title: 'Why is important to eat?',
    author: 'John Watz',
    url: 'www.example.com',
    likes: 12,
  },
]

export async function blogsInDb() {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

export async function usersInDb() {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}
