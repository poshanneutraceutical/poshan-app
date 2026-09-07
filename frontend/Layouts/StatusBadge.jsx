import React from "react";


const StatusBadge = ({
  status
}) => {


  const statusStyles = {


    ACTIVE:
      "bg-green-100 text-green-700",


    APPROVED:
      "bg-green-100 text-green-700",


    COMPLETED:
      "bg-green-100 text-green-700",


    INACTIVE:
      "bg-gray-100 text-gray-700",


    PENDING:
      "bg-yellow-100 text-yellow-700",


    PENDING_APPROVAL:
      "bg-yellow-100 text-yellow-700",


    SUBMITTED:
      "bg-blue-100 text-blue-700",


    DRAFT:
      "bg-gray-100 text-gray-700",


    REJECTED:
      "bg-red-100 text-red-700",


    CANCELLED:
      "bg-red-100 text-red-700"


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
          statusStyles[status]
          ||
          "bg-gray-100 text-gray-700"
        }
      `}

    >

      {status?.replaceAll("_", " ") || "UNKNOWN"}

    </span>

  );

};


export default StatusBadge;