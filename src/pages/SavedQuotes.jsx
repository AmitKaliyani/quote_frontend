import QuotesList from "../components/QuoteList";
import { useState } from "react";
import { getMySavedQuote } from "../api/quote.api";
import Spinner from "../components/common-component/Spinner";
import { useEffect } from "react";
// import { useSearchParams } from "react-router";

function SavedQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoding] = useState(false);
  const [error, setIsError] = useState("");
  //   const [params, setParams] = useSearchParams();
  //   const page = Number(params.get("page")) || 1;
  //   const limit = Number(params.get("limit")) || 10;

  const fetchSavedQuotes = async () => {
    try {
      setIsLoding(true);
      const response = await getMySavedQuote();
      //   console.log(response.data);

      setQuotes(response.data);
      setIsLoding(false);
    } catch (error) {
      console.log(error);
      setIsError(error.message);
    }
  };

  const onUnsave = (id) => {
    setQuotes((prev) => prev.filter((q) => q._id !== id));
  };

  useEffect(() => {
    fetchSavedQuotes();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
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
          <QuotesList quotes={quotes || []} onUnsave={onUnsave} />
        )}
      </div>
    </div>
  );
}

export default SavedQuotes;
