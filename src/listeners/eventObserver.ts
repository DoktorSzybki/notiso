import Redis from "ioredis"
import { EventModel } from "../models/event"
import { io } from "../connectors/socketio"

const redis = new Redis(parseInt(process.env.REDISPORT!), process.env.REDIS);

redis.subscribe("event", (error, count) => {
	if (error) {
    	console.error("Failed to subscribe");
		console.log(error)
	} else {
		console.log("Success")
	}
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

