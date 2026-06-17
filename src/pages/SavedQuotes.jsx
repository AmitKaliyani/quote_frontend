import QuotesList from "../components/QuoteList";
import { getMySavedQuote } from "../api/quote.api";
import Spinner from "../components/common-component/Spinner";
// import { useSearchParams } from "react-router";

import useSWR from "swr";

function SavedQuotes() {
  //   const [params, setParams] = useSearchParams();
  //   const page = Number(params.get("page")) || 1;
  //   const limit = Number(params.get("limit")) || 10;

  const {
    data: quotes,
    error,
    isLoading,
    mutate,
  } = useSWR("saved-quotes", getMySavedQuote);

  // console.log(error);

  // console.log(quotes, error, isLoading);

  const onUnsave = (id) => {
    mutate(
      (currentData) => ({
        ...currentData,
        data: currentData?.data?.filter((q) => q._id !== id),
      }),
      false,
    );
  };

  if (error) {
    return (
      <p className="text-red-500 text-center">
        {error?.response?.data?.message ||
          (error.message && "Server is unavailable. Please try again later.")}
      </p>
    );
  }
  return (
    <div className="py-10 px-4 md:px-10  ">
      <p className="font-bold text-gray-700">Saved Quotes</p>
      <div className="max-w-7xl min-h-screen mx-auto ">
        {isLoading ? (
          <div className="flex items-center justify-center h-[65vh]">
            <Spinner />
          </div>
        ) : (
          <QuotesList quotes={quotes?.data || []} onUnsave={onUnsave} />
        )}
      </div>
    </div>
  );
}

export default SavedQuotes;
