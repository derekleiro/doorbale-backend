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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const response_1 = require("../models/response");
const session_1 = __importDefault(require("../models/session"));
function errorHandler(checks, res, req, next, callback, sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (sessionId) {
                if (req.params.sessionId === undefined || req.params.sessionId === null) {
                    return new response_1.Response(res).json(400, "SessionId not provided", null);
                }
                const session = yield session_1.default.findOne({ sessionId: req.params.sessionId });
                if (session === null) {
                    return new response_1.Response(res).json(404, "Session not found", null);
                }
            }
            for (let check of checks) {
                if (!check) {
                    return new response_1.Response(res).json(400, "Invalid request", null);
                }
            }
            callback();
        }
        catch (e) {
            return new response_1.Response(res).json(500, e.toString(), null);
        }
    });
}
