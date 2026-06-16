import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col bg-white shadow-lg w-65 h-75 justify-center items-center rounded-lg">
        <p className="text-xl font-semibold">Page Not Found</p>
        <p className="text-red-500">Error 404</p>

        <button
          onClick={() => navigate(-1)}
          className="bg-purple-500 text-white px-3 py-1 rounded-md mt-6 cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
