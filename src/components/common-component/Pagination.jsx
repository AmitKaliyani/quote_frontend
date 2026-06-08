function Pagination({ currentPage, totalPages, setPage, setLimit, limit }) {
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t">
      {/* Info */}
      <p className="text-sm text-gray-600">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
          className="px-3 py-1 text-sm rounded-md border hover:bg-gray-100 disabled:opacity-40"
        >
          Prev
        </button>

        {/* Pages */}
        <div className="flex gap-1">
          {getPages().map((page) => (
            <button
              key={page}
              onClick={() => setPage(page)}
              className={`px-3 py-1 text-sm rounded-md border ${
                page === currentPage
                  ? "bg-blue-500 text-white border-blue-500"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
          className="px-3 py-1 text-sm rounded-md border hover:bg-gray-100 disabled:opacity-40"
        >
          Next
        </button>

        {/* LIMIT */}
        {/* LIMIT */}
        <div className="flex items-center gap-3 ml-4 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 shadow-sm">
          <span className="text-sm font-medium text-gray-600">Rows</span>

          <div className="relative">
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="appearance-none cursor-pointer bg-white border border-gray-300 text-sm rounded-md px-3 py-1.5 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="10">10 / page</option>
              <option value="25">25 / page</option>
              <option value="50">50 / page</option>
              <option value="100">100 / page</option>
            </select>

            {/* dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
              ▼
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
