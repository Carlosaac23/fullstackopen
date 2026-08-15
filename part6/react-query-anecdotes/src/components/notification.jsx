import { useNotification } from "../hooks/use-notification";

export default function Notification() {
  const { notification, setNotification } = useNotification();
  let timer = null;

  if (!notification) return null;

  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    setNotification(null);
    timer = null;
  }, 5000);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return <div style={style}>{notification}</div>;
}
