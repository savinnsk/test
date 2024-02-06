import { Model } from 'mongoose';
import { UsersRepository } from '@app/users/repositories/users.repository';
import { CreateUserDto } from '@domain/dtos/user/create-user.dto';
import { UserDocument } from '@domain/entities/user/user.schema';
import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';
export declare class MongoUsersRepository implements UsersRepository {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    create(params: {
        user: CreateUserDto;
    }): Promise<UserDocument>;
    findAll(params?: PaginationRequest): Promise<PaginationResponse>;
    findById(id: string): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument>;
}
