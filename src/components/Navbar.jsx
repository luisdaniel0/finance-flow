import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex flex-col gap-y-5 m-5">
      <h2 className="">FINANCE FLOW</h2>
      <Link to="/">Dashboard</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/budgets">Budgets</Link>
      <Link to="/import">Import</Link>
    </nav>
  );
};

export default Navbar;
