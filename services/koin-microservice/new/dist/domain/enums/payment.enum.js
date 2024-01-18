"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusOrder = exports.Gender = exports.InterestType = exports.BoletoType = exports.DocumentType = exports.TypeCustomer = void 0;
var TypeCustomer;
(function (TypeCustomer) {
    TypeCustomer["Individual"] = "individual";
    TypeCustomer["Company"] = "company";
})(TypeCustomer = exports.TypeCustomer || (exports.TypeCustomer = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType["CPF"] = "CPF";
    DocumentType["CNPJ"] = "CNPJ";
    DocumentType["PASSAPORT"] = "PASSAPORT";
})(DocumentType = exports.DocumentType || (exports.DocumentType = {}));
var BoletoType;
(function (BoletoType) {
    BoletoType["DM"] = "DM";
    BoletoType["BDP"] = "BDP";
})(BoletoType = exports.BoletoType || (exports.BoletoType = {}));
var InterestType;
(function (InterestType) {
    InterestType["FLAT"] = "flat";
    InterestType["PERCENTAGE"] = "percentage";
})(InterestType = exports.InterestType || (exports.InterestType = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender = exports.Gender || (exports.Gender = {}));
var StatusOrder;
(function (StatusOrder) {
    StatusOrder["Paid"] = "paid";
    StatusOrder["Captured"] = "captured";
    StatusOrder["Pending"] = "pending";
})(StatusOrder = exports.StatusOrder || (exports.StatusOrder = {}));
//# sourceMappingURL=payment.enum.js.map