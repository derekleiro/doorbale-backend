"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const response_1 = require("./models/response");
const mongoose = __importStar(require("mongoose"));
require("dotenv").config();
// Logging write stream
const logFile = fs_1.default.createWriteStream("app.log", { flags: "a" });
console.log = function () {
    // @ts-ignore
    logFile.write(util_1.default.format.apply(null, arguments) + "\n");
    // @ts-ignore
    process.stdout.write(util_1.default.format.apply(null, arguments) + "\n");
};
console.error = function () {
    // @ts-ignore
    logFile.write(util_1.default.format.apply(null, arguments) + "\n");
    // @ts-ignore
    process.stderr.write(util_1.default.format.apply(null, arguments) + "\n");
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((req, res, next) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_SERVER);
        res.setHeader("Access-Control-Allow-Method", "OPTIONS, POST, GET, PUT, PATH, DELETE");
    }
    catch (e) {
        console.error(e);
    }
    next();
});
app.use((req, res, next) => {
    throw new HttpError("Could not find this route");
});
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    new response_1.Response(res).json(error.code || 500, error.message || "An unknown error has occurred", null);
});
mongoose
    .connect(process.env.MONGODB_URI)
    .then((result) => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at ${process.env.PORT}`);
    });
})
    .catch((e) => {
    console.error(e);
});
