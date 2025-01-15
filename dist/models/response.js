"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
class Response {
    constructor(res) {
        this._res = null;
        this.json = (status, message, body) => {
            this._res.status(status).json({
                message,
                status,
                body,
            });
        };
        // TODO: Add a logger
        this.res = this._res;
        this._res = res;
    }
}
exports.Response = Response;
