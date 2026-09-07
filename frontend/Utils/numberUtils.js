/**
 * Format currency (INR)
 */
export const formatCurrency = (
  value
) => {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2
    }
  ).format(Number(value || 0));
};

/**
 * Format decimal number
 */
export const formatNumber = (
  value,
  decimals = 2
) => {
  return Number(value || 0).toFixed(
    decimals
  );
};

/**
 * Format percentage
 */
export const formatPercentage = (
  value,
  decimals = 2
) => {
  return `${Number(
    value || 0
  ).toFixed(decimals)}%`;
};

/**
 * Abbreviate number
 */
export const abbreviateNumber = (
  value
) => {
  const number = Number(value);

  if (number >= 10000000) {
    return `${(
      number / 10000000
    ).toFixed(2)} Cr`;
  }

  if (number >= 100000) {
    return `${(
      number / 100000
    ).toFixed(2)} L`;
  }

  if (number >= 1000) {
    return `${(
      number / 1000
    ).toFixed(2)} K`;
  }

  return number.toString();
};

/**
 * Round to decimal places
 */
export const roundTo = (
  value,
  decimals = 2
) => {
  return Number(
    Math.round(
      Number(value) *
        Math.pow(10, decimals)
    ) / Math.pow(10, decimals)
  );
};

/**
 * Convert safely to number
 */
export const toNumber = (
  value,
  fallback = 0
) => {
  const number = Number(value);

  return Number.isNaN(number)
    ? fallback
    : number;
};

/**
 * Clamp number between min and max
 */
export const clamp = (
  value,
  min,
  max
) => {
  return Math.min(
    Math.max(value, min),
    max
  );
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (
  value,
  total
) => {
  if (!total) {
    return 0;
  }

  return (value / total) * 100;
};