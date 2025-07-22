function ConfirmPopup({
  isOpen,
  title,
  message,
  confirmText,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="backdrop-blur-[2px] bg-opacity-40 fixed inset-0 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[300px] text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">{title}</h2>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 text-white px-4 py-1 rounded cursor-pointer"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            className="bg-gray-300 px-4 py-1 rounded cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopup;
