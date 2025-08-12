import { isLoggedInSelector, userSelector } from "@/features/account";
import { useAppSelector } from "@/hooks/useStore";
import { Notification } from "@/types";
import React, { createContext, useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (notificationId: string) => void;
  onDeleteNotification: (notificationId: string) => void;
  onMarkAllAsRead: (notificationIds: string[]) => void;
  onDeleteAllNotifications: (notificationIds: string[]) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const user = useAppSelector(userSelector);
  const [socket, setSocket] = useState<null | Socket>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    // Connect to the socket server
    const newSocket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    });

    newSocket.emit("register", user.email);

    // Reveive notifications when the user connects
    newSocket.on("notifications", (initialNotifications: Notification[]) => {
      setNotifications(initialNotifications);
      setUnreadCount(
        initialNotifications.filter((notification) => !notification.isRead)
          .length
      );
    });

    // Receive new notifications
    newSocket.on("new_notification", (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isLoggedIn]);

  const handleMarkAsRead = (notificationId: string) => {
    const notification = notifications.find(
      (notification) => notification._id === notificationId
    );

    if (!notification || notification.isRead || !socket) return;

    socket.emit("mask_notification_as_read", [notificationId]);

    setNotifications((prev) =>
      prev.map((notification) =>
        notification._id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );

    setUnreadCount((prev) => prev - 1);
  };

  const handleDeleteNotification = (notificationId: string) => {
    const notification = notifications.find(
      (notification) => notification._id === notificationId
    );

    if (!notification || !socket) return;
    socket.emit("delete_notification", [notificationId]);
    setNotifications((prev) =>
      prev.filter((notification) => notification._id !== notificationId)
    );

    if (!notification.isRead) setUnreadCount((prev) => prev - 1);
  };

  const handleMarkAllAsRead = (notificationIds: string[]) => {
    if (!socket) return;
    socket.emit("mask_notification_as_read", notificationIds);
    setUnreadCount(0);
    setNotifications((prev) =>
      prev.map((notification) => {
        if (notificationIds.includes(notification._id))
          return {
            ...notification,
            isRead: true,
          };
        return notification;
      })
    );
  };

  const handleDeleteAllNotifications = (notificationIds: string[]) => {
    if (!socket) return;

    const notReadNotifications = notifications.filter(
      (notification) =>
        notificationIds.includes(notification._id) && !notification.isRead
    );

    socket.emit("delete_notification", notificationIds);
    setNotifications((prev) =>
      prev.filter((notification) => !notificationIds.includes(notification._id))
    );

    setUnreadCount((prev) => prev - notReadNotifications.length);
  };

  return (
    <>
      <NotificationContext.Provider
        value={{
          notifications,
          unreadCount,
          onMarkAsRead: handleMarkAsRead,
          onDeleteNotification: handleDeleteNotification,
          onMarkAllAsRead: handleMarkAllAsRead,
          onDeleteAllNotifications: handleDeleteAllNotifications,
        }}
      >
        {children}
      </NotificationContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotifications = () => useContext(NotificationContext);
