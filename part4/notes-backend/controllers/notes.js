import { Router } from 'express'

import { Note } from '../models/note.js'
import { User } from '../models/user.js'

const notesRouter = Router()

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })

  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  const note = await Note.findById(id)

  if (!note) return res.status(404).end()

  res.json(note)
})

notesRouter.post('/', async (req, res) => {
  const { content, important, userId } = req.body

  const user = await User.findById(userId)

  if (!user) return res.status(400).json({ error: 'userId missing or not valid' })

  const note = new Note({
    content,
    important: important || false,
    user: user._id,
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  res.status(201).json(savedNote)
})

notesRouter.put('/:id', (req, res, next) => {
  const { id } = req.params
  const { content, important } = req.body

  Note.findById(id)
    .then((note) => {
      if (!note) return res.status(404).json({ error: 'Note not found' })

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        res.json(updatedNote)
      })
    })
    .catch((error) => next(error))
})

notesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  const noteToDelete = await Note.findByIdAndDelete(id)

  if (!noteToDelete) return res.status(404).json({ error: 'Note not found' })

  res.status(204).end()
})

export default notesRouter
