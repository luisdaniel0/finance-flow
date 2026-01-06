import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Transactions = () => {
  const [transactionList, setTransactionList] = useState([]);
  return (
    <div className="w-full p-8 m-8">
      <h1>Transactions</h1>
      <TransactionForm
        transactionList={transactionList}
        setTransactionList={setTransactionList}
      />
      <TransactionList transactionList={transactionList} />
    </div>
  );
};

export default Transactions;
