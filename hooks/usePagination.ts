import { useState } from "react";

export const usePagination = (initialState: Record<string, number>) => {
  const [currentPage, setCurrentPage] = useState(initialState);

  const handlePreviousPage = (label: string) => {
    setCurrentPage((prev) => ({
      ...prev,
      [label]: Math.max(prev[label] - 1, 1),
    }));
  };

  const handleNextPage = (label: string) => {
    setCurrentPage((prev) => ({
      ...prev,
      [label]: prev[label] + 1,
    }));
  };

  return {
    currentPage,
    handlePreviousPage,
    handleNextPage,
  };
};
