import mongoose from 'mongoose'
import assert from 'node:assert'
import { test, after, beforeEach, describe } from 'node:test'
import supertest from 'supertest'

import app from '../app.js'
import Note from '../models/note.js'
import { initialNotes, notesInDb, nonExistingId, usersInDb } from './test-helper.js'

const api = supertest(app)

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({}) // Delete all previous notes
    await Note.insertMany(initialNotes)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const res = await api.get('/api/notes')

    assert.strictEqual(res.body.length, initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const res = await api.get('/api/notes')

    const contents = res.body.map((e) => e.content)
    assert(contents.includes('HTML is easy'))
  })

  describe('viewving a specific note', () => {
    test('succeeds with a valid id', async () => {
      const notesAtStart = await notesInDb()
      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await nonExistingId()

      await api.get(`/api/notes/${validNonexistingId}`).expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api.get(`/api/notes/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('a valid note can be added', async () => {
      const usersAtStart = await usersInDb()
      const user = usersAtStart[0]

      const loggedUser = await api
        .post('/api/login')
        .send({ username: user.username, password: 'password' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .set('Authorization', `Bearer ${loggedUser.body.token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await notesInDb()
      assert.strictEqual(notesAtEnd.length, initialNotes.length + 1)

      const contents = notesAtEnd.map((note) => note.content)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('note without content is not added', async () => {
      const usersAtStart = await usersInDb()
      const user = usersAtStart[0]

      const loggedUser = await api
        .post('/api/login')
        .send({ username: user.username, password: 'password' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newNote = {
        important: true,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .set('Authorization', `Bearer ${loggedUser.body.token}`)
        .expect(400)

      const notesAtEnd = await notesInDb()
      assert.strictEqual(notesAtEnd.length, initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('a note can be deleted', async () => {
      const notesAtStart = await notesInDb()
      const noteToDelete = notesAtStart[0]

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

      const notesAtEnd = await notesInDb()

      const ids = notesAtEnd.map((note) => note.id)
      assert(!ids.includes(noteToDelete.id))

      assert.strictEqual(notesAtEnd.length, initialNotes.length - 1)
    })
  })
})

after(async () => await mongoose.connection.close())
