"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentProvider = exports.Role = exports.Process = exports.Area = exports.OrderType = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Other"] = "Other";
})(Gender || (exports.Gender = Gender = {}));
var OrderType;
(function (OrderType) {
    OrderType["Individual"] = "Individual";
    OrderType["Kids"] = "Kids";
    OrderType["Family"] = "Family";
})(OrderType || (exports.OrderType = OrderType = {}));
var Area;
(function (Area) {
})(Area || (exports.Area = Area = {}));
var Process;
(function (Process) {
    Process["NewShipment"] = "New Shipment";
    Process["ShipmentSorting"] = "Shipment Sorting";
    Process["ShipmentDispatch"] = "Shipment Dispatch";
    Process["ShipmentDelivered"] = "Shipment Delivered";
    Process["OverdueOrder"] = "Overdue Order";
    Process["OrderQueue"] = "Order Queue";
    Process["OrderCuration"] = "Order Curation";
    Process["OrderDispatch"] = "Order Dispatch";
    Process["OrderDelivered"] = "Order Delivered";
})(Process || (exports.Process = Process = {}));
var Role;
(function (Role) {
    Role["OpsAdmin"] = "Ops Lead";
    Role["OpsTeamMember"] = "Ops Team";
    Role["DeliveryAssociate"] = "Delivery Associate";
    Role["ProductAdmin"] = "Product Lead";
    Role["MarketingAdmin"] = "Marketing Lead";
    Role["Stylist"] = "Stylist";
    Role["Investor"] = "Investor";
    Role["CTO"] = "CTO";
    Role["COO"] = "COO";
    Role["CEO"] = "CEO";
    Role["CustomerRepresentative"] = "Customer Representative";
})(Role || (exports.Role = Role = {}));
var PaymentProvider;
(function (PaymentProvider) {
    PaymentProvider["PayStack"] = "Paystack";
})(PaymentProvider || (exports.PaymentProvider = PaymentProvider = {}));
