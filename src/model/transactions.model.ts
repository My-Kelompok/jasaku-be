export class TransactionResponse {
  id: string;
  title: string;
  amount: string;
  transaction_date: string;
}

export class CreateTransactionRequest {
  title: string;
  amount: string;
  transaction_date: string;
}

export class UpdateTransactionRequest {
  id: string;
  title: string;
  amount: string;
  transaction_date: string;
}

export class SearchTransactionRequest {
  title?: string;
  amount?: string;
  page: number;
  size: number;
}
