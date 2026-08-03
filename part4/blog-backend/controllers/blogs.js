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

  const blogToDelete = await Blog.findByIdAndDelete(id)

  if (!blogToDelete) return res.status(404).json({ error: 'Blog not found' })

  res.status(204).end()
})

export default blogsRouter
