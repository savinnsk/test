import { Strategy } from 'passport-local';
import { ValidateUserService } from '../usecases/validate-user/validate-user.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private validateUserService;
    constructor(validateUserService: ValidateUserService);
    validate(email: string, password: string): Promise<any>;
}
export {};
