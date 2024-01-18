"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosAdapter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let AxiosAdapter = class AxiosAdapter {
    constructor(configService) {
        this.configService = configService;
    }
    async request(data, token) {
        let axiosResponse;
        const baseURL = this.configService.get('apiUri');
        console.log('🚀 ~ file: axios.service.ts:18 ~ AxiosAdapter ~ request ~ baseURL:', baseURL + data.url);
        const formattedApiToken = token;
        try {
            axiosResponse = await axios_1.default.request(Object.assign(Object.assign({ url: baseURL + data.url, method: data.method, data: data.body }, ((data === null || data === void 0 ? void 0 : data.params) && { params: data === null || data === void 0 ? void 0 : data.params })), { headers: Object.assign(Object.assign({}, data === null || data === void 0 ? void 0 : data.headers), { Authorization: formattedApiToken, 'Content-Type': 'application/json' }) }));
        }
        catch (error) {
            axiosResponse = error.response;
        }
        switch (axiosResponse.status) {
            case 401:
                break;
            default:
                break;
        }
        return {
            statusCode: axiosResponse.status,
            body: axiosResponse.data,
        };
    }
    async requestPayment(data, token) {
        let axiosResponse;
        const baseURL = process.env.NEW_KOIN_API_URL;
        if (baseURL === undefined) {
            console.warn('ENV > NEW_KOIN_API_URL > is not defined');
        }
        console.log('🚀 ~ file: axios.service.ts:18 ~ AxiosAdapter ~ request ~ baseURL:', baseURL + data.url);
        if (baseURL == undefined || baseURL == null) {
            return {
                statusCode: 500,
                body: 'PAYMENT URL UNDEFINED',
            };
        }
        const formattedApiToken = token;
        try {
            axiosResponse = await axios_1.default.request(Object.assign(Object.assign({ url: baseURL + data.url, method: data.method, data: data.body }, ((data === null || data === void 0 ? void 0 : data.params) && { params: data === null || data === void 0 ? void 0 : data.params })), { headers: Object.assign(Object.assign({}, data === null || data === void 0 ? void 0 : data.headers), { Authorization: formattedApiToken, 'Content-Type': 'application/json' }) }));
        }
        catch (error) {
            console.log('ERROR>>>>>:', error.data);
            axiosResponse = error.response;
        }
        switch (axiosResponse.status) {
            case 401:
                break;
            default:
                break;
        }
        return {
            statusCode: axiosResponse.status,
            body: axiosResponse.data,
        };
    }
};
AxiosAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AxiosAdapter);
exports.AxiosAdapter = AxiosAdapter;
//# sourceMappingURL=axios.service.js.map