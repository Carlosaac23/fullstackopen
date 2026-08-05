import express from 'express'
import mongoose from 'mongoose'

import blogsRouter from './controllers/blogs.js'
import loginRouter from './controllers/login.js'
import userRouter from './controllers/user.js'
import { MONGODB_URI } from './utils/config.js'
import { errorHandler, tokenExtractor } from './utils/middlewares.js'

const app = express()

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message))

app.use(express.json())
app.use(tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

export default app
