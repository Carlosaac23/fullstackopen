export default function Notification({ message, type = "success" }) {
  if (!message) return;

  return <div className={type === "success" ? "success" : "failed"}>{message}</div>;
}
