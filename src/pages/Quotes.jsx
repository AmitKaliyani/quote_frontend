import SearchBar from "../components/common-component/SearchBar";
import Filter from "../components/common-component/Filter";
import QuotesList from "../components/QuoteList";

const tags = [
  "ALL",
  "MOTIVATION",
  "LOVE",
  "LIFE",
  "WEALTH",
  "HEALTH",
  "WISDOM",
];

function Quotes() {
  return (
    <div className="py-10 px-4 md:px-10  ">
      <div className="max-w-7xl mx-auto ">
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-4
                        bg-white/5 backdrop-blur-md 
                        border border-purple-500/20 
                        rounded-2xl px-4 py-4   sticky top-16 z-1"
        >
          {/* LEFT: FILTERS */}
          <Filter tags={tags} />

          {/* RIGHT: SEARCH */}
          <SearchBar />
        </div>
        {/* Quote Card Show */}
        <div>
          <QuotesList />
        </div>
      </div>
    </div>
  );
}

export default Quotes;
