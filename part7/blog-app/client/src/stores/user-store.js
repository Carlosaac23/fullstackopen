import { create } from 'zustand'

import { getAllUsersService } from '../services/user'

const useUserStore = create(set => ({
  users: [],
  actions: {
    initialize: async () => {
      const users = await getAllUsersService()

      set({ users })
    },
  },
}))

export const useUsers = () => useUserStore(state => state.users)
export const useUserActions = () => useUserStore(state => state.actions)
