import { Router } from 'express'

import { Note } from '../models/note.js'

const notesRouter = Router()

notesRouter.get('/', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

notesRouter.get('/:id', (req, res, next) => {
  const { id } = req.params

  Note.findById(id)
    .then((note) => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

notesRouter.post('/', (req, res, next) => {
  const { content, important } = req.body

  const note = new Note({
    content,
    important: important || false,
  })

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote)
    })
    .catch((error) => next(error))
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

notesRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params

  Note.findByIdAndDelete(id)
    .then((deletedNote) => {
      if (!deletedNote) return res.status(404).json({ error: 'Note not found' })

      res.status(204).end()
    })
    .catch((error) => next(error))
})

export default notesRouter
