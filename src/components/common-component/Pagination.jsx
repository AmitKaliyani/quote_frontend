function Pagination({ currentPage, totalPages, setPage, setLimit, limit }) {
  const getPages = () => {
    const pages = [];

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="border-t px-4 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Info */}
        <p className="text-sm text-gray-600 text-center lg:text-left">
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages || 1}</span>
        </p>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Pagination Buttons */}
          <div className="flex items-center gap-1 flex-wrap justify-center">
            <button
              disabled={currentPage <= 1}
              onClick={() => setPage(currentPage - 1)}
              className="px-3 py-2 text-sm rounded-md border hover:bg-gray-100 disabled:opacity-40"
            >
              Prev
            </button>

            {getPages().map((page) => (
              <button
                key={page}
                onClick={() => setPage(page)}
                className={`min-w-10 px-3 py-2 text-sm rounded-md border transition ${
                  page === currentPage
                    ? "bg-blue-500 text-white border-blue-500"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setPage(currentPage + 1)}
              className="px-3 py-2 text-sm rounded-md border hover:bg-gray-100 disabled:opacity-40"
            >
              Next
            </button>
          </div>

          {/* Rows Per Page */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
              Rows
            </span>

            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="cursor-pointer border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="10">10 / page</option>
              <option value="25">25 / page</option>
              <option value="50">50 / page</option>
              <option value="100">100 / page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
