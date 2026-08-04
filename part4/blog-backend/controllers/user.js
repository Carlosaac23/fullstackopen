import bcrypt from 'bcryptjs'
import { Router } from 'express'

import User from '../models/user.js'

const userRouter = Router()

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { user: 0 })

  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body

  if (!username || !password) return res.status(400).json({ error: 'missing username or password' })
  if (username.length < 3 || password.length < 3)
    return res
      .status(400)
      .json({ error: 'username or password must be at least 3 characters long' })

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    name,
    username,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

export default userRouter
