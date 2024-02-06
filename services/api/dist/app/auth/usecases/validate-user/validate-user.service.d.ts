import { FindUserByEmailService } from '@app/users/usecases/find-user-by-email/find-user-by-email.service';
import { ValidationPasswordService } from '@app/users/usecases/validation-password/validation-password.service';
import { UserDocument } from '@domain/entities/user/user.schema';
import { IValidateUserService } from '@domain/interfaces/validate-user.interface';
export declare class ValidateUserService {
    private readonly findUserByEmailService;
    private readonly validationPasswordService;
    constructor(findUserByEmailService: FindUserByEmailService, validationPasswordService: ValidationPasswordService);
    execute({ email, password, }: IValidateUserService): Promise<UserDocument | null>;
}
