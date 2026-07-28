export default function Notification({ message }) {
  if (!message) return;

  return <div className="error">{message}</div>;
}
