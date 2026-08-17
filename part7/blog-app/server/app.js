import express from 'express'
import mongoose from 'mongoose'

import blogsRouter from './controllers/blogs.js'
import loginRouter from './controllers/login.js'
import testingRouter from './controllers/testing.js'
import userRouter from './controllers/user.js'
import { MONGODB_URI } from './utils/config.js'
import { errorHandler } from './utils/middlewares.js'

const app = express()

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message))

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(errorHandler)

export default app
