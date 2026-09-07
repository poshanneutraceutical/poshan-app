import { useEffect, useMemo, useState } from "react";

const usePagination = ({
  data = [],
  initialPage = 1,
  pageSize = 10
} = {}) => {
  const [currentPage, setCurrentPage] =
    useState(initialPage);

  const [itemsPerPage, setItemsPerPage] =
    useState(pageSize);

  const totalPages = useMemo(
    () =>
      Math.max(
        1,
        Math.ceil(
          data.length / itemsPerPage
        )
      ),
    [data.length, itemsPerPage]
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedData = useMemo(() => {
    const start =
      (currentPage - 1) * itemsPerPage;

    return data.slice(
      start,
      start + itemsPerPage
    );
  }, [data, currentPage, itemsPerPage]);

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData,
    hasNext:
      currentPage < totalPages,
    hasPrevious:
      currentPage > 1,
    setCurrentPage,
    setItemsPerPage,
    nextPage: () =>
      setCurrentPage((page) =>
        Math.min(page + 1, totalPages)
      ),
    previousPage: () =>
      setCurrentPage((page) =>
        Math.max(page - 1, 1)
      ),
    goToPage: (page) =>
      setCurrentPage(
        Math.min(
          Math.max(1, page),
          totalPages
        )
      )
  };
};

export default usePagination;