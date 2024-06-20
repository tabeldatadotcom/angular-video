export class Transaction{
    id!: number;
    fromAccountName!: number;
    toAccountName!: number;
    amount!: number;
    transactionType!: string;
    timestamp!: string;
    status!: string;
}

export class SaveTransaction{
    fromAccountName!: number;
    toAccountName!: number;
    amount!: number;
    transactionType!: string;
    timestamp!: string;
    status!: string;
}