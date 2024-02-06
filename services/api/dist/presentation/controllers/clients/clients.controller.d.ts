/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { Response } from 'express';
import { CreateClientService } from '@app/clients/usecases/create-client/create-client.service';
import { FindAllClientService } from '@app/clients/usecases/find-all-client/find-all-client.service';
import { FindClientByIdService } from '@app/clients/usecases/find-client-by-id/find-client-by-id.service';
import { UpdateClientService } from '@app/clients/usecases/update-client/update-client.service';
import { DeleteClientService } from '@app/clients/usecases/delete-client/delete-client.service';
import { UpdateClientByApiKeyService } from '@app/clients/usecases/update-client-by-api-key/update-client-by-api-key.service';
import { CreateClientDto } from '@domain/dtos/client/create-client.dto';
import { UpdateClientDto } from '@domain/dtos/client/update-client.dto';
export declare class ClientsController {
    private readonly createClientService;
    private readonly updateClientService;
    private readonly deleteClientService;
    private readonly findAllClientService;
    private readonly findClientByIdService;
    private readonly updateClientByApiKeyService;
    constructor(createClientService: CreateClientService, updateClientService: UpdateClientService, deleteClientService: DeleteClientService, findAllClientService: FindAllClientService, findClientByIdService: FindClientByIdService, updateClientByApiKeyService: UpdateClientByApiKeyService);
    create(response: Response, createClientDto: CreateClientDto): Promise<Response<any, Record<string, any>>>;
    findAll(response: Response, page: number, limit: number): Promise<Response<any, Record<string, any>>>;
    findOne(id: string): Promise<{
        id: import("mongoose").Schema.Types.ObjectId;
        name: string;
        createdAt: string;
        updatedAt: string;
        apiKey: string;
        paymentsConfigs: import("../../../domain/entities/payment-config/payment-config").PaymentConfig[];
    }>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<import("mongoose").Document<unknown, any, import("../../../domain/entities/client/client.schema").Client> & import("../../../domain/entities/client/client.schema").Client & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>;
    updateByApiKey(updateClientDto: UpdateClientDto, user: any): Promise<import("mongoose").Document<unknown, any, import("../../../domain/entities/client/client.schema").Client> & import("../../../domain/entities/client/client.schema").Client & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>;
    remove(id: string): Promise<void>;
}
