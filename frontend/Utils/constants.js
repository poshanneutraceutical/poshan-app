// ==============================
// Application
// ==============================

export const APP_NAME = "Poshan ERP";

export const APP_VERSION = "1.0.0";

export const DEFAULT_PAGE_SIZE = 10;

export const MAX_PAGE_SIZE = 100;


// ==============================
// Local Storage Keys
// ==============================

export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  THEME: "theme",
  LANGUAGE: "language"
};


// ==============================
// User Roles
// ==============================

export const ROLES = {
  ADMIN: "ADMIN",
  PURCHASE_MANAGER: "PURCHASE_MANAGER",
  PURCHASE_EXECUTIVE: "PURCHASE_EXECUTIVE",
  STORE_MANAGER: "STORE_MANAGER",
  STORE_EXECUTIVE: "STORE_EXECUTIVE",
  FINANCE: "FINANCE",
  EMPLOYEE: "EMPLOYEE"
};


// ==============================
// Purchase Requisition Status
// ==============================

export const PURCHASE_REQUISITION_STATUS = {
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CONVERTED: "CONVERTED"
};


// ==============================
// Purchase Order Status
// ==============================

export const PURCHASE_ORDER_STATUS = {
  DRAFT: "DRAFT",
  SENT: "SENT",
  PARTIALLY_RECEIVED: "PARTIALLY_RECEIVED",
  RECEIVED: "RECEIVED",
  CLOSED: "CLOSED",
  CANCELLED: "CANCELLED"
};


// ==============================
// Inventory Status
// ==============================

export const INVENTORY_STATUS = {
  IN_STOCK: "IN_STOCK",
  LOW_STOCK: "LOW_STOCK",
  OUT_OF_STOCK: "OUT_OF_STOCK"
};


// ==============================
// Employee Status
// ==============================

export const EMPLOYEE_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED"
};


// ==============================
// Notification Types
// ==============================

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info"
};


// ==============================
// Date Formats
// ==============================

export const DATE_FORMAT = "DD/MM/YYYY";

export const DATE_TIME_FORMAT =
  "DD/MM/YYYY HH:mm:ss";


// ==============================
// API Timeout
// ==============================

export const API_TIMEOUT = 30000;