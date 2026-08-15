import { create } from 'zustand';

let timer = null;

const useNotificationStore = create(set => ({
  notification: null,
  setNotification: (message, duration) => {
    if (timer) {
      clearTimeout(timer);
    }

    set({ notification: message });
    timer = setTimeout(() => {
      set({ notification: null });
      timer = null;
    }, duration);
  },
}));

export const useNotification = () => {
  const notification = useNotificationStore(state => state.notification);
  const setNotification = useNotificationStore(state => state.setNotification);
  return { notification, setNotification };
};
