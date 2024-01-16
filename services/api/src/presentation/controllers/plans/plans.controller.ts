import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
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

import { ApiKeyAuthGuard } from '@app/auth/guards/api-key-auth.guard';
import { UpdatePlanDto } from '@domain/dtos/plan/update-plan.dto';
import { PlanDoc } from '@common/docs/plan/plan.doc';
import { CreatePlanDto } from '@domain/dtos/plan/create-plan.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Client } from '@domain/entities/client/client.schema';
import { CreatePlanDoc } from '@common/docs/plan/create-plan.doc';
import { CreatePlanService } from '@app/plans/usecases/create-plan/create-plan.service';
import { GetAllPlansService } from '@app/plans/usecases/get-all-plans/get-all-plans.service';
import { FindPlanService } from '@app/plans/usecases/find-plan/find-plan.service';
import { UpdatePlanService } from '@app/plans/usecases/update-plan/update-plan.service';

import { Response } from 'express';

@ApiTags('plans')
@ApiBearerAuth()
@UseGuards(ApiKeyAuthGuard)
@Controller('plans')
export class PlansController {
  constructor(
    private readonly createPlansService: CreatePlanService,
    private readonly getAllPlansService: GetAllPlansService,
    private readonly findPlanService: FindPlanService,
    private readonly updatePlanService: UpdatePlanService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreatePlanDoc,
  })
  @ApiCreatedResponse({
    description: 'Successfully created plan and integrated to gateway',
    type: PlanDoc,
  })
  async createPlan(@Body() plan: CreatePlanDto, @CurrentUser() user: Client) {
    console.log('user', user);
    return await this.createPlansService.execute(plan, user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all plans',
  })
  @ApiResponse({
    type: PlanDoc,
    isArray: true,
  })
  async findAll(
    @Res() response: Response,
    @CurrentUser() user: Client,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const plans = await this.getAllPlansService.execute({
      user,
      page,
      limit: limit || 5,
    });

    return response.status(200).send({ plans });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get a plan',
    description: 'Get one plan with id',
  })
  @ApiResponse({
    type: PlanDoc,
  })
  async findOne(@Param('id') id: string) {
    return await this.findPlanService.execute(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Update a plan',
    description: 'Update one plan with id',
  })
  @ApiResponse({
    type: PlanDoc,
  })
  async update(
    @Param('id') id: string,
    @Body() data: UpdatePlanDto,
    @CurrentUser() user: Client,
  ) {
    return await this.updatePlanService.execute(data, id, user);
  }
}
