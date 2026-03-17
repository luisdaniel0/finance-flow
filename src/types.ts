export interface Transaction {
  id: number;
  type: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Budget {
  id: number;
  name: string;
  amount: number;
  category: string;
}

export interface TransactionData {
  type: string;
  amount: string;
  description: string;
  category: string;
  date: string;
}

export interface FormErrors {
  amount?: string;
  description?: string;
}
