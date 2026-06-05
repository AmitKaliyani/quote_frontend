function QuoteTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-md ">
  <table className="w-full  text-sm text-left">
    <thead className="bg-gray-100 text-gray-700 uppercase">
      <tr>
        <th className="px-6 py-4">Quote</th>
        <th className="px-6 py-4">Category</th>
        <th className="px-6 py-4">Status</th>
        <th className="px-6 py-4">Likes</th>
        <th className="px-6 py-4">Created</th>
        <th className="px-6 py-4 text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="px-6 py-4 max-w-sm">
          Success comes to those who never give up.
        </td>

        <td className="px-6 py-4">
          Motivation
        </td>

        <td className="px-6 py-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
            Approved
          </span>
        </td>

        <td className="px-6 py-4">
          ❤️ 120
        </td>

        <td className="px-6 py-4">
          05 Jun 2026
        </td>

        <td className="px-6 py-4">
          <div className="flex justify-center gap-2">
            <button className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
              Edit
            </button>

            <button className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600">
              Delete
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  );
}

export default QuoteTable;
