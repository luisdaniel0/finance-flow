import { useRef, useState } from "react";
import { Plus } from "lucide-react";

interface BudgetFormProps {
  addBudget: (name: string, amount: number, category: string) => Promise<void>;
  budgetCategories: string[];
}

const BudgetForm = ({ addBudget, budgetCategories }: BudgetFormProps) => {
  const [formData, setFormData] = useState({
    budgetName: "",
    budgetAmount: "",
    category: "Groceries",
  });
  const dialogRef = useRef<HTMLDialogElement>(null);

  function onClose() {
    dialogRef.current?.close();
  }

  function onOpen() {
    dialogRef.current?.showModal();
  }

  async function createBudget(e: { preventDefault: () => void }) {
    e.preventDefault();
    await addBudget(
      formData.budgetName,
      parseFloat(formData.budgetAmount),
      formData.category,
    );
    setFormData({ budgetName: "", budgetAmount: "", category: "Groceries" });
    dialogRef.current?.close();
  }

  return (
    <>
      <dialog
        ref={dialogRef}
        className="bg-gray-900 border border-gray-700 rounded-xl p-0 m-auto backdrop:bg-black/60 w-96"
      >
        <form className="flex flex-col gap-5 p-6" onSubmit={createBudget}>
          <h2 className="text-xl font-bold text-white">Create New Budget</h2>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Budget Name</span>
            <input
              name="budgetName"
              type="text"
              placeholder="e.g. Home Decor"
              className="bg-gray-800 text-white p-2.5 rounded-lg border border-gray-700 focus:border-[#646cff] outline-none text-sm"
              onChange={(e) => setFormData({ ...formData, budgetName: e.target.value })}
              value={formData.budgetName}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Budget Amount</span>
            <input
              name="budgetAmount"
              type="number"
              placeholder="0.00"
              className="bg-gray-800 text-white p-2.5 rounded-lg border border-gray-700 focus:border-[#646cff] outline-none text-sm"
              onChange={(e) => setFormData({ ...formData, budgetAmount: e.target.value })}
              value={formData.budgetAmount}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Category</span>
            <select
              name="category"
              className="bg-gray-800 text-white p-2.5 rounded-lg border border-gray-700 focus:border-[#646cff] outline-none text-sm"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {budgetCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#646cff] hover:bg-[#535bf2] text-white rounded-lg text-sm font-semibold cursor-pointer transition-colors"
            >
              Create Budget
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold cursor-pointer transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>

      <button
        onClick={onOpen}
        className="rounded-xl border-2 border-dashed border-gray-600 w-full h-45 flex flex-col items-center justify-center cursor-pointer hover:border-[#646cff] hover:bg-gray-800/50 transition-colors gap-2"
      >
        <div className="p-2 bg-gray-700 rounded-lg">
          <Plus size={20} className="text-gray-300" />
        </div>
        <p className="text-sm font-semibold text-gray-300">Create Budget</p>
      </button>
    </>
  );
};

export default BudgetForm;
