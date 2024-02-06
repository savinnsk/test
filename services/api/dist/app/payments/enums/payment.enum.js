"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = exports.PaymentGateway = exports.PaymentMethod = void 0;
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CreditCard"] = "credit_card";
    PaymentMethod["Pix"] = "pix";
    PaymentMethod["Billet"] = "billet";
})(PaymentMethod = exports.PaymentMethod || (exports.PaymentMethod = {}));
var PaymentGateway;
(function (PaymentGateway) {
    PaymentGateway["Paypal"] = "paypal";
    PaymentGateway["MercadoPago"] = "mercadopago";
    PaymentGateway["Pagarme"] = "pagarme";
    PaymentGateway["PagSeguro"] = "pagseguro";
    PaymentGateway["Vindi"] = "vindi";
    PaymentGateway["Koin"] = "koin";
})(PaymentGateway = exports.PaymentGateway || (exports.PaymentGateway = {}));
var Currency;
(function (Currency) {
    Currency["USD"] = "USD";
    Currency["BRL"] = "BRL";
    Currency["ARS"] = "ARS";
    Currency["EUR"] = "EUR";
})(Currency = exports.Currency || (exports.Currency = {}));
//# sourceMappingURL=payment.enum.js.map