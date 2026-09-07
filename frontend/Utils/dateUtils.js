/**
 * Format date as DD/MM/YYYY
 */
export const formatDate = (
  date,
  locale = "en-IN"
) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString(
    locale
  );
};

/**
 * Format date & time
 */
export const formatDateTime = (
  date,
  locale = "en-IN"
) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleString(
    locale
  );
};

/**
 * Check if two dates are the same day
 */
export const isSameDay = (
  date1,
  date2
) => {
  const first = new Date(date1);
  const second = new Date(date2);

  return (
    first.getFullYear() ===
      second.getFullYear() &&
    first.getMonth() ===
      second.getMonth() &&
    first.getDate() ===
      second.getDate()
  );
};

/**
 * Add days to a date
 */
export const addDays = (
  date,
  days
) => {
  const result = new Date(date);
  result.setDate(
    result.getDate() + days
  );

  return result;
};

/**
 * Subtract days from a date
 */
export const subtractDays = (
  date,
  days
) => {
  return addDays(date, -days);
};

/**
 * Days between two dates
 */
export const differenceInDays = (
  startDate,
  endDate
) => {
  const diff =
    new Date(endDate) -
    new Date(startDate);

  return Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );
};

/**
 * Check if date is in the past
 */
export const isPastDate = (
  date
) => {
  return (
    new Date(date) < new Date()
  );
};

/**
 * Financial Year (India)
 */
export const getFinancialYear = (
  date = new Date()
) => {
  const current = new Date(date);
  const year = current.getFullYear();

  if (current.getMonth() >= 3) {
    return `${year}-${year + 1}`;
  }

  return `${year - 1}-${year}`;
};

/**
 * Relative time
 */
export const getRelativeTime = (
  date
) => {
  const seconds = Math.floor(
    (Date.now() -
      new Date(date).getTime()) /
      1000
  );

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  if (seconds < 3600) {
    return `${Math.floor(
      seconds / 60
    )} minutes ago`;
  }

  if (seconds < 86400) {
    return `${Math.floor(
      seconds / 3600
    )} hours ago`;
  }

  return `${Math.floor(
    seconds / 86400
  )} days ago`;
};