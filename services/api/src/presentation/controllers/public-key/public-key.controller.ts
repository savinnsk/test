import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ApiKeyAuthGuard } from '@app/auth/guards/api-key-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Client } from '@domain/entities/client/client.schema';
import { PublicKeyQueryDto } from '@domain/dtos/get-public-key-query.dto';
import { GetPublicKeysService } from '@app/public-keys/usecases/get-public-keys.service';

@ApiTags('public-keys')
@ApiBearerAuth()
@UseGuards(ApiKeyAuthGuard)
@Controller('public-keys')
export class PublicKeysController {
  constructor(private readonly getPublicKeysService: GetPublicKeysService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async createPlan(
    @Query() query: PublicKeyQueryDto,
    @CurrentUser() user: Client,
    @Res() response: Response,
  ) {
    const result = await this.getPublicKeysService.execute(query, user);

    return response.status(200).send(result);
  }
}
