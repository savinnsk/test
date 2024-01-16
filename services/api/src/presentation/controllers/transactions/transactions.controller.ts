import { Response } from 'express';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
import { TransactionDocument } from '@domain/entities/transaction/transaction.schema';
import { FindAllTransactionsService } from '@app/transactions/usecases/find-all-transactions/find-all-transactions.service';
import { FindTransactionByIdService } from '@app/transactions/usecases/find-transaction-by-id/find-transaction-by-id.service';
import { TransactionsInfosDoc } from '@common/docs';
import { FindTransactionsByClientService } from '@app/transactions/usecases/find-transactions-by-client/find-transactions-by-client-.service';

@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly findAllTransactionsService: FindAllTransactionsService,
    private readonly findTransactionByIdService: FindTransactionByIdService,
    private readonly findTransactionsByClientService: FindTransactionsByClientService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all transactions',
    description: 'Get all transactions with all infos',
  })
  @ApiResponse({
    type: TransactionsInfosDoc,
  })
  async findAll(
    @Res() response: Response,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const transactions = await this.findAllTransactionsService.execute({
      page,
      limit: limit || 5,
    });

    return response.status(200).send({ transactions });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get one transaction by id',
    description: 'Get one transaction by id with all infos',
  })
  @ApiResponse({
    type: TransactionsInfosDoc,
  })
  findOne(@Param('id') id: string): Promise<TransactionDocument> {
    return this.findTransactionByIdService.execute(id);
  }

  @Get('/client/:client')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get transactions by client',
    description: 'Get all transactions associated with a specific client',
  })
  @ApiResponse({
    type: TransactionsInfosDoc,
    isArray: true,
  })
  findByClient(
    @Param('client') client: string,
  ): Promise<TransactionDocument[]> {
    return this.findTransactionsByClientService.execute(client);
  }
}
