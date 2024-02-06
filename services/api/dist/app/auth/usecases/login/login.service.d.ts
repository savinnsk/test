import { JwtService } from '@nestjs/jwt';
import { ILoginService } from '@domain/interfaces/login-service.interface';
export declare class LoginService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    execute({ user }: ILoginService): {
        accessToken: string;
    };
}
