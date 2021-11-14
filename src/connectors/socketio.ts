import { createServer } from "http";
import { Server } from "socket.io";

export const httpServer = createServer();
export const io = new Server(httpServer, {
	path: "/socketio/",
	allowEIO3: true,
	cors: {
		origin: true,
		methods: ["GET", "POST"],
		credentials: true
	  }
});

