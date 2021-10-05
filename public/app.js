"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var socketio_1 = require("./connectors/socketio");
var initObserver_1 = require("./listeners/initObserver");
if (!process.env.PORT ||
    !process.env.REDIS ||
    !process.env.REDISPORT ||
    !process.env.AUTHSERVICE) {
    throw "Missing env variables";
}
socketio_1.io.on("connection", function (socket) {
    console.log("New client app connected");
    socket.on("initObserver", function (data) {
        initObserver_1.initObserver(socket, data);
    });
    socket.on("join", function (room) {
        socket.join(room);
    });
    socket.on("leave", function (room) {
        socket.leave(room);
    });
});
socketio_1.httpServer.listen(process.env.PORT, function () { return console.log("success"); });
