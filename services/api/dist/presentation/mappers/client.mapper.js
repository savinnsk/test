"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientMapper = void 0;
class ClientMapper {
    static toJSON({ data, showApiKey = false }) {
        return {
            id: data._id,
            name: data.name,
            createdAt: data.createdAt.toISOString(),
            updatedAt: data.updatedAt.toISOString(),
            apiKey: showApiKey ? data.apiKey : undefined,
            paymentsConfigs: data.paymentsConfigs,
        };
    }
}
exports.ClientMapper = ClientMapper;
//# sourceMappingURL=client.mapper.js.map