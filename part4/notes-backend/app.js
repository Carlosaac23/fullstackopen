import express from 'express'
import mongoose from 'mongoose'

import notesRouter from './controllers/notes.js'
import { MONGODB_URI } from './utils/config.js'
import { infoLog, errorLog } from './utils/logger.js'
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js'

const app = express()

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => {
    infoLog('Connected to MongoDB')
  })
  .catch((error) => {
    errorLog('Error connection to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/notes', notesRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
