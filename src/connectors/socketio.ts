import { createServer } from "http";
import { Server } from "socket.io";

export const httpServer = createServer();
export const io = new Server(httpServer, {
	path: "/socketio/",
	allowEIO3: true,
	cors: {
		origin: "https://wieltonmobiledev.azureedge.net",
		methods: ["GET", "POST"],
		credentials: true
	  }
});

