import SearchBar from "../components/common-component/SearchBar.jsx";
import Filter from "../components/common-component/Filter.jsx";
import QuotesList from "../components/QuoteList.jsx";
import { getAllQuotes } from "../api/quote.api.js";
import Spinner from "../components/common-component/Spinner.jsx";
import { TAGS } from "../constants/tags.js";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { useRef } from "react";
import useSWRInfinite from "swr/infinite";

function Quotes() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tags = searchParams.get("tags") || "";
  const selectedTag = searchParams.get("tags") || "ALL";
  const search = searchParams.get("search") || "";

  const getKey = (pageIndex, previousPageData) => {
    if (
      previousPageData &&
      previousPageData.pagination.page >= previousPageData.pagination.totalPages
    ) {
      return null;
    }

    return ["quotes", pageIndex + 1, tags, search];
  };

  const { data, error, isLoading, setSize, isValidating } = useSWRInfinite(
    getKey,
    ([, page, tags, search]) => getAllQuotes({ page, tags, search }),
  );

  const quotes = data?.flatMap((page) => page?.quotes) || [];
  // console.log(quotes);

  const lastPage = data?.[data.length - 1];
  const hasMore =
    lastPage && lastPage?.pagination?.page < lastPage?.pagination?.totalPages;

  // InterSection observer

  const loaderRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isValidating) {
          setSize((prev) => prev + 1);
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore, isValidating, setSize]);

  if (error) {
    return (
      <div className="h-70 flex justify-center items-center">
        <p className="text-red-500 text-center">
          {error.response?.data?.message ||
            (error.message && "Server is unavailable. Please try again later.")}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[65vh]">
        <Spinner />
      </div>
    );
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
          <QuotesList quotes={quotes || []} />
        )}
      </div>
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-8">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Quotes;
