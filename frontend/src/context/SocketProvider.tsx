"use client";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

const SOCKET_SERVER_URL = "http://localhost:4000";

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      reconnection: true, // Automatically try to reconnect
      reconnectionAttempts: Infinity, // Retry indefinitely
      reconnectionDelay: 1000, // Initial delay between attempts
      reconnectionDelayMax: 5000, // Maximum delay between attempts
    });

    socketRef.current = socket;

    socket.emit("join", { userId: 1 });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): Socket => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return socket;
};
