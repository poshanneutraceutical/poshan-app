import { useMemo, useState } from "react";

const useSearch = (
  data = [],
  searchableFields = []
) => {
  const [searchTerm, setSearchTerm] =
    useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }

    const query = searchTerm
      .toLowerCase()
      .trim();

    return data.filter((item) =>
      searchableFields.some((field) => {
        const value = item[field];

        if (
          value === undefined ||
          value === null
        ) {
          return false;
        }

        return String(value)
          .toLowerCase()
          .includes(query);
      })
    );
  }, [
    data,
    searchableFields,
    searchTerm
  ]);

  const clearSearch = () =>
    setSearchTerm("");

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    clearSearch,
    hasSearch:
      searchTerm.trim().length > 0
  };
};

export default useSearch;