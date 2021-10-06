import { verify } from "../auth/verify"
import { Socket } from "socket.io"

export async function initObserver(socket: Socket, data: any) {
	console.log(`Received initObserver event with payload:\n${data}`)
	try {
		if (process.env.AUTH == "true") {
			await verify(data)
		}
		if ("rooms" in data) {
			data.rooms.map((room: any) => {
				if (typeof room == "string") {
					socket.join(room)
				}
			})
		}
		socket.emit("success")
		} catch (error) {
		console.log("failed to auth")
		socket.emit("error")
		return
	}
}
