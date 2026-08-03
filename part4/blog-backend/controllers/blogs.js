import { Router } from 'express'

import { Blog } from '../models/blog.js'

const blogsRouter = Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body

  if (!title || !url) return res.status(400).json({ error: 'missing title or url' })

  const blog = new Blog({ title, author, url, likes: likes || 0 })

  const savedBlog = await blog.save()

  res.status(201).json(savedBlog)
})

export default blogsRouter
