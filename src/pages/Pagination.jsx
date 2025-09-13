import React from "react";

function Pagination({ currentPage, totalPages, onPrev, onNext, color = "teal" }) {
  if (totalPages <= 1) return null;

  const borderColor = `border-${color}-500`;
  const textColor = `text-${color}-500`;
  const hoverBg = `hover:bg-${color}-500`;
  const hoverText = `hover:text-white`;

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg border ${borderColor} ${textColor} font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${hoverBg} ${hoverText}`}
      >
        Prev
      </button>

      <span className="font-semibold text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg border ${borderColor} ${textColor} font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${hoverBg} ${hoverText}`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
