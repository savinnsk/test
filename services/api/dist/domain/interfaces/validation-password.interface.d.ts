import { UserDocument } from '@domain/entities/user/user.schema';
export interface IValidationPasswordService {
    password: string;
    user: UserDocument;
}
