import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { Blog } from '../models/blog.js'
import User from '../models/user.js'
import { JWT_SECRET } from '../utils/config.js'

const blogsRouter = Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body
  const decodedToken = jwt.verify(req.token, JWT_SECRET)

  if (!decodedToken.id) return res.status(401).json({ error: 'invalid token' })

  const user = await User.findById(decodedToken.id)

  if (!user) return res.status(400).json({ error: 'userId missing or not valid' })

  if (!title || !url) return res.status(400).json({ error: 'missing title or url' })

  const blog = new Blog({ title, author, url, likes: likes || 0, user: user._id })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, author, url, likes } = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      title,
      author,
      url,
      likes,
    },
    { returnDocument: 'after', runValidators: true },
  )

  res.json(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const decodedToken = jwt.verify(req.token, JWT_SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'invalid token' })
  }

  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  if (blog.user.toString() !== decodedToken.id) {
    return res.status(403).json({ error: 'Not allowed to do this' })
  }

  await blog.deleteOne()

  res.status(204).end()
})

export default blogsRouter
