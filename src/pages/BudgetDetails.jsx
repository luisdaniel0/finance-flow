import { useParams } from "react-router-dom";

const BudgetDetail = ({ transactionList, budgets, setBudgets }) => {
  const { id } = useParams();
  return <div>Hello</div>;
};

export default BudgetDetail;
