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
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(checks, uid, token, next, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let check of checks) {
                if (!check) {
                    const error = new HttpError("Invalid request");
                    return next(error);
                }
            }
            //let _uid = await verifyIdToken(token, next);
            let _uid = "123456";
            if (uid === _uid) {
                callback();
            }
            else {
                const error = new HttpError("Unauthorized");
                return next(error);
            }
        }
        catch (e) {
            const error = new HttpError(`${e}`);
            return next(error);
        }
    });
}
;
