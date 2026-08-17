import { create } from 'zustand'

import { setToken } from '../services/blogs'
import { loginService } from '../services/login'

const STORAGE_KEY = 'loggedBlogAppUser'

const getStoredUser = () => {
  const storedUser = window.localStorage.getItem(STORAGE_KEY)

  if (!storedUser) return null

  try {
    return JSON.parse(storedUser)
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

const useAuthStore = create(set => ({
  user: null,
  token: null,
  actions: {
    initialize: () => {
      const user = getStoredUser()

      if (!user) {
        setToken(null)
        set({ user: null, token: null })
        return
      }

      setToken(user.token)
      set({ user, token: user.token })
    },

    login: async credentials => {
      const user = await loginService(credentials)

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      setToken(user.token)
      set({ user, token: user.token })

      return user
    },

    logout: () => {
      window.localStorage.removeItem(STORAGE_KEY)
      setToken(null)
      set({ user: null, token: null })
    },
  },
}))

export const useAuth = () => useAuthStore(state => state.user)

export const useAuthActions = () => useAuthStore(state => state.actions)
