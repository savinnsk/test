import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpCode,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { CreateClientService } from '@app/clients/usecases/create-client/create-client.service';
import { FindAllClientService } from '@app/clients/usecases/find-all-client/find-all-client.service';
import { FindClientByIdService } from '@app/clients/usecases/find-client-by-id/find-client-by-id.service';
import { UpdateClientService } from '@app/clients/usecases/update-client/update-client.service';
import { DeleteClientService } from '@app/clients/usecases/delete-client/delete-client.service';
import { UpdateClientByApiKeyService } from '@app/clients/usecases/update-client-by-api-key/update-client-by-api-key.service';
import { CreateClientDto } from '@domain/dtos/client/create-client.dto';
import { UpdateClientDto } from '@domain/dtos/client/update-client.dto';
import { ClientMapper } from '@presentation/mappers/client.mapper';
import {
  ClientCreatedResponseDoc,
  ClientInfoDoc,
  CreateClientRequestDoc,
} from '@common/docs';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { ApiKeyAuthGuard } from '@app/auth/guards/api-key-auth.guard';

@ApiTags('clients')
@ApiBearerAuth()
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly createClientService: CreateClientService,
    private readonly updateClientService: UpdateClientService,
    private readonly deleteClientService: DeleteClientService,
    private readonly findAllClientService: FindAllClientService,
    private readonly findClientByIdService: FindClientByIdService,
    private readonly updateClientByApiKeyService: UpdateClientByApiKeyService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new client.',
    description: 'Create a new client with name and payments config',
  })
  @ApiBody({
    type: CreateClientRequestDoc,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ClientCreatedResponseDoc,
  })
  async create(
    @Res() response: Response,
    @Body() createClientDto: CreateClientDto,
  ) {
    try {
      const client = await this.createClientService.execute({
        createClientDto,
      });

      return response.status(200).send({ client });
    } catch (error) {
      return response.status(400).send({
        message: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all clients.',
    description: 'Get all clients with informations',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ClientInfoDoc,
    isArray: true,
  })
  async findAll(
    @Res() response: Response,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const clients = await this.findAllClientService.execute({
      page,
      limit: limit || 5,
    });

    return response.status(200).send({ clients });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get a client by id.',
    description: 'Get a client by id with informations',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ClientInfoDoc,
  })
  async findOne(@Param('id') id: string) {
    const data = await this.findClientByIdService.execute(id);
    return ClientMapper.toJSON({ data, showApiKey: true });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Patch a client by id.',
    description: 'Modify clients informations.',
  })
  @ApiBody({
    type: CreateClientRequestDoc,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ClientInfoDoc,
  })
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.updateClientService.execute({ id, updateClientDto });
  }

  @UseGuards(ApiKeyAuthGuard)
  @Put('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Patch a client by id.',
    description: 'Modify clients informations.',
  })
  @ApiBody({
    type: CreateClientRequestDoc,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ClientInfoDoc,
  })
  async updateByApiKey(
    @Body() updateClientDto: UpdateClientDto,
    @CurrentUser() user: any,
  ) {
    return await this.updateClientByApiKeyService.execute({
      apiKey: user.apiKey,
      updateClientDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a client by id.',
    description: 'Delete a client by id.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  remove(@Param('id') id: string) {
    return this.deleteClientService.execute(id);
  }
}
