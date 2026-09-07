import React from "react";


const ConfirmationAlert = ({
  type = "success",
  message,
  onClose
}) => {


  const styles = {


    success:
      "bg-green-100 text-green-700 border-green-300",


    error:
      "bg-red-100 text-red-700 border-red-300",


    warning:
      "bg-yellow-100 text-yellow-700 border-yellow-300",


    info:
      "bg-blue-100 text-blue-700 border-blue-300"


  };



  return (

    <div
      className={`
        border
        rounded-lg
        p-4
        flex
        justify-between
        items-center
        ${styles[type]}
      `}
    >


      <p
        className="
          font-medium
        "
      >

        {message}

      </p>




      {
        onClose && (

          <button

            onClick={onClose}

            className="
              ml-4
              font-bold
            "

          >

            ×

          </button>

        )
      }



    </div>

  );

};


export default ConfirmationAlert;