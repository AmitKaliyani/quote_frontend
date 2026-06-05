import SearchBar from "../components/common-component/SearchBar";
import Filter from "../components/common-component/Filter";
import QuotesList from "../components/QuoteList";
import { useState } from "react";
import { getAllQuotes } from "../api/quote.api";
import Spinner from "../components/common-component/Spinner";
import { useEffect } from "react";
import { TAGS } from "../constants/tags.js";
import { useSearchParams } from "react-router";

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoding] = useState(false);
  const [error, setIsError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); 


  const tags = searchParams.get("tags") || "";
  const selectedTag = searchParams.get("tags") || "ALL";
  const search = searchParams.get("search") || ""

  const filters = {
    ...(tags && { tags }),
    ...(search && {search})
  };

  const fetchAllQuotes = async (filters) => {
    try {
      setIsLoding(true);
      const response = await getAllQuotes(filters);
      setQuotes(response.data);
      setIsLoding(false);
    } catch (error) {
      console.log(error);
      setIsError(error.message);
    }
  };

  useEffect(() => {
    fetchAllQuotes(filters);
  }, [tags,search]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }
  return (
    <div className="py-10 px-4 md:px-10  ">
      <div className="max-w-7xl min-h-screen mx-auto ">
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-4
      bg-white/5 backdrop-blur-md 
      border border-purple-500/20 
      rounded-2xl px-4 py-4   sticky top-16 z-1"
        >
          <Filter
            tags={TAGS}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            selectedTag={selectedTag}
          />

          <SearchBar 
           searchParams={searchParams}
            setSearchParams={setSearchParams}
            search={search}
          
          />
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-[65vh]">
            <Spinner />
          </div>
        ) : (
          <QuotesList quotes={quotes.quotes || []} />
        )}
      </div>
    </div>
  );
}

export default Quotes;
