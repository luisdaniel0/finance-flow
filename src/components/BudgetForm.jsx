import { useRef } from "react";
import BudgetList from "./BudgetList";

const BudgetForm = () => {
  const dialogRef = useRef(null);

  function onClose() {
    dialogRef.current.close();
  }

  function onOpen() {
    dialogRef.current.showModal();
  }
  function createBudget(e) {
    e.preventDefault();
    console.log("budget button works!");
    dialogRef.current.close();
  }
  return (
    <>
      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-auto p-6 rounded-lg backdrop:bg-black/50"
      >
        <form
          className="flex flex-col border h-90 w-200 justify-between p-6"
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
            />
          </label>
          <label className="flex flex-col">
            Budget Amount
            <input
              name="budgetAmount"
              type="text"
              placeholder="e.g. $5000"
              className="bg-gray-600 text-white p-2 rounded mt-1 w-80"
            />
          </label>
          <button type="submit" className="border p-2">
            Create Budget
          </button>
        </form>
        <button
          autoFocus
          onClick={() => onClose()}
          className="position:relative"
        >
          X
        </button>
      </dialog>
      <button
        onClick={() => onOpen()}
        className="text-center rounded-lg border h-25
      justify-center flex w-70 items-center flex flex-col cursor-pointer"
      >
        <p>+</p>
        <p>Create Budget</p>
      </button>
    </>
  );
};

export default BudgetForm;
