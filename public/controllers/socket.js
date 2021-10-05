"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeSocket = exports.addSocket = exports.getSockets = exports.getSocket = void 0;
var socketsMap = {};
function getSocket(id) {
    return socketsMap[id];
}
exports.getSocket = getSocket;
function getSockets() {
    return Object.values(socketsMap);
}
exports.getSockets = getSockets;
function addSocket(id, socket) {
    if (socketsMap[id]) {
        socketsMap[id].push(socket);
    }
    else {
        socketsMap[id] = [socket];
    }
    return;
}
exports.addSocket = addSocket;
function closeSocket(socketId) {
    Object.keys(socketsMap).map(function (userId) {
        var _a;
        (_a = socketsMap[userId].find(function (s) { return s.id == socketId; })) === null || _a === void 0 ? void 0 : _a.disconnect(true);
        socketsMap[userId] = socketsMap[userId].filter(function (s) { return s.id != socketId; });
        if (socketsMap[userId] == []) {
            delete socketsMap[userId];
        }
    });
    return;
}
exports.closeSocket = closeSocket;
