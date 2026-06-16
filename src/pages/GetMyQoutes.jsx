import { useState } from "react";
import QuoteTable from "../components/common-component/Quotetable";
import { deleteQuote, getMyQuotes } from "../api/quote.api";
import Spinner from "../components/common-component/Spinner";
import { useSearchParams } from "react-router";
import CreateQuoteModals from "../components/modals/CreateQuoteModal";
import DeleteModal from "../components/modals/DeleteModal";
import toast from "react-hot-toast";
import useSWR from "swr";

function GetMyQoutes() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [quoteId, setQuoteId] = useState(null);
  const [params, setParams] = useSearchParams();
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

  const { data, error, isLoading, mutate } = useSWR(
    ["all-quotes", page, limit],
    () => getMyQuotes(filters),
  );

  const handleDeleteClick = (data) => {
    try {
      // console.log(data);
      setIsDeleteModalOpen(true);
      setQuoteId(data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (data) => {
    try {
      // console.log(data);
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
      await mutate();
      toast.success("Quote deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      // console.log(error);
    }
  };

  if (error) {
    return (
      <p className="min-h-screen flex justify-center items-center text-red-600 text-lg ">
        {error?.response?.data?.message}
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
              data={data}
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
