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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'testing title',
    author: 'John Doe',
    url: 'www.testing.com',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

  const contents = blogsAtEnd.map((blog) => blog.title)
  assert(contents.includes('testing title'))
})

test('if likes property is missing when creating new blog, it will be by default 0', async () => {
  const newBlog = {
    title: 'testing title',
    author: 'John Doe',
    url: 'www.testing.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

  const createdBlog = blogsAtEnd.find((blog) => blog.title === 'testing title')
  assert.strictEqual(createdBlog.likes, 0)
})

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'John Doe',
    likes: 10,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const blogsAtEnd = await blogsInDb()
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
})

after(async () => await mongoose.connection.close())
