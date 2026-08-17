import { create } from 'zustand'

let timerId = null

const useNotificationStore = create(set => ({
  notification: null,
  setNotification: notification => {
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }

    if (!notification) {
      set({ notification: null })
      return
    }

    set({ notification })

    timerId = setTimeout(() => {
      set({ notification: null })
      timerId = null
    }, 5000)
  },
}))

export const useNotification = () => {
  const notification = useNotificationStore(state => state.notification)
  const setNotification = useNotificationStore(state => state.setNotification)

  return { notification, setNotification }
}
