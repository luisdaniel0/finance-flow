import { Link } from "react-router-dom";
import { LayoutDashboard, CreditCard, PiggyBank, FileUp } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex flex-col gap-y-5 m-5">
      <h2 className="">FINANCE FLOW</h2>
      <div className="flex flex-nowrap gap-2">
        <LayoutDashboard />
        <Link to="/">Dashboard</Link>
      </div>
      <div className="flex flex-nowrap gap-2">
        <CreditCard />
        <Link to="/transactions">Transactions</Link>
      </div>
      <div className="flex flex-nowrap gap-2">
        <PiggyBank />
        <Link to="/budgets">Budgets</Link>
      </div>
      <div className="flex flex-nowrap gap-2">
        <FileUp />
        <Link to="/import">Import</Link>
      </div>
    </nav>
  );
};

export default Navbar;
