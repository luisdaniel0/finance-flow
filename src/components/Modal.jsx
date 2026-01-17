const Modal = ({ setIsModalOpen }) => {
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <div>
      <h1>Hello world!</h1>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default Modal;
