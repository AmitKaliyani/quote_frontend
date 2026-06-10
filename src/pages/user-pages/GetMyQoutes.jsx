import { useState } from "react";
import QuoteTable from "../../components/common-component/Quotetable";
import { useEffect } from "react";
import { deleteQuote, getMyQuotes } from "../../api/quote.api";
import Spinner from "../../components/common-component/Spinner";
import { useSearchParams } from "react-router";
import CreateQuoteModals from "../../components/modals/CreateQuoteModal";
import DeleteModal from "../../components/modals/DeleteModal";
import toast from "react-hot-toast";

function GetMyQoutes() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [quoteId, setQuoteId] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [params, setParams] = useSearchParams();
  // const [isEdited, setIsEdited] = useState(false);
  const [quote, setQuote] = useState(null);

  const page = Number(params.get("page")) || 1;
  const limit = Number(params.get("limit")) || 10;

  const filters = {
    page,
    limit,
  };

  const handlePageChange = (newPage) => {
    setParams({
      page: newPage,
      limit,
    });
  };

  const handleLimitChange = (newLimit) => {
    setParams({
      page: 1,
      limit: newLimit,
    });
  };

  // console.log(handleLimitChange);

  const fetchMyQuotes = async (filters) => {
    try {
      setIsLoading(true);
      const response = await getMyQuotes(filters);
      // console.log(response);

      setQuotes(response);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteClick = (data) => {
    try {
      console.log(data);
      setIsDeleteModalOpen(true);
      setQuoteId(data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (data) => {
    try {
      console.log(data);
      setIsOpen(true);
      setQuote(data);
      // setIsEdited(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteQuote = async () => {
    try {
      await deleteQuote(quoteId);
      setQuotes((prev) => ({
        ...prev,
        data: prev.data.filter((q) => q._id !== quoteId),
      }));
      toast.success("Quote deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Quote not found");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyQuotes(filters);
  }, [page, limit]);

  if (error) {
    return (
      <p className="min-h-screen flex justify-center items-center text-red-600 text-lg ">
        {error}
      </p>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="flex justify-between items-center px-6 mt-4 mb-4">
          <h1 className="font-bold">My Quotes</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-purple-500 text-white rounded-lg py-2 px-3 cursor-pointer "
          >
            Create Quote
          </button>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Spinner />
          </div>
        ) : (
          <div className="px-3 mt-10">
            <QuoteTable
              data={quotes}
              page={page}
              setPage={handlePageChange}
              onLimitChange={handleLimitChange}
              onDeleteClick={handleDeleteClick}
              onEditClick={handleEditClick}
            />
          </div>
        )}
      </div>

      <CreateQuoteModals
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        quote={quote}
        setQuote={setQuote}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={setIsDeleteModalOpen}
        handleDeleteQuote={handleDeleteQuote}
      />
    </>
  );
}

export default GetMyQoutes;
