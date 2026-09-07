import { useEffect, useState } from "react";

const useLocalStorage = (
  key,
  initialValue
) => {
  const readValue = () => {
    try {
      const storedValue =
        localStorage.getItem(key);

      if (storedValue === null) {
        return initialValue;
      }

      return JSON.parse(storedValue);
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] =
    useState(readValue);

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch {
      // Ignore storage errors
    }
  }, [key, value]);

  const updateValue = (newValue) => {
    setValue((previousValue) =>
      typeof newValue === "function"
        ? newValue(previousValue)
        : newValue
    );
  };

  return [value, updateValue];
};

export default useLocalStorage;