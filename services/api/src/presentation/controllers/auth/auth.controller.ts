import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@app/auth/guards/local-auth.guard';
import { LoginService } from '@app/auth/usecases/login/login.service';
import { LoginRequestDoc, LoginResponseDoc, MeResponseDoc } from '@common/docs';

@ApiTags('auth')
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
@Controller('auth')
export class AuthController {
  constructor(private loginService: LoginService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Credentials to login',
    description: 'Use your credentials to login and get access token',
  })
  @ApiBody({
    type: LoginRequestDoc,
  })
  @ApiOkResponse({
    description: 'Successful authentication',
    type: LoginResponseDoc,
  })
  @Post('/login')
  async login(@Request() req) {
    return this.loginService.execute({ user: req.user });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get your profile infos',
    description: 'Use your token to get some of your informations',
  })
  @ApiOkResponse({
    type: MeResponseDoc,
  })
  @Get('/me')
  getProfile(@Request() req) {
    return req.user;
  }
}
