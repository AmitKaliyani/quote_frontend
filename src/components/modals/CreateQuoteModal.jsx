import { FaTimes } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";

import { TAGS } from "../../constants/tags";
import { createQuotesSchema } from "../../validators/quotesSchema";
import { createQuote, updateQuote } from "../../api/quote.api";
import toast from "react-hot-toast";
import { useEffect } from "react";

function CreateQuoteModals({ isOpen, setIsOpen, quote, setQuote, mutate }) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createQuotesSchema),
    defaultValues: {
      text: "",
      tags: [],
      author: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // console.log(data);
      quote ? await updateQuote(quote._id, data) : await createQuote(data);
      toast.success(`Quote ${quote ? "updated" : "created"} succesfully}`);
      setQuote(null);
      setIsOpen(false);
      await mutate();
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "52px",
      borderRadius: "12px",
      borderColor: state.isFocused ? "#9333ea" : "#e9d5ff",
      boxShadow: state.isFocused ? "0 0 0 4px rgba(147,51,234,.12)" : "none",
      "&:hover": {
        borderColor: "#9333ea",
      },
    }),

    option: (base, state) => ({
      ...base,
      padding: "8px 12px",
      fontSize: "14px",
      //   minHeight: "30px",
      textTransform: "capitalize",
      backgroundColor: state.isSelected
        ? "#9333ea"
        : state.isFocused
          ? "#f3e8ff"
          : "white",
      color: state.isSelected ? "white" : "#374151",
    }),

    menuList: (base) => ({
      ...base,
      maxHeight: "180px",
      //   overflowY: "auto",
    }),

    multiValue: (base) => ({
      ...base,
      backgroundColor: "#ede9fe",
      borderRadius: "999px",
    }),

    multiValueLabel: (base) => ({
      ...base,
      color: "#6b21a8",
      textTransform: "capitalize",
      fontWeight: 500,
    }),

    multiValueRemove: (base) => ({
      ...base,
      color: "#6b21a8",
      ":hover": {
        backgroundColor: "#9333ea",
        color: "#fff",
      },
    }),
  };

  useEffect(() => {
    if (quote) {
      reset({
        text: quote.text,
        tags: quote.tags,
        author: quote.author,
      });
    } else {
      reset({
        text: "",
        tags: [],
        author: "",
      });
    }
  }, [quote, reset]);

  if (!isOpen) return null;

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center  bg-black/30 backdrop-blur-sm p-2"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-2xl      
          rounded-2xl
          bg-white
          shadow-[0_25px_80px_rgba(0,0,0,0.15)]
          border
          border-purple-100
        "
      >
        <div className="flex items-center justify-between rounded-2xl px-6 py-4  mb-5 bg-linear-to-r from-purple-600 to-violet-600">
          <div>
            <h2 className="text-xl font-bold text-white">
              {quote ? "Edit Quote" : "Create New Quote"}
            </h2>

            <p className="text-sm text-purple-100 mt-1">
              Share your thoughts with the community
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="
              h-10
              w-10
              rounded-full
              bg-white/20
              text-white
              flex
              items-center
              justify-center
              hover:bg-white/30
              transition
              cursor-pointer
            "
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Quote
            </label>

            <textarea
              rows={3}
              {...register("text")}
              placeholder="Write your quote..."
              className="
                w-full
                rounded-xl
                border
                border-purple-200
                px-4
                py-3
                resize-none
                outline-none
                transition
                focus:ring-4
                focus:ring-purple-100
                focus:border-purple-500
              "
            />

            {errors.text && (
              <p className="mt-1 text-xs text-red-500">{errors.text.message}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Tags
            </label>

            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select
                  isMulti
                  placeholder="Select tags..."
                  styles={selectStyles}
                  options={TAGS.filter((tag) => tag !== "ALL").map((tag) => ({
                    value: tag,
                    label: tag,
                  }))}
                  value={field.value?.map((tag) => ({
                    value: tag,
                    label: tag,
                  }))}
                  onChange={(selected) =>
                    field.onChange(selected?.map((item) => item.value) || [])
                  }
                />
              )}
            />

            {errors.tags && (
              <p className="mt-1 text-xs text-red-500">{errors.tags.message}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Author
            </label>

            <input
              type="text"
              {...register("author")}
              placeholder="Author name"
              className="
                w-full
                rounded-xl
                border
                border-purple-200
                px-4
                py-3
                outline-none
                transition
                focus:ring-4
                focus:ring-purple-100
                focus:border-purple-500
              "
            />

            {errors.author && (
              <p className="mt-1 text-xs text-red-500">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="
                px-5
                py-2.5
                rounded-xl
                border
                border-gray-300
                text-gray-700
                font-medium
                hover:bg-gray-100
                transition
                cursor-pointer
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
               min-w-37.5
                px-5
                py-2.5
                rounded-xl
                bg-linear-to-r
                from-purple-600
                to-violet-600
                text-white
                font-semibold
                hover:opacity-90
                disabled:opacity-60
                transition
                cursor-pointer
              "
            >
              {isSubmitting ? (
                <div className="mx-auto h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : quote ? (
                "Edit Quote"
              ) : (
                "Publish Quote"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateQuoteModals;
