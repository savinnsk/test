"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_client_service_1 = require("./create-client/create-client.service");
const delete_client_service_1 = require("./delete-client/delete-client.service");
const find_all_client_service_1 = require("./find-all-client/find-all-client.service");
const find_client_by_api_key_service_1 = require("./find-client-by-api-key/find-client-by-api-key.service");
const find_client_by_id_service_1 = require("./find-client-by-id/find-client-by-id.service");
const update_client_by_api_key_service_1 = require("./update-client-by-api-key/update-client-by-api-key.service");
const update_client_service_1 = require("./update-client/update-client.service");
exports.default = [
    create_client_service_1.CreateClientService,
    find_all_client_service_1.FindAllClientService,
    find_client_by_id_service_1.FindClientByIdService,
    find_client_by_api_key_service_1.FindClientByApiKeyService,
    update_client_service_1.UpdateClientService,
    delete_client_service_1.DeleteClientService,
    update_client_by_api_key_service_1.UpdateClientByApiKeyService,
];
//# sourceMappingURL=index.js.map