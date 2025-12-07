import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, Transaction, User } from 'generated/prisma/client';
import { ValidationService } from 'src/common/validation.service';
import {
  CreateTransactionRequest,
  SearchTransactionRequest,
  TransactionResponse,
  UpdateTransactionRequest,
} from 'src/model/transactions.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionsValidation } from './transactions.validation';
import { ApiResponse } from 'src/model/api.model';

@Injectable()
export class TransactionsService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  toTransactionResponse(transaction: Transaction): TransactionResponse {
    return {
      id: transaction.id,
      title: transaction.title,
      amount: transaction.amount.toString(),
      transaction_date: transaction.transactionDate.toISOString(),
    };
  }

  async checkTransactionMustExists(
    userId: string,
    transactionId: string,
  ): Promise<Transaction> {
    const transaction = await this.prismaService.transaction.findFirst({
      where: {
        userId: userId,
        id: transactionId,
      },
    });

    if (!transaction) {
      throw new HttpException('Transaction is not found', 404);
    }

    return transaction;
  }

  async create(
    user: User,
    request: CreateTransactionRequest,
  ): Promise<TransactionResponse> {
    const createRequest = this.validationService.validate(
      TransactionsValidation.CREATE,
      request,
    ) as CreateTransactionRequest;

    const transaction = await this.prismaService.transaction.create({
      data: {
        title: createRequest.title,
        amount: new Prisma.Decimal(createRequest.amount),
        transactionDate: new Date(createRequest.transaction_date),
        userId: user.id,
      },
    });

    return this.toTransactionResponse(transaction);
  }

  async update(
    user: User,
    updateRequest: UpdateTransactionRequest,
  ): Promise<TransactionResponse> {
    updateRequest = this.validationService.validate(
      TransactionsValidation.UPDATE,
      updateRequest,
    ) as UpdateTransactionRequest;

    let transaction = await this.checkTransactionMustExists(
      user.id,
      updateRequest.id,
    );

    transaction = await this.prismaService.transaction.update({
      where: {
        id: updateRequest.id,
        userId: user.id,
      },
      data: {
        title: updateRequest.title,
        amount: new Prisma.Decimal(updateRequest.amount),
        transactionDate: new Date(updateRequest.transaction_date),
      },
    });

    return this.toTransactionResponse(transaction);
  }

  async remove(
    user: User,
    transactionId: string,
  ): Promise<TransactionResponse> {
    await this.checkTransactionMustExists(user.id, transactionId);

    const transaction = await this.prismaService.transaction.delete({
      where: {
        id: transactionId,
        userId: user.id,
      },
    });

    return this.toTransactionResponse(transaction);
  }

  async search(
    user: User,
    request: SearchTransactionRequest,
  ): Promise<ApiResponse<TransactionResponse[]>> {
    const searchRequest = this.validationService.validate(
      TransactionsValidation.SEARCH,
      request,
    ) as SearchTransactionRequest;

    const filters: Prisma.TransactionWhereInput[] = [];

    if (searchRequest.title) {
      filters.push({
        title: {
          contains: searchRequest.title,
        },
      });
    }

    const skip = (searchRequest.page - 1) * searchRequest.size;

    const transactions = await this.prismaService.transaction.findMany({
      where: {
        userId: user.id,
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await this.prismaService.transaction.count({
      where: {
        id: user.id,
        AND: filters,
      },
    });

    return {
      success: true,
      message: 'Transaction berhasil difetch!',
      data: transactions.map((transaction) =>
        this.toTransactionResponse(transaction),
      ),
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }
}
