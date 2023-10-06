import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center">
      <button
        className={`cursor-pointer mr-6 transition-all ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-150"
        }`}
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon width={20} height={20} />
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        className={`cursor-pointer ml-6 transition-all ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-150"
        }`}
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon width={20} height={20} />
      </button>
    </div>
  );
}

export default Pagination;
