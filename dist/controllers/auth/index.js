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
exports.phoneLogin = phoneLogin;
exports.phoneRegister = phoneRegister;
exports.emailLogin = emailLogin;
exports.emailRegister = emailRegister;
exports.verifyEmail2FA = verifyEmail2FA;
exports.verifyPhone2FA = verifyPhone2FA;
exports.verifyPIN = verifyPIN;
exports.getAccount = getAccount;
const error_handler_1 = require("../../utils/error-handler");
const response_1 = require("../../models/response");
const session_1 = __importDefault(require("../../models/session"));
const customer_1 = __importDefault(require("../../models/customer"));
const delivery_1 = __importDefault(require("../../models/delivery"));
function phoneLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // login logic
    });
}
function phoneRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // register logic
        if (!req.body.name || !req.body.email || !req.body.phoneNumber || !req.body.address || !req.body.area || !req.body.coordinates) {
            return new response_1.Response(res).json(400, "Invalid request", null);
        }
        try {
            const data = {
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                area: req.body.area,
                coordinates: req.body.coordinates
            };
            yield (0, error_handler_1.errorHandler)([], res, req, next, () => __awaiter(this, void 0, void 0, function* () {
                const session = yield session_1.default.findOne({ sessionId: req.params.sessionId });
                const age = session.data.about.age;
                const gender = session.data.about.gender;
                const height = session.data.about.height;
                const size = session.data.about.size;
                const phone_number = data.phoneNumber;
                const email_address = data.email;
                const newCustomer = new customer_1.default({
                    gender,
                    age,
                    height,
                    size,
                    phone_number,
                    email_address,
                });
                const savedCustomer = yield newCustomer.save();
                const customerId = savedCustomer._id;
                const newDeliveryAddress = new delivery_1.default({
                    address: data.address,
                    area: data.area,
                    coordinates: data.coordinates,
                    customer_id: customerId,
                });
                const savedAddress = yield newDeliveryAddress.save();
                return new response_1.Response(res).json(200, "Customer saved", {
                    addressId: savedAddress._id,
                    customerId: customerId,
                    deliveryDetails: savedAddress
                });
            }), req.params.sessionId);
        }
        catch (e) {
            return new response_1.Response(res).json(500, e.toString(), null);
        }
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
function verifyPIN(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // PIN verification logic
    });
}
function getAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // get account logic
    });
}
