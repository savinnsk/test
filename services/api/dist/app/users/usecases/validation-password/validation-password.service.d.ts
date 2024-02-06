import { HashService } from '@common/hash/hash.service';
import { IValidationPasswordService } from '@domain/interfaces/validation-password.interface';
export declare class ValidationPasswordService {
    private readonly hashService;
    constructor(hashService: HashService);
    execute({ password, user }: IValidationPasswordService): Promise<boolean>;
}
