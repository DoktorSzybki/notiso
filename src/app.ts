require("dotenv").config();
import { io, httpServer } from "./connectors/socketio"
import { initObserver } from "./listeners/initObserver"
import { Socket } from "socket.io";

if (!process.env.PORT ||
	!process.env.REDIS ||
	!process.env.REDISPORT ||
	!process.env.AUTHSERVICE) {
		throw "Missing env variables"
	}

io.on("connection", (socket: Socket) => {
	console.log("New client app connected")
	socket.on("initObserver", (data) => {
		initObserver(socket, data)
	})
	socket.on("join", (room) => {
		socket.join(room)
	})
	socket.on("leave", (room) => {
		socket.leave(room)
	})
});

httpServer.listen(process.env.PORT, () => console.log("success"))
