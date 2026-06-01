import { FaFilter } from "react-icons/fa"

function Filter({tags}){
    return (
        <>
        <div className="flex items-center gap-3 flex-wrap z-1">

            <div className="flex items-center gap-2 text-purple-400">
              <FaFilter />
              <span className="text-sm">Filters</span>
            </div>

            {tags.map((tag, index) => (
              <button
                key={index}
                className="px-3 py-1.5 text-xs md:text-sm 
                           rounded-full border border-purple-500/20 
                           text-slate-300 
                           hover:text-purple-500 
                           hover:border-purple-400
                          cursor-pointer
                           transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </>
    )
}

export default Filter