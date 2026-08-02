import { Router } from 'express'

import { Note } from '../models/note.js'

const notesRouter = Router()

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})

  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  const note = await Note.findById(id)

  if (!note) return res.status(404).end()

  res.json(note)
})

notesRouter.post('/', async (req, res) => {
  const { content, important } = req.body

  const note = new Note({
    content,
    important: important || false,
  })

  const savedNote = await note.save()

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
