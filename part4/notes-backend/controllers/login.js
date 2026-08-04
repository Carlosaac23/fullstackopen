import bcrypt from 'bcrypt'
import { Router } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import { JWT_SECRET } from '../utils/config.js'

const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (!user) return

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

  if (!(user && isPasswordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const ONE_HOUR = 60 * 60
  const token = jwt.sign(userForToken, JWT_SECRET, { expiresIn: ONE_HOUR })

  res.status(200).json({ token, username: user.username, name: user.name })
})

export default loginRouter
