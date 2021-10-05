"use strict";
//import { Socket } from "socket.io"
//
//type SocketsMap = {
//	[key: string]: Socket[]
//}
//
//let socketsMap: SocketsMap = {};
//
//export function getUserSockets(id: string) {
//    return socketsMap[id]
//}
//
//export function getUsersSockets(ids: string[]) {
//	return ids.reduce((acc,id) => {
//		acc.push(...socketsMap[id])
//		return acc
//	}, ([] as Socket[]))
//}
//
//export function getSockets() {
//    return Object.values(socketsMap)
//}
//
//export function addSocket(id: string, socket: Socket) {
//	if (socketsMap[id]) {
//		socketsMap[id].push(socket)
//	} else {
//		socketsMap[id] = [socket]
//	}
//    return
//}
//
//export function closeSocket(socketId: string) {
//	Object.keys(socketsMap).map((userId) => {
//		socketsMap[userId].find(s => s.id == socketId)?.disconnect(true)
//		socketsMap[userId] = socketsMap[userId].filter(s => s.id != socketId)
//		if (socketsMap[userId] == []) {
//			delete socketsMap[userId]
//		}
//	})
//    return
//}
//
