import mongoose from 'mongoose'
import assert from 'node:assert'
import { test, after, beforeEach } from 'node:test'
import supertest from 'supertest'

import app from '../app.js'
import { Blog } from '../models/blog.js'
import { initialBlogs, blogsInDb } from './test-helper.js'

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const res = await api.get('/api/blogs')

  assert.strictEqual(res.body.length, initialBlogs.length)
})

test('a blog has a property named id', async () => {
  const res = await api.get('/api/blogs')
  const blog = res.body[0]

  assert('id' in blog)
  assert(!('_id' in blog))
})

after(async () => await mongoose.connection.close())
