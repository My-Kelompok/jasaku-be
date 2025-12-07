<p align="center">
  <img src="https://i.pinimg.com/originals/ca/b2/24/cab2247fbad923888cde610b4b2dea26.gif" alt="megumine-image">
</p>

# Auth API Specification

## Register User

POST `/api/auth/register`

Request Body :

```json
{
  "name": "Mas Amba",
  "email": "masamba@gmail.com",
  "password": "ambapasseword", // min 6 characters
  "service_type": "BARBER" // enum("BARBER","FREELANCER", "OTHER")
}
```

Response Body (Success) :

```json
{
  "success": true,
  "message": "User berhasil register!",
  "data": {
    "email": "masamba@gmail.com",
    "name": "Mas Amba"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Email already registered"
}
```

## Login User

POST `/api/auth/login`

Request Body :

```json
{
  "email": "masamba@gmail.com",
  "password": "ambapasseword" // min 6 characters
}
```

Response Body (Success) :

```json
{
  "success": true,
  "message": "User berhasil login!",
  "data": {
    "email": "masamba@gmail.com",
    "name": "Mas Amba",
    "token": "********************" // secret token
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Email or password is invalid"
}
```

# Transactions API Specification

## Create Transaction

POST `/api/transactions`

Headers :

- Authorization: token

Request Body :

```json
{
  "title": "Service Ac",
  "amount": "100000",
  "transaction_date": "2025-12-07T15:30:00.000Z"
}
```

Response Body :

```json
{
  "success": true,
  "message": "Transaction berhasil dibuat!",
  "data": {
    "id": "8672d6c3-dce6-4ea5-ba68-af223aa17f2e",
    "title": "Service Ac",
    "amount": "100000",
    "transaction_date": "2025-12-07T15:30:00.000Z"
  }
}
```

## Update Transaction

PUT `/api/transactions/:transactionId`

Headers :

- Authorization: token

Request Body :

```json
{
  "title": "Service Kulkas",
  "amount": "25000",
  "transaction_date": "2025-12-07T15:30:00.000Z"
}
```

Response Body :

```json
{
  "success": true,
  "message": "Transaction berhasil diupdate!",
  "data": {
    "id": "f80031cd-21a1-4519-a25f-3a2e791d0002",
    "title": "Service Kulkas",
    "amount": "25000",
    "transaction_date": "2025-12-07T15:30:00.000Z"
  }
}
```

## Remove Transaction

DELETE `/api/transactions/:transactionId`

Headers :

- Authorization: token

Response Body :

```json
{
  "success": true,
  "message": "Transaction f80031cd-21a1-4519-a25f-3a2e791d0002 berhasil dihapus!"
}
```

## Search Transactions

GET `/api/transactions`

Headers :

- Authorization: token

Query Params :

- title: string
- amount: string
- page: number, default 1
- size: number, default 10

Response Body :

```json
{
  "success": true,
  "message": "Transaction berhasil difetch!",
  "data": [
    {
      "id": "00062e98-69b3-49b8-9078-b1ac79186c40",
      "title": "Service Ac",
      "amount": "100000",
      "transaction_date": "2025-12-07T15:30:00.000Z"
    },
    {
      "id": "6e0d6cd9-2221-4bdd-9cd1-49419edb9901",
      "title": "Service Ac",
      "amount": "100000",
      "transaction_date": "2025-12-07T15:30:00.000Z"
    },
    {
      "id": "8672d6c3-dce6-4ea5-ba68-af223aa17f2e",
      "title": "Service Ac",
      "amount": "100000",
      "transaction_date": "2025-12-07T15:30:00.000Z"
    }
  ],
  "paging": {
    "current_page": 1,
    "size": 10,
    "total_page": 0
  }
}
```

# Expenses API Specification

## Create Expense

POST `/api/expenses`

Headers :

- Authorization: token

Request Body :

```json
{
  "title": "Makan Nashy Kucink",
  "amount": "2500",
  "transaction_date": "2025-12-07T15:30:00.000Z"
}
```

Response Body :

```json
{
  "success": true,
  "message": "Expense berhasil dibuat!",
  "data": {
    "id": "8672d6c3-dce6-4ea5-ba68-af223aa17f2e",
    "title": "Makan Nashy Kucink",
    "amount": "2500",
    "transaction_date": "2025-12-07T15:30:00.000Z"
  }
}
```

## Update Expense

PUT `/api/expenses/:expenseId`

Headers :

- Authorization: token

Request Body :

```json
{
  "title": "Makan Nashy Padank",
  "amount": "50000",
  "transaction_date": "2025-12-07T15:30:00.000Z"
}
```

Response Body :

```json
{
  "success": true,
  "message": "Transaction berhasil diupdate!",
  "data": {
    "id": "f80031cd-21a1-4519-a25f-3a2e791d0002",
    "title": "Makan Nashy Padank",
    "amount": "50000",
    "transaction_date": "2025-12-07T15:30:00.000Z"
  }
}
```

## Remove Expenses

DELETE `/api/expenses/:expenseId`

Headers :

- Authorization: token

Response Body :

```json
{
  "success": true,
  "message": "Expense f80031cd-21a1-4519-a25f-3a2e791d0002 berhasil dihapus!"
}
```

## Search Expenses

GET `/api/expenses`

Headers :

- Authorization: token

Query Params :

- title: string
- amount: string
- page: number, default 1
- size: number, default 10

Response Body :

```json
{
  "success": true,
  "message": "Expense berhasil difetch!",
  "data": [
    {
      "id": "f80031cd-21a1-4519-a25f-3a2e791d0002",
      "title": "Makan Nashy Padank",
      "amount": "50000",
      "transaction_date": "2025-12-07T15:30:00.000Z"
    },
    {
      "id": "f80031cd-21a1-4519-a25f-3a2e79120002",
      "title": "Makan Nashy Padank",
      "amount": "50000",
      "transaction_date": "2025-12-07T15:30:00.000Z"
    },
    {
      "id": "f80031cd-21a1-4519-a25f-3a2e791e0002",
      "title": "Makan Nashy Padank",
      "amount": "50000",
      "transaction_date": "2025-12-07T15:30:00.000Z"
    }
  ],
  "paging": {
    "current_page": 1,
    "size": 10,
    "total_page": 0
  }
}
```
