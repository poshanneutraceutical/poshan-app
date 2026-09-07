import { ROLES } from "./constants";

/**
 * Check if user has a role
 */
export const hasRole = (
  user,
  ...roles
) => {
  if (!user) {
    return false;
  }

  return roles.includes(user.role);
};

/**
 * Check if user has a permission
 */
export const hasPermission = (
  user,
  permission
) => {
  if (!user) {
    return false;
  }

  return (
    user.permissions?.includes(
      permission
    ) || false
  );
};

/**
 * Check if user has all permissions
 */
export const hasAllPermissions = (
  user,
  permissions = []
) => {
  if (!user) {
    return false;
  }

  return permissions.every(
    (permission) =>
      user.permissions?.includes(
        permission
      )
  );
};

/**
 * Check if user has any permission
 */
export const hasAnyPermission = (
  user,
  permissions = []
) => {
  if (!user) {
    return false;
  }

  return permissions.some(
    (permission) =>
      user.permissions?.includes(
        permission
      )
  );
};

/**
 * Admin check
 */
export const isAdmin = (
  user
) => {
  return hasRole(
    user,
    ROLES.ADMIN
  );
};

/**
 * Purchase module access
 */
export const canAccessPurchase = (
  user
) => {
  return hasRole(
    user,
    ROLES.ADMIN,
    ROLES.PURCHASE_MANAGER,
    ROLES.PURCHASE_EXECUTIVE
  );
};

/**
 * Inventory module access
 */
export const canAccessInventory = (
  user
) => {
  return hasRole(
    user,
    ROLES.ADMIN,
    ROLES.STORE_MANAGER,
    ROLES.STORE_EXECUTIVE
  );
};

/**
 * Finance module access
 */
export const canAccessFinance = (
  user
) => {
  return hasRole(
    user,
    ROLES.ADMIN,
    ROLES.FINANCE
  );
};