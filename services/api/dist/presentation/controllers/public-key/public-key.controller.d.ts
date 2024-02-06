import { Response } from 'express';
import { Client } from '@domain/entities/client/client.schema';
import { PublicKeyQueryDto } from '@domain/dtos/get-public-key-query.dto';
import { GetPublicKeysService } from '@app/public-keys/usecases/get-public-keys.service';
export declare class PublicKeysController {
    private readonly getPublicKeysService;
    constructor(getPublicKeysService: GetPublicKeysService);
    createPlan(query: PublicKeyQueryDto, user: Client, response: Response): Promise<Response<any, Record<string, any>>>;
}
