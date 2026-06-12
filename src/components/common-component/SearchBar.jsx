import { FaSearch } from "react-icons/fa";

function SearchBar({ search, setSearchParams }) {
  const handleSearchParams = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      return params;
    });
  };
  return (
    <>
      <div className="flex items-center gap-2  px-4 py-2 rounded-xl border border-purple-500/20 w-full md:w-auto">
        <FaSearch className="text-purple-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchParams(e)}
          placeholder="Search quotes..."
          className="bg-transparent outline-none  w-full md:w-64"
        />
      </div>
    </>
  );
}

export default SearchBar;
