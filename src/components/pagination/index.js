import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../../hooks/usePagination";
import "./pagination.css";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize = 10,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];

  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      <li
        // className={classnames("pagination-item", {
        //   disabled: currentPage === 1,
        // })}
        onClick={onPrevious}
      >
        <button
          class="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-not-allowed"
          disabled=""
          type="button"
          aria-label="Previous"
        >
          <svg
            class="h-3 w-3"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
      </li>

      {paginationRange?.map((pageNumber, key) => {
        if (pageNumber === DOTS) {
          return (
            <li key={key} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={key}
            // className={classnames("pagination-item", {
            //   selected: pageNumber === currentPage,
            // })}
          >
            <button
              class={`align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10 ${
                pageNumber === currentPage ? "bg-blue-600 dark:text-white" : ""
              }`}
              onClick={() => onPageChange(pageNumber)}
              type="button"
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li
        // className={classnames("pagination-item", {
        //   disabled: currentPage === lastPage,
        // })}

        onClick={onNext}
      >
        <button
          class="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
          type="button"
          aria-label="Next"
        >
          <svg
            class="h-3 w-3"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
