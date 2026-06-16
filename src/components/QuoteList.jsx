import QuoteCard from "./common-component/QuoteCard";

function QuotesList({ quotes, onUnsave }) {
  if (quotes.length === 0) {
    return (
      <p className="max-w-7xl min-h-100 flex justify-center items-center text-gray-400">
        {" "}
        No Quotes Found{" "}
      </p>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotes.map((q, i) => (
        <QuoteCard quote={q} onUnsave={onUnsave} key={i + 1} />
      ))}
    </div>
  );
}

export default QuotesList;
