import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Auth } from 'src/common/auth.decorator';
import { User } from 'generated/prisma/client';
import {
  CreateTransactionRequest,
  SearchTransactionRequest,
  TransactionResponse,
  UpdateTransactionRequest,
} from 'src/model/transactions.model';
import { ApiResponse } from 'src/model/api.model';

@Controller('/api/transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Body() request: CreateTransactionRequest,
  ): Promise<ApiResponse<TransactionResponse>> {
    const result = await this.transactionsService.create(user, request);
    return {
      success: true,
      message: 'Transaction berhasil dibuat!',
      data: result,
    };
  }

  @Put('/:transactionId')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('transactionId') transactionId: string,
    @Body() request: UpdateTransactionRequest,
  ): Promise<ApiResponse<TransactionResponse>> {
    request.id = transactionId;
    const result = await this.transactionsService.update(user, request);
    return {
      success: true,
      message: 'Transaction berhasil diupdate!',
      data: result,
    };
  }

  @Delete('/:transactionId')
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param('transactionId') transactionId: string,
  ): Promise<ApiResponse<boolean>> {
    await this.transactionsService.remove(user, transactionId);
    return {
      success: true,
      message: `Transaction ${transactionId} berhasil dihapus!`,
      data: true,
    };
  }

  @Get()
  @HttpCode(200)
  async search(
    @Auth() user: User,
    @Query('title') title: string,
    @Query('amount') amount?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<ApiResponse<TransactionResponse[]>> {
    const request: SearchTransactionRequest = {
      title: title,
      amount: amount,
      page: page || 1,
      size: size || 10,
    };
    return this.transactionsService.search(user, request);
  }
}
