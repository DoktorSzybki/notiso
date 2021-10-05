"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ioredis_1 = __importDefault(require("ioredis"));
var redis = new ioredis_1.default();
redis.subscribe("my-channel-2", function (error, count) {
    if (err) {
        // Just like other commands, subscribe() can fail for some reasons,
        // ex network issues.
        console.error("Failed to subscribe: %s", err.message);
    }
    else {
        // `count` represents the number of channels this client are currently subscribed to.
        console.log("Subscribed successfully! This client is currently subscribed to " + count + " channels.");
    }
});
redis.on("message", function (channel, message) {
    console.log("Received " + message + " from " + channel);
});
