import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, CreditCard, PiggyBank, FileUp, LogOut } from "lucide-react";
import { clearToken } from "../services/api";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    onLogout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen border-r-1 border-solid border-[#646cff] hidden md:flex flex-col justify-between">
      <nav className="flex flex-col gap-y-10 m-5">
        <h2>FINANCE FLOW</h2>
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
      <button
        onClick={handleLogout}
        className="flex gap-2 items-center m-5 mb-8 cursor-pointer text-gray-400 hover:text-white"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
