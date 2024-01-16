import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Response } from 'express';

import { ApiKeyAuthGuard } from '@app/auth/guards/api-key-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Client } from '@domain/entities/client/client.schema';
import { CreateSubscriptionDto } from '@domain/dtos/substription/create-subscription.dto';
import { UpdateSubscriptionDto } from '@domain/dtos/substription/update-subscription.dto';
import { CreateSubscriptionService } from '@app/subscriptions/usecases/create-subscription/create-subscription.service';
import { GetAllSubscriptionsService } from '@app/subscriptions/usecases/get-all-subscriptions/get-all-subscriptions.service';
import { FindSubscriptionService } from '@app/subscriptions/usecases/find-subscription/find-subscription.service';
import { UpdateSubscriptionService } from '@app/subscriptions/usecases/update-subscription/update-subscription.service';
import { CreateSubscriptionDoc, SubscriptionCreatedDoc } from '@common/docs';
import { CancelSubscriptionService } from '@app/subscriptions/usecases/cancel-subscription/cancel-subscription.service';
import { ReactivateSubscriptionService } from '@app/subscriptions/usecases/reactivate-subscription/reactivate-subscription.service';
import { RenewSubscriptionService } from '@app/subscriptions/usecases/renew-subscription/renew-subscription.service';
import { VerifyCreditService } from '@app/subscriptions/usecases/verify-credit/verify-credit.service';

@ApiTags('subscriptions')
@ApiBearerAuth()
@UseGuards(ApiKeyAuthGuard)
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly createSubscriptionService: CreateSubscriptionService,
    private readonly getAllSubscriptionsService: GetAllSubscriptionsService,
    private readonly findSubscriptionService: FindSubscriptionService,
    private readonly updateSubscriptionService: UpdateSubscriptionService,
    private readonly cancelSubscriptionService: CancelSubscriptionService,
    private readonly reactivateSubscriptionService: ReactivateSubscriptionService,
    private readonly renewSubscriptionService: RenewSubscriptionService,
    private readonly verifyCreditService: VerifyCreditService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateSubscriptionDoc,
  })
  @ApiCreatedResponse({
    description: 'Successfully created subscription and integrated to gateway',
    type: SubscriptionCreatedDoc,
  })
  async create(
    @Body() subscription: CreateSubscriptionDto,
    @CurrentUser() user: Client,
  ) {
    try {
      const subscriptionCreated = await this.createSubscriptionService.execute(
        subscription,
        user,
      );

      return subscriptionCreated;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: CreateSubscriptionDoc,
  })
  @ApiCreatedResponse({
    description: 'Successfully created subscription and integrated to gateway',
    type: SubscriptionCreatedDoc,
  })
  async verifyCredit(
    @Body() subscription: CreateSubscriptionDto,
    @CurrentUser() user: Client,
  ) {
    try {
      const result = await this.verifyCreditService.execute(subscription, user);

      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id/reactivate')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateSubscriptionDoc,
  })
  @ApiCreatedResponse({
    description: 'Successfully created subscription and integrated to gateway',
    type: SubscriptionCreatedDoc,
  })
  async reactivate(@Param('id') id: string, @CurrentUser() user: Client) {
    try {
      const subscriptionCreated =
        await this.reactivateSubscriptionService.execute(id, user);

      return subscriptionCreated;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id/renew')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateSubscriptionDoc,
  })
  @ApiCreatedResponse({
    description: 'Successfully created subscription and integrated to gateway',
    type: SubscriptionCreatedDoc,
  })
  async renew(@Param('id') id: string, @CurrentUser() user: Client) {
    try {
      const subscriptionCreated = await this.renewSubscriptionService.execute(
        id,
        user,
      );

      return subscriptionCreated;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all subscriptions',
  })
  @ApiResponse({
    type: SubscriptionCreatedDoc,
    isArray: true,
  })
  async getAll(
    @Res() response: Response,
    @CurrentUser() user: Client,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('payerName') payerName: string,
  ) {
    const subscriptions = await this.getAllSubscriptionsService.execute({
      page,
      limit: limit || 5,
      payerName,
      user,
    });

    return response.status(200).send({ subscriptions });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get a subscription',
    description: 'Get one subscription with id',
  })
  @ApiResponse({
    type: SubscriptionCreatedDoc,
  })
  async findOne(@Param('id') id: string) {
    return await this.findSubscriptionService.execute(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Update a subscription',
    description: 'Update one subscription with id',
  })
  @ApiResponse({
    type: SubscriptionCreatedDoc,
  })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateSubscriptionDto,
    @CurrentUser() user: Client,
  ) {
    return await this.updateSubscriptionService.execute(data, id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Delete a subscription',
    description: 'Delete one subscription with id',
  })
  @ApiResponse({
    type: SubscriptionCreatedDoc,
  })
  async delete(@Param('id') id: string, @CurrentUser() user: Client) {
    return await this.cancelSubscriptionService.execute({ id, client: user });
  }
}
