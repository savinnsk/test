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
import { HashService } from '@common/hash/hash.service';
import { CreateUserDto } from '@domain/dtos/user/create-user.dto';
import { UsersRepository } from '@app/users/repositories/users.repository';
export declare class CreateUserService {
    private readonly hashService;
    private readonly usersRepository;
    constructor(hashService: HashService, usersRepository: UsersRepository);
    execute(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, any, import("../../../../domain/entities/user/user.schema").User> & import("../../../../domain/entities/user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
