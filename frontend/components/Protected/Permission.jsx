import React from "react";
import { useAuth } from "../../context/AuthContext";


const Permission = ({
  roles = [],
  children
}) => {


  const {
    user
  } = useAuth();



  if (!user) {

    return null;

  }



  const hasPermission = roles.includes(
    user.role
  );



  if (!hasPermission) {

    return null;

  }



  return children;


};


export default Permission;
