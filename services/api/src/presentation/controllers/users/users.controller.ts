import { Response } from 'express';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { CreateUserService } from '@app/users/usecases/create-user/create-user.service';
import { FindAllUsersService } from '@app/users/usecases/find-all-users/find-all-users.service';
import { FindUserByIdService } from '@app/users/usecases/find-user-by-id/find-user-by-id.service';
import { CreateUserDto } from '@domain/dtos/user/create-user.dto';
import { UserCreatedDoc } from '@common/docs';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findAllUsersService: FindAllUsersService,
    private readonly findUserByIdService: FindUserByIdService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new user.',
    description: 'Create a new user with name, email and password.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserCreatedDoc,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUserService.execute(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all users.',
    description: 'Get all users with all informations.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserCreatedDoc,
    isArray: true,
  })
  @Get()
  async findAll(
    @Res() response: Response,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const users = await this.findAllUsersService.execute({
      page,
      limit: limit || 5,
    });

    return response.status(200).send({ users });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get an user by id.',
    description: 'Get an user by id with all informations.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserCreatedDoc,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findUserByIdService.execute(id);
  }
}
