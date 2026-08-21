export default function Notification({ message }) {
  if (!message) {
    return null;
  }

  return <div style={{ color: "red" }}>{message}</div>;
}
