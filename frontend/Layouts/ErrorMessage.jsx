import React from "react";


const ErrorMessage = ({
  message = "Something went wrong.",
  onRetry
}) => {


  return (

    <div
      className="
        bg-red-50
        border
        border-red-200
        rounded-lg
        p-5
        text-center
      "
    >


      <h3
        className="
          text-red-700
          font-semibold
          text-lg
        "
      >

        Error

      </h3>



      <p
        className="
          text-red-600
          mt-2
        "
      >

        {message}

      </p>



      {
        onRetry && (

          <button

            onClick={onRetry}

            className="
              mt-4
              px-4
              py-2
              bg-red-600
              text-white
              rounded-lg
              hover:bg-red-700
            "

          >

            Try Again

          </button>

        )
      }



    </div>

  );

};


export default ErrorMessage;
