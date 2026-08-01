import { infoLog } from './logger.js'

export function requestLogger(req, res, next) {
  infoLog('Method:', req.method)
  infoLog('Path:  ', req.path)
  infoLog('Body:  ', req.body)
  infoLog('---')
  next()
}

export function unknownEndpoint(req, res) {
  res.status(404).send({ error: 'unknown endpoint' })
}

export function errorHandler(error, req, res, next) {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
