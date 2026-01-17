import { useState } from "react";
import Modal from "../components/Modal";

const Budgets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(true);
  }
  return (
    <div className="w-full m-8 p-8">
      <h1 className="">My Budgets</h1>
      <div className="mt-8">
        <h2>Create New Budget</h2>
        <button className="cursor-pointer" onClick={toggleModal}>
          Open
        </button>
        {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
      </div>
    </div>
  );
};

export default Budgets;
