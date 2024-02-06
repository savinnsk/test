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
exports.CreateClientService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const clients_repository_1 = require("../../repositories/clients.repository");
const payments_configs_repository_1 = require("../../../payments-configs/repositories/payments-configs.repository");
let CreateClientService = class CreateClientService {
    constructor(clientsRepository, paymentsConfigsRepository) {
        this.clientsRepository = clientsRepository;
        this.paymentsConfigsRepository = paymentsConfigsRepository;
    }
    async execute({ createClientDto, }) {
        try {
            const apiKey = `pph_${(0, uuid_1.v4)()}`;
            const hasPaymentsConfigs = (createClientDto === null || createClientDto === void 0 ? void 0 : createClientDto.paymentsConfigs.length) > 0 ||
                createClientDto.paymentsConfigs;
            const paymentsConfigs = hasPaymentsConfigs
                ? await this.paymentsConfigsRepository.createMany({
                    paymentsConfigs: createClientDto.paymentsConfigs,
                })
                : [];
            const createdClient = await this.clientsRepository.create({
                client: Object.assign(Object.assign({}, createClientDto), { apiKey: apiKey, paymentsConfigs }),
            });
            createdClient.apiKey = apiKey;
            return createdClient;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
CreateClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_repository_1.ClientsRepository,
        payments_configs_repository_1.PaymentsConfigsRepository])
], CreateClientService);
exports.CreateClientService = CreateClientService;
//# sourceMappingURL=create-client.service.js.map