/**
 * Required field validation
 */
export const required = (value) => {
  if (
    value === null ||
    value === undefined ||
    String(value).trim() === ""
  ) {
    return "This field is required.";
  }

  return "";
};

/**
 * Email validation
 */
export const validateEmail = (
  email
) => {
  if (!email) {
    return "Email is required.";
  }

  const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return pattern.test(email)
    ? ""
    : "Invalid email address.";
};

/**
 * Indian mobile number validation
 */
export const validatePhone = (
  phone
) => {
  const pattern =
    /^[6-9]\d{9}$/;

  return pattern.test(phone)
    ? ""
    : "Invalid mobile number.";
};

/**
 * GST Number validation
 */
export const validateGST = (
  gst
) => {
  const pattern =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  return pattern.test(gst)
    ? ""
    : "Invalid GST number.";
};

/**
 * PAN validation
 */
export const validatePAN = (
  pan
) => {
  const pattern =
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  return pattern.test(pan)
    ? ""
    : "Invalid PAN number.";
};

/**
 * Password validation
 */
export const validatePassword = (
  password
) => {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return (
      "Password must contain at least 8 characters."
    );
  }

  return "";
};

/**
 * Positive number validation
 */
export const validatePositiveNumber = (
  value
) => {
  return Number(value) > 0
    ? ""
    : "Enter a valid number.";
};

/**
 * Minimum length validation
 */
export const minLength = (
  value,
  length
) => {
  return value.length >= length
    ? ""
    : `Minimum ${length} characters required.`;
};

/**
 * Maximum length validation
 */
export const maxLength = (
  value,
  length
) => {
  return value.length <= length
    ? ""
    : `Maximum ${length} characters allowed.`;
};