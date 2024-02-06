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
exports.AwesomeapiAdapter = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AwesomeapiAdapter = class AwesomeapiAdapter {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async convert(props) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://economia.awesomeapi.com.br/last/${props.from}-${props.to}`));
        const quotation = response.data[`${props.from}${props.to}`].ask;
        const conversion = props.value * quotation;
        const exchange = {
            from: props.from,
            to: props.to,
            initialValue: props.value,
            quotation: Number(Number(quotation).toFixed(2)),
            exchange: Number(conversion.toFixed(2)),
        };
        return exchange;
    }
};
AwesomeapiAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AwesomeapiAdapter);
exports.AwesomeapiAdapter = AwesomeapiAdapter;
//# sourceMappingURL=awesomeapi.service.js.map