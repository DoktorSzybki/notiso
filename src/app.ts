require("dotenv").config();
import { io, httpServer } from "./connectors/socketio"
import redis from "./connectors/redis"
import { initObserver } from "./listeners/initObserver"
import { Socket } from "socket.io";
import { EventModel } from "./models/event"

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


redis.on("message", async (channel, message) => {
	console.log(`Received ${message} from ${channel}`);
	try {
		const event = JSON.parse(message) as EventModel
		if ("broadcast" in event) {
			io.emit(event.name, event.payload)
			return	
		}
		await Promise.all(event.rooms.map(room => {
			io.to(room).emit(event.name, event.payload)
		}))
	} catch (error) {
		console.log(error)
		return
	}
});


httpServer.listen(process.env.PORT, () => console.log("success"))
