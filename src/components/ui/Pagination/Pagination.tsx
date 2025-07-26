import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPaginationNumbers = () => {
    if (totalPages <= 1) return [];

    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're at the start or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Mobile view - show only current page and ellipsis if needed
    if (window.innerWidth < 640) {
      if (currentPage > 1) {
        pages.push(1);
        if (currentPage > 2) {
          pages.push("...");
        }
      }
      pages.push(currentPage);
      if (currentPage < totalPages) {
        if (currentPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
      return pages;
    }

    // Tablet view - limited pages
    if (window.innerWidth < 768) {
      const mobileMaxPages = 3;
      startPage = Math.max(1, currentPage - Math.floor(mobileMaxPages / 2));
      endPage = Math.min(totalPages, startPage + mobileMaxPages - 1);

      if (endPage - startPage + 1 < mobileMaxPages) {
        startPage = Math.max(1, endPage - mobileMaxPages + 1);
      }
    }

    // Always show first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    // Visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  // Add resize listener for responsiveness
  React.useEffect(() => {
    const handleResize = () => {};
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (totalPages <= 1) return null;

  return (
    <div className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-center space-x-0 sm:space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 sm:p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page Numbers */}
        {renderPaginationNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-2 sm:px-3 py-1 sm:py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => {
                  if (typeof page === "number") handlePageChange(page);
                }}
                className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-teal-700 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 sm:p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};