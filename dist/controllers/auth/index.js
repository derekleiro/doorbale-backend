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
exports.phoneLogin = phoneLogin;
exports.phoneRegister = phoneRegister;
exports.emailLogin = emailLogin;
exports.emailRegister = emailRegister;
exports.verifyEmail2FA = verifyEmail2FA;
exports.verifyPhone2FA = verifyPhone2FA;
exports.getAccount = getAccount;
function phoneLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // login logic
    });
}
function phoneRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // register logic
    });
}
function emailLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // login logic
    });
}
function emailRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // register logic
    });
}
function verifyEmail2FA(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // 2FA verification logic
    });
}
function verifyPhone2FA(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // 2FA verification logic
    });
}
function getAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // get account logic
    });
}
