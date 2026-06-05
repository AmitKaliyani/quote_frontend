import { FaFilter } from "react-icons/fa";

function Filter({ tags, setSearchParams, selectedTag }) {
  const handleSearchParams = (tag) => {
    if (tag === "ALL") {
      setSearchParams({});

      return;
    }

    setSearchParams({ tags: tag });
  };
  return (
    <>
      <div className="flex items-center gap-3 flex-wrap z-1">
        <div className="flex items-center gap-2 text-purple-400">
          <FaFilter />
          <span className="text-sm">Filters</span>
        </div>

        {tags.map((tag, index) => (
          <button
            onClick={() => handleSearchParams(tag)}
            key={index}
            className={` ${selectedTag === tag ? "bg-purple-500 text-white hover:text-white" : ""} px-3 py-1.5 text-xs md:text-sm  capitalize
                           rounded-full border border-purple-500/20 
                           text-slate-300 
                           hover:text-purple-500 
                           hover:border-purple-400
                          cursor-pointer
                           transition`}
          >
            {tag}
          </button>
        ))}
      </div>
    </>
  );
}

export default Filter;
