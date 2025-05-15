import { Server } from "socket.io";
import http from "http";
import { config } from "dotenv";
import { ISocket } from "./socket-io.interface.js";
import NotificationService from "../services/NotificationService.js";
import UserService from "../services/UserService.js";
import { NotificationType } from "../models/Notification.js";
config();

let io: Server;

export function initSocket(server: http.Server) {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", async (socket: ISocket) => {
    socket.on("register", async (email: string) => {
      const user = await UserService.getUserByEmailWithoutPasswordHash(email);
      const notifications =
        await NotificationService.getAllNotificationsByUserId(
          user?._id?.toString() || ""
        );
      console.log("User connected: ", email);
      socket.join(email);
      socket.emit("notifications", notifications);
    });

    socket.on(
      "mask_notification_as_read",
      async (notificationIds: string[]) => {
        for await (const id of notificationIds) {
          await NotificationService.maskNotificationAsRead(id);
        }
      }
    );

    socket.on("delete_notification", async (notificationIds: string[]) => {
      for await (const id of notificationIds) {
        await NotificationService.deleteNotificationById(id);
      }
    });
  });
  return io;
}

export function getIO(): Server {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
}

export function sendNotification(
  email: string,
  notification: NotificationType
) {
  const io = getIO();
  io.to(email).emit("new_notification", notification);
}
