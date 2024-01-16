import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ILoginService } from '@domain/interfaces/login-service.interface';

@Injectable()
export class LoginService {
  constructor(private readonly jwtService: JwtService) {}
  execute({ user }: ILoginService): { accessToken: string } {
    const payload = { email: user.email, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
