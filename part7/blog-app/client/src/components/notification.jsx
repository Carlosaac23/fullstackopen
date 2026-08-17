import { Alert } from '@mui/material'
import { useEffect } from 'react'

export default function Notification({ notification, setNotification }) {
  useEffect(() => {
    const timerId = setTimeout(() => setNotification(null), 5000)

    return () => {
      clearTimeout(timerId)
    }
  }, [notification, setNotification])

  if (!notification) return null

  return (
    <Alert
      style={{ marginTop: 5, marginBottom: 5 }}
      severity={notification.type}
      onClose={() => setNotification(null)}
    >
      {notification.message}
    </Alert>
  )
}
