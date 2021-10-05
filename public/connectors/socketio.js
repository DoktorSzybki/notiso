"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.httpServer = void 0;
var http_1 = require("http");
var socket_io_1 = require("socket.io");
exports.httpServer = http_1.createServer();
exports.io = new socket_io_1.Server(exports.httpServer, {});
