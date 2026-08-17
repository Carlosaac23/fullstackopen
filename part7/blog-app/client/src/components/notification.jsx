import { Alert } from '@mui/material'

export default function Notification({ notification, setNotification }) {
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
