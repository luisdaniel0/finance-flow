import { useRef, useState } from "react";

const BudgetForm = ({ addBudget, budgetCategories }) => {
  const [formData, setFormData] = useState({
    budgetName: "",
    budgetAmount: "",
    category: "Groceries",
  });
  const dialogRef = useRef(null);

  function onClose() {
    dialogRef.current.close();
  }

  function onOpen() {
    dialogRef.current.showModal();
  }
  function createBudget(e) {
    e.preventDefault();
    const newBudget = {
      id: Date.now(),
      name: formData.budgetName,
      amount: parseFloat(formData.budgetAmount),
      category: formData.category,
    };

    addBudget(newBudget);

    setFormData({
      budgetName: "",
      budgetAmount: "",
      category: "Groceries",
    });

    dialogRef.current.close();
  }
  return (
    <>
      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-auto p-6 rounded-lg backdrop:bg-black/50 relative"
      >
        <button
          autoFocus
          onClick={() => onClose()}
          className="absolute right-9 top-8 text-lg font-bold cursor-pointer"
        >
          X
        </button>
        <form
          className="flex flex-col border h-120 w-200 justify-between p-6 gap-5"
          onSubmit={createBudget}
        >
          <h2 className="text-2xl font-bold">Create New Budget</h2>
          <label className="flex flex-col">
            Budget Name
            <input
              name="budgetName"
              type="text"
              placeholder="e.g. Home Decor"
              className="bg-gray-600 text-white p-2 rounded mt-1 w-80"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  budgetName: e.target.value,
                })
              }
              value={formData.budgetName}
            />
          </label>
          <label className="flex flex-col">
            Budget Amount
            <input
              name="budgetAmount"
              type="text"
              placeholder="e.g. $5000"
              className="bg-gray-600 text-white p-2 rounded mt-1 w-80"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  budgetAmount: e.target.value,
                })
              }
              value={formData.budgetAmount}
            />
          </label>
          <label className="flex flex-col">
            Category
            <select
              name="category"
              className="bg-gray-600 text-white p-2 rounded mt-1 w-80"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
            >
              {budgetCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="border p-2 cursor-pointer">
            Create Budget
          </button>
        </form>
      </dialog>
      <button
        onClick={() => onOpen()}
        className=" rounded-lg border w-90 h-45
      justify-center  flex flex-col cursor-pointer font-bold text-lg bg-gray-800 "
      >
        <p>+</p>
        <p className="">Create Budget</p>
      </button>
    </>
  );
};

export default BudgetForm;
