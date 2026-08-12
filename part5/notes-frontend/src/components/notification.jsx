import { Alert } from '@mui/material'

export default function Notification({ notification }) {
  if (!notification) return

  return (
    <Alert
      style={{ marginTop: 10, marginBottom: 10 }}
      severity={notification.type}
    >
      {notification.message}
    </Alert>
  )
}
