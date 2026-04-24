import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, CreditCard, PiggyBank, FileUp, LogOut } from "lucide-react";
import { clearToken } from "../services/api";

interface NavbarProps {
  onLogout: () => void;
}

const NAV_LINKS = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/transactions", icon: CreditCard, label: "Transactions", end: false },
  { to: "/budgets", icon: PiggyBank, label: "Budgets", end: false },
  { to: "/import", icon: FileUp, label: "Import", end: false },
];

const Navbar = ({ onLogout }: NavbarProps) => {
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    onLogout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen border-r border-gray-700 hidden md:flex flex-col justify-between w-52 shrink-0 bg-gray-900">
      <nav className="flex flex-col gap-1 p-4 pt-6">
        <p className="text-[#646cff] font-bold text-xs tracking-widest uppercase mb-6 px-3">
          Finance Flow
        </p>
        {NAV_LINKS.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#646cff]/15 text-[#646cff]"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex gap-2 items-center m-4 mb-6 px-3 py-2 rounded-lg cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 text-sm transition-colors"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
