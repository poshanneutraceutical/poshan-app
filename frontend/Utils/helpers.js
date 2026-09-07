/**
 * Generate a random unique ID
 */
export const generateId = (
  prefix = ""
) => {
  return `${prefix}${Date.now()}${Math.random()
    .toString(36)
    .substring(2, 9)}`;
};

/**
 * Capitalize first letter
 */
export const capitalize = (
  value = ""
) => {
  if (!value) {
    return "";
  }

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
};

/**
 * Convert string to Title Case
 */
export const toTitleCase = (
  value = ""
) => {
  return value
    .toLowerCase()
    .split(" ")
    .map(capitalize)
    .join(" ");
};

/**
 * Deep clone an object
 */
export const deepClone = (
  object
) => {
  return structuredClone(object);
};

/**
 * Remove null, undefined and empty string values
 */
export const removeEmptyValues = (
  object
) => {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([, value]) =>
        value !== null &&
        value !== undefined &&
        value !== ""
    )
  );
};

/**
 * Delay execution
 */
export const sleep = (
  milliseconds
) => {
  return new Promise((resolve) =>
    setTimeout(resolve, milliseconds)
  );
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard =
  async (text) => {
    await navigator.clipboard.writeText(
      text
    );
  };

/**
 * Check if object is empty
 */
export const isEmpty = (
  value
) => {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (
    value &&
    typeof value === "object"
  ) {
    return (
      Object.keys(value).length === 0
    );
  }

  return !value;
};

/**
 * Group array by property
 */
export const groupBy = (
  array,
  key
) => {
  return array.reduce(
    (result, item) => {
      const group = item[key];

      if (!result[group]) {
        result[group] = [];
      }

      result[group].push(item);

      return result;
    },
    {}
  );
};

/**
 * Download Blob as file
 */
export const downloadBlob = (
  blob,
  fileName
) => {
  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};