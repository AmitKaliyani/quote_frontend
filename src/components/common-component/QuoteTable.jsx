import { FaInfo, FaTrash } from "react-icons/fa";
import Pagination from "./Pagination";

function QuoteTable({
  data,
  setPage,
  onLimitChange,
  onDeleteClick,
  onEditClick,
}) {
  return (
    <div className="flex flex-col h-[calc(100vh)] border border-gray-200 bg-white rounded-xl shadow-md">
      <div className="overflow-auto flex-1">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4">Quote</th>
              <th className="px-6 py-4">Tags</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Likes</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data?.data?.map((quote) => (
              <tr
                key={quote._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Quote */}
                <td className="px-6 py-4 max-w-md">
                  <p className="text-gray-800 text-sm line-clamp-2">
                    {quote.text}
                  </p>
                </td>

                {/* Tags */}
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {quote.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                      quote.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : quote.status === "pending-review"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {quote.status}
                  </span>
                </td>

                {/* Author */}
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-800">
                    {quote.author || "Unknown"}
                  </p>
                </td>

                {/* Likes */}
                <td className="px-6 py-4 text-gray-700">{quote.likeCount}</td>

                {/* Date */}
                <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                  {new Date(quote.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-center">
                  {quote.status === "pending-review" ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditClick(quote);
                        }}
                        className=" cursor-pointer px-3 py-1.5 text-xs rounded-lg text-yellow-500 hover:text-yellow-600 transition"
                      >
                        <FaInfo />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteClick(quote);
                        }}
                        className=" cursor-pointer px-3 py-1.5 text-xs rounded-lg  text-red-500 hover:text-red-600 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION FIXED BOTTOM */}
      <div className="border-t bg-white">
        <Pagination
          setPage={setPage}
          totalPages={data?.meta?.totalPages}
          currentPage={data?.meta?.page}
          setLimit={onLimitChange}
          limit={data?.meta?.limit}
        />
      </div>
    </div>
  );
}

export default QuoteTable;
