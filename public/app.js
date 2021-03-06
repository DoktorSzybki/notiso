"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var socketio_1 = require("./connectors/socketio");
var redis_1 = __importDefault(require("./connectors/redis"));
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
redis_1.default.on("message", function (channel, message) { return __awaiter(void 0, void 0, void 0, function () {
    var event_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Received " + message + " from " + channel);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                event_1 = JSON.parse(message);
                if ("broadcast" in event_1) {
                    socketio_1.io.emit(event_1.name, event_1.payload);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Promise.all(event_1.rooms.map(function (room) {
                        socketio_1.io.to(room).emit(event_1.name, event_1.payload);
                    }))];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
socketio_1.httpServer.listen(process.env.PORT, function () { return console.log("success"); });
