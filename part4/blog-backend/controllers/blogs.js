import { Router } from 'express'

import { Blog } from '../models/blog.js'

const blogsRouter = Router()

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogsRouter.post('/', (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = new Blog({ title, author, url, likes })

  blog.save().then((createdBlog) => {
    res.status(201).json(createdBlog)
  })
})

export default blogsRouter
