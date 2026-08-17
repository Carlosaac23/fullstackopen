import jwt from 'jsonwebtoken'

import { JWT_SECRET } from './config.js'

export function errorHandler(error, req, res, next) {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }

  next(error)
}

export function tokenExtractor(req, res, next) {
  const authorization = req.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  } else {
    req.token = null
  }

  next()
}

export function userExtractor(req, res, next) {
  const authorization = req.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    const decodedToken = jwt.verify(token, JWT_SECRET)

    req.user = {
      id: decodedToken.id,
      username: decodedToken.username,
    }
  } else {
    req.user = null
  }

  next()
}
