import { FaTimes } from "react-icons/fa";

function DeleteModal({ isOpen, onClose, handleDeleteQuote }) {
  if (!isOpen) return null;
  return (
    <>
      {isOpen && (
        <div
          onClick={() => onClose(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-sm"
          >
            <p className="absolute top-1 right-2">
              <FaTimes
                className="bg-white text-red-500 hover:text-red-700 cursor-pointer "
                onClick={() => onClose(false)}
              />
            </p>
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Quote
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this quote? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => onClose(false)}
                className=" cursor-pointer px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDeleteQuote()}
                className=" cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
              >
                Delete Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteModal;
