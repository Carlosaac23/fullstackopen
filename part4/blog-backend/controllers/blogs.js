import { Router } from 'express'

import { Blog } from '../models/blog.js'

const blogsRouter = Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = new Blog({ title, author, url, likes })

  const savedBlog = await blog.save()

  res.status(201).json(savedBlog)
})

export default blogsRouter
