import express from 'express'
import mongoose from 'mongoose'

import blogsRouter from './controllers/blogs.js'
import { MONGODB_URI } from './utils/config.js'

const app = express()

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message))

app.use(express.json())

app.use('/api/blogs', blogsRouter)

export default app
