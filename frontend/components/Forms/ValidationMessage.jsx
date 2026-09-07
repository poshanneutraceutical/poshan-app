import React from "react";


const ValidationMessage = ({
  message,
  type = "error"
}) => {


  if (!message) {

    return null;

  }



  const styles = {


    error:
      "text-red-600",


    warning:
      "text-yellow-600",


    info:
      "text-blue-600"


  };



  return (

    <p
      className={`
        text-sm
        mt-1
        ${styles[type]}
      `}
    >

      {message}

    </p>

  );

};


export default ValidationMessage;