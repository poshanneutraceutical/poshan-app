import React from "react";


const PermissionGuard = ({
  permissions = [],
  requireAll = false,
  children,
  fallback = null
}) => {


  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const userPermissions = user.permissions || [];

  const hasAccess = requireAll
    ? permissions.every(permission =>
        userPermissions.includes(permission)
      )
    : permissions.some(permission =>
        userPermissions.includes(permission)
      );

  if (!hasAccess) {
    return fallback;
  }

  return children;

};


export default PermissionGuard;
