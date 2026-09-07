import { useMemo } from "react";
import useAuth from "./useAuth";

const usePermissions = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();

  const permissions = useMemo(
    () => user?.permissions || [],
    [user]
  );

  const role = user?.role || null;

  const hasRole = (...roles) => {
    return roles.includes(role);
  };

  const hasPermission = (
    permission
  ) => {
    return permissions.includes(
      permission
    );
  };

  const hasAnyPermission = (
    requiredPermissions = []
  ) => {
    return requiredPermissions.some(
      (permission) =>
        permissions.includes(permission)
    );
  };

  const hasAllPermissions = (
    requiredPermissions = []
  ) => {
    return requiredPermissions.every(
      (permission) =>
        permissions.includes(permission)
    );
  };

  return {
    user,
    role,
    permissions,
    isAuthenticated,
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  };
};

export default usePermissions;