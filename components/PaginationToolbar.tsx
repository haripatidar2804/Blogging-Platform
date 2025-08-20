"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-1 gap-y-3 sm:gap-x-2">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="cursor-pointer rounded-md bg-sky-100 p-1 text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2"
        aria-label="First page"
      >
        <ChevronsLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer rounded-md bg-sky-100 p-1 text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2"
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      {[...Array(totalPages)].map((_, i) => {
        if (
          i === 0 ||
          i === totalPages - 1 ||
          (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
          return (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`cursor-pointer rounded-md px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base ${
                currentPage === i + 1
                  ? "bg-sky-600 text-white"
                  : "bg-sky-100 text-sky-600"
              }`}
            >
              {i + 1}
            </button>
          );
        }
        if (i === currentPage - 2 || i === currentPage + 2) {
          return (
            <span key={i} className="px-1 sm:px-2">
              ...
            </span>
          );
        }
        return null;
      })}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer rounded-md bg-sky-100 p-1 text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2"
        aria-label="Next page"
      >
        <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="cursor-pointer rounded-md bg-sky-100 p-1 text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2"
        aria-label="Last page"
      >
        <ChevronsRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}
