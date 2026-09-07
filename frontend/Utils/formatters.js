/**
 * Format full name
 */
export const formatName = (
  firstName = "",
  lastName = ""
) => {
  return `${firstName} ${lastName}`.trim();
};

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
      currency: "INR"
    }
  ).format(Number(value || 0));
};

/**
 * Format phone number
 */
export const formatPhone = (
  phone
) => {
  const digits = String(phone || "");

  if (digits.length !== 10) {
    return digits;
  }

  return `${digits.slice(
    0,
    5
  )} ${digits.slice(5)}`;
};

/**
 * Format GST Number
 */
export const formatGST = (
  gst
) => {
  return String(gst || "")
    .toUpperCase()
    .trim();
};

/**
 * Format PAN Number
 */
export const formatPAN = (
  pan
) => {
  return String(pan || "")
    .toUpperCase()
    .trim();
};

/**
 * Format status
 */
export const formatStatus = (
  status
) => {
  return String(status || "")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};

/**
 * Format address
 */
export const formatAddress = (
  address = {}
) => {
  return [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.country,
    address.pincode
  ]
    .filter(Boolean)
    .join(", ");
};

/**
 * Format initials
 */
export const getInitials = (
  name = ""
) => {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) =>
      part.charAt(0).toUpperCase()
    )
    .join("")
    .slice(0, 2);
};