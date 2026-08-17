import { create } from 'zustand'

import {
  createBlogService,
  deleteBlogService,
  getAllBlogsService,
  updateBlogService,
} from '../services/blogs'

const useBlogStore = create((set, get) => ({
  blogs: [],
  actions: {
    initialize: async () => {
      const blogs = await getAllBlogsService()

      set({ blogs })
    },
    addBlogStore: async blog => {
      const addedBlog = await createBlogService(blog)

      set(state => ({ blogs: [...state.blogs, addedBlog] }))
    },
    likeBlogStore: async id => {
      const blog = get().blogs.find(blog => blog.id === id)
      const updatedBlog = await updateBlogService(id, { ...blog, likes: blog.likes + 1 })

      set(state => ({ blogs: state.blogs.map(blog => (blog.id === id ? updatedBlog : blog)) }))
    },
    deleteBlogStore: async id => {
      await deleteBlogService(id)

      set(state => ({ blogs: state.blogs.filter(blog => blog.id !== id) }))
    },
  },
}))

export const useBlogs = () => useBlogStore(state => state.blogs)
export const useBlogActions = () => useBlogStore(state => state.actions)
