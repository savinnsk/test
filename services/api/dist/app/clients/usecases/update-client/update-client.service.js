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
exports.UpdateClientService = void 0;
const common_1 = require("@nestjs/common");
const clients_repository_1 = require("../../repositories/clients.repository");
const payments_configs_repository_1 = require("../../../payments-configs/repositories/payments-configs.repository");
let UpdateClientService = class UpdateClientService {
    constructor(clientsRepository, paymentsConfigsRepository) {
        this.clientsRepository = clientsRepository;
        this.paymentsConfigsRepository = paymentsConfigsRepository;
    }
    async execute({ id, updateClientDto, }) {
        try {
            const currentClient = await this.clientsRepository.findById(id);
            if (!currentClient) {
                throw new common_1.NotFoundException('Client not found');
            }
            const paymentsConfigs = currentClient.paymentsConfigs;
            const paymentsConfigNames = updateClientDto.paymentsConfigs.map((config) => config.name);
            const configsWillRemoved = paymentsConfigs.filter((config) => {
                return paymentsConfigNames.includes(config.name);
            });
            console.log('🚀 ~ file: update-client.service.ts:42 ~ UpdateClientService ~ configsWillRemoved ~ configsWillRemoved:', configsWillRemoved);
            await this.paymentsConfigsRepository.deleteMany({
                paymentsConfigs: configsWillRemoved,
            });
            const paymentsConfigCreated = await this.paymentsConfigsRepository.createMany({
                paymentsConfigs: updateClientDto.paymentsConfigs,
            });
            const updatedClient = await this.clientsRepository.update(id, {
                client: Object.assign(Object.assign({}, updateClientDto), { paymentsConfigs: paymentsConfigCreated }),
            });
            if (!updatedClient) {
                throw new common_1.NotFoundException('Client not found');
            }
            return updatedClient;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
UpdateClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_repository_1.ClientsRepository,
        payments_configs_repository_1.PaymentsConfigsRepository])
], UpdateClientService);
exports.UpdateClientService = UpdateClientService;
//# sourceMappingURL=update-client.service.js.map