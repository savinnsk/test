"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMapper = void 0;
const uuid_1 = require("uuid");
const get_phone_fields_1 = require("../../helper/get-phone-fields");
class OrderMapper {
    static billetToKoin({ data }) {
        return {
            data: {
                Cpf: data.payer.document,
                Email: data.payer.email,
                TotalPrice: String(data.amount),
                Ip: '17740347',
                Optin: 'true',
                SalesChannelId: '00',
                MaxInstallments: '12',
                AdditionalData: {
                    CarRentalData: {
                        metadata: Object.create(data),
                    },
                },
            },
        };
    }
    static cardToKoin({ data, credentials, }) {
        var _a, _b, _c, _d, _e;
        const { AreaCode, Number } = (0, get_phone_fields_1.getPhoneFields)(data.payer.phone);
        return {
            data: {
                store: {
                    code: credentials.iss,
                },
                transaction: {
                    amount: {
                        currency_code: data.currency,
                        value: data.amount,
                    },
                    reference_id: (_a = data.metadata) === null || _a === void 0 ? void 0 : _a.antifraud_ref_id,
                    account: credentials.account_number,
                },
                payment_method: {
                    code: 'CARD',
                    secure_token: data.koinCreditCardToken,
                    installments: data.installments,
                },
                payer: {
                    full_name: data.payer.firstName + ' ' + data.payer.lastName,
                    email: data.payer.email,
                    document: {
                        type: data.payer.documentType.toLowerCase(),
                        number: data.payer.document,
                    },
                },
                country_code: data.payer.billingAddress.country,
                notification_url: [data.callbackUrl],
                buyer: {
                    document: {
                        number: data.payer.document,
                        nationality: data.payer.billingAddress.country,
                        type: data.payer.documentType.toUpperCase(),
                    },
                    phone: {
                        area_code: AreaCode,
                        number: Number,
                        type: 'Mobile',
                    },
                    id: (0, uuid_1.v4)(),
                    first_name: data.payer.firstName,
                    last_name: data.payer.lastName,
                    full_name: data.payer.firstName + ' ' + data.payer.lastName,
                    email: data.payer.email,
                    birth_date: data.payer.dateOfBirth,
                },
                session_id: ((_b = data.metadata) === null || _b === void 0 ? void 0 : _b.sessionId)
                    ? (_c = data.metadata) === null || _c === void 0 ? void 0 : _c.sessionId
                    : '5b8c20c3-45de-41bf-b243-87ad5d21bc3b',
                ip_address: ((_d = data.metadata) === null || _d === void 0 ? void 0 : _d.ip) ? (_e = data.metadata) === null || _e === void 0 ? void 0 : _e.ip : '127.0.0.1',
                items: [
                    {
                        price: {
                            currency_code: data.currency,
                            value: data.amount,
                        },
                        category: {
                            name: data.code,
                            id: (0, uuid_1.v4)(),
                        },
                        type: 'Generic',
                        id: (0, uuid_1.v4)(),
                        name: 'Generic Item',
                        quantity: 1,
                    },
                ],
            },
        };
    }
    static tokenizeCard(dataCard, referenceId) {
        return {
            transaction: {
                reference_id: referenceId,
            },
            card: {
                number: dataCard.number,
                expiration_month: dataCard.expirationMonth.toString(),
                expiration_year: dataCard.expirationYear.toString(),
                security_code: dataCard.cvv.toString(),
                holder_name: dataCard.holderName,
            },
        };
    }
    static captureCardToKoinToApi(data) {
        return {
            data: {
                transactionId: data.order_id,
            },
        };
    }
    static toApi({ data, dto }) {
        if (data.order_id) {
            Object.assign(data, {
                transactionId: data.order_id,
            });
            return { data: data };
        }
        const response = Object.assign(Object.assign({}, dto), { status: data.status, installmentOptions: data.installmentOptions.map((option) => ({
                incomingPercentValue: option.incomingPercentValue,
                fee: option.feeKoin,
                description: option.description,
                originalValue: option.originalValue,
                valueResidueFeeTotal: option.valueResidueFeeKoinTotal,
                orderValue: option.orderValue,
                maxValueFee: option.maxValueFeeKoin,
                paymentType: option.paymentType,
                installments: option.installments,
                valueFeeTotal: option.valueFeeKoinTotal,
                firstDueDate: option.firstDueDate,
                hasIncoming: option.hasIncoming,
                installmentValue: option.installmentValue,
                incomingValue: option.incomingValue,
            })), transactionId: data.code });
        return { data: response };
    }
}
exports.OrderMapper = OrderMapper;
//# sourceMappingURL=order.mapper.js.map