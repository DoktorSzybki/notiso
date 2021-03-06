"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.push = void 0;
var webPush = __importStar(require("web-push"));
var admin = __importStar(require("firebase-admin"));
webPush.setVapidDetails("mailto:michal@blesu.com", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
var webPushOptions = {
    vapidDetails: {
        subject: "mailto:michal@blesu.com",
        publicKey: process.env.VAPID_PUBLIC_KEY,
        privateKey: process.env.VAPID_PRIVATE_KEY,
    },
};
function push(event, subscription) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var badgeNumber, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    if (!(subscription.service == "firebase")) return [3 /*break*/, 2];
                    badgeNumber = ((_a = subscription.unreadNotifications) !== null && _a !== void 0 ? _a : 0) + 1;
                    return [4 /*yield*/, sendFirebaseNotification(subscription.address, event, badgeNumber)];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 2:
                    if (!(subscription.service == "web")) return [3 /*break*/, 4];
                    return [4 /*yield*/, sendWebNotification(subscription.address, event)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [2 /*return*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.push = push;
function sendWebNotification(address, payload) {
    return __awaiter(this, void 0, void 0, function () {
        var eventType, eventTitle, eventBody, eventPayload, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    eventType = payload.eventType, eventTitle = payload.eventTitle, eventBody = payload.eventBody, eventPayload = payload.eventPayload;
                    return [4 /*yield*/, webPush
                            .sendNotification(JSON.parse(address), JSON.stringify({
                            event: eventType,
                            title: eventTitle,
                            body: eventBody,
                            payload: eventPayload,
                        }), webPushOptions)];
                case 1:
                    result = _a.sent();
                    console.log("Sent web push notification:\n", result);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
;
function sendFirebaseNotification(address, payload, badgeNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var eventType, eventTitle, eventBody, eventPayload, message, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    eventType = payload.eventType, eventTitle = payload.eventTitle, eventBody = payload.eventBody, eventPayload = payload.eventPayload;
                    message = {
                        notification: {
                            title: eventTitle,
                            body: eventBody,
                        },
                        apns: {
                            headers: {
                                'apns-priority': '10',
                            },
                            payload: {
                                aps: {
                                    sound: 'default',
                                    badge: badgeNumber,
                                }
                            },
                        },
                        data: {
                            event: eventType,
                            title: eventTitle,
                            body: eventBody,
                            payload: JSON.stringify(eventPayload),
                        },
                        token: address
                    };
                    return [4 /*yield*/, admin.messaging().send(message)];
                case 1:
                    response = _a.sent();
                    console.log("Sent firebase push notification:\nresponse");
                    return [2 /*return*/];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
