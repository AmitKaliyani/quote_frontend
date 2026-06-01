import QuoteCard from "./common-component/QuoteCard";


const quotes = [
  { content: "Stay hungry stay foolish", author: "Steve Jobs" },
  { content: "Do what you love", author: "Steve Jobs" },
  { content: "Simplicity is the ultimate sophistication", author: "Leonardo da Vinci" },
];

function QuotesList() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotes.map((q, i) => (
        <QuoteCard key={i} quote={q} />
      ))}
    </div>
  );
}

export default QuotesList;