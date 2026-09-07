import React from "react";


const RoleBadge = ({
  role
}) => {


  const roleStyles = {


    ADMIN:
      "bg-purple-100 text-purple-700",


    MANAGER:
      "bg-blue-100 text-blue-700",


    EMPLOYEE:
      "bg-green-100 text-green-700",


    VENDOR:
      "bg-yellow-100 text-yellow-700",


    USER:
      "bg-gray-100 text-gray-700"


  };



  return (

    <span

      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${
          roleStyles[role]
          ||
          "bg-gray-100 text-gray-700"
        }
      `}

    >

      {role || "USER"}

    </span>

  );

};


export default RoleBadge;