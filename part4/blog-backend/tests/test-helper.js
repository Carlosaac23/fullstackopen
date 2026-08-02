import { Blog } from '../models/blog.js'

export const initialBlogs = [
  {
    title: 'My first blog',
    author: 'John Doe',
    url: '',
    likes: 7,
  },
  {
    title: 'Why is important to eat?',
    author: 'John Watz',
    url: '',
    likes: 12,
  },
]

export async function blogsInDb() {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}
