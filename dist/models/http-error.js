"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.default = HttpError;
