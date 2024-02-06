import { UserDocument } from '@domain/entities/user/user.schema';
import { CreateUserDto } from '@domain/dtos/user/create-user.dto';
import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';
export declare abstract class UsersRepository {
    abstract create(params: {
        user: CreateUserDto;
        id?: string;
    }): Promise<UserDocument>;
    abstract findAll(params?: PaginationRequest): Promise<PaginationResponse>;
    abstract findById(id: string): Promise<UserDocument | null>;
    abstract findByEmail(email: string): Promise<UserDocument | null>;
}
