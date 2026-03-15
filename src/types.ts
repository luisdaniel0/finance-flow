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
