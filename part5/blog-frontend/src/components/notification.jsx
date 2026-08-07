import { useEffect } from 'react';

export default function Notification({ notification, setNotification }) {
  useEffect(() => {
    const timerId = setTimeout(() => setNotification(null), 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [notification]);

  if (!notification) return null;

  const customStyle = notification.type === 'success' ? 'success' : 'error';

  return <div className={`noti ${customStyle}`}>{notification.message}</div>;
}
