import SessionManager from "./session.manager";
import { Server, Socket } from "socket.io";
import { httpServer } from "../server";
import { v4 as uuidv4 } from "uuid";
import prisma from "../db/prisma_client";

const sessionManager = SessionManager.getInstance();

declare module "socket.io" {
  interface Socket {
    userId: number;
    sessionId: string;
  }
}

class SocketManager {
  private static io: Server;

  public static getIo() {
    if (!this.io) {
      const io = new Server(httpServer, {
        cors: {
          origin: "*",
        },
      });
      this.io = io;
    }
    return this.io;
  }

  public initListeners() {
    const io = SocketManager.getIo();

    io.on("connection", (socket: Socket) => {
      console.log("a user connected");
      socket.on("join", (data) => {
        if (data.userId) {
          socket.userId = data.userId;

          const session = sessionManager.getSession(data.userId);
          console.log(sessionManager);

          if (session) {
            socket.sessionId = session;
            socket.join(session);
          } else {
            const sessionId = uuidv4();
            socket.sessionId = sessionId;
            sessionManager.createSession(data.userId, sessionId);
            console.log(sessionManager);
            socket.join(sessionId);
          }
        }
      });

      socket.on("add-song", async (data, callback) => {
        if (socket.userId) {
          const session = sessionManager.getSession(socket.userId);

          if (session) {
            await prisma.songs.create({
              data: { user_id: socket.userId, link: data.link, votes: 0 },
            });
            callback({ status: "song added successfully" });
          } else {
            callback({ status: "error" });
          }
        }
      });

      socket.on("vote-song", async (data, callback) => {
        if (socket.userId) {
          const session = sessionManager.getSession(socket.userId);
          if (session) {
            await prisma.songs.update({
              where: { id: data.id },
              data: { votes: { increment: 1 } },
            });
            callback({ status: "song voted successfully" });
          } else {
            callback({ status: "error" });
          }
        }
      });

      socket.on("leave", () => {
        const session = sessionManager.getSession(socket.userId);
        if (session) {
          socket.leave(session);
        }
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }
}

export default new SocketManager();
