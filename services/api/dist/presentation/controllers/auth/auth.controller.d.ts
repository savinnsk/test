import { LoginService } from '@app/auth/usecases/login/login.service';
export declare class AuthController {
    private loginService;
    constructor(loginService: LoginService);
    login(req: any): Promise<{
        accessToken: string;
    }>;
    getProfile(req: any): any;
}
