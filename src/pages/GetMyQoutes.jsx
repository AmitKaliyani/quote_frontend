import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import QuoteTable from "../components/common-component/Quotetable";

function GetMyQoutes() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen">
        <div className="flex justify-between items-center px-6 mt-4 mb-4">
          <h1 className="font-bold">Get My Quotes</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-purple-500 text-white rounded-lg py-2 px-3 cursor-pointer "
          >
            Create Quote
          </button>
        </div>
 <div className="px-3 mt-10">

        <QuoteTable />
 </div>
      </div>

    {
  isOpen && (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl mx-4  border border-purple-700 rounded-2xl shadow-2xl bg-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-purple-700">
          <h2 className="text-xl font-bold ">
            Create New Quote
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="t hover:text-red-500 text-2xl cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <form className="p-5 space-y-4">
          <div>
            <label className="block mb-2 text-sm ">
              Quote
            </label>

            <textarea
              rows={5}
              placeholder="Write your quote..."
              className="w-full p-3 rounded-lg  border border-purple-700 text- focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm ">
              Category
            </label>

            <select className="w-full outline-0 p-3 rounded-lg  border border-purple-700">
              <option>Motivation</option>
              <option>Life</option>
              <option>Love</option>
              <option>Success</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm ">
              Author
            </label>

            <input
              type="text"
              placeholder="Author name"
              className="w-full p-3 rounded-lg  border border-purple-700  focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex justify-end items-center gap-3">

          <button
            type="submit"
            className="w-auto px-3 py-2 rounded-lg bg-red-600   text-white font-semibold"
            >
            Cancle
          </button>
          <button
            type="submit"
            className="w-auto px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            >
            Publish Quote
          </button>
            </div>
        </form>
      </div>
    </div>
  )
}
    </>
  );
}

export default GetMyQoutes;
