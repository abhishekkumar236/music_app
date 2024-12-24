import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.middleware";
import userAuthRoutes from "./routes/userAuth.routes";
import { createServer } from "http";
import SocketManager from "./socket/socket.manager";
import SessionManager from "./socket/session.manager";
import socketManager from "./socket/socket.manager";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Optional for form data

export const httpServer = createServer(app);

app.use("/api/v1/user", userAuthRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

app.use(errorHandler);

socketManager.initListeners();

httpServer.listen(4000, () => {
  console.log("server is running on port 3000");
});
