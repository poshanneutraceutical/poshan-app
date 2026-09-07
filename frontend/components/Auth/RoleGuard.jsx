import React from "react";


const RoleGuard = ({
  allowedRoles = [],
  children,
  fallback = null
}) => {


  const user =
    JSON.parse(
      localStorage.getItem("user")
    );



  const hasAccess =
    allowedRoles.includes(
      user?.role
    );



  if (!hasAccess) {

    return fallback;

  }




  return children;


};


export default RoleGuard;