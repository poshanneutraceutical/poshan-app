import React from "react";


const SuccessMessage = ({
  title = "Success",
  message,
  action
}) => {


  return (

    <div
      className="
        bg-green-50
        border
        border-green-200
        rounded-lg
        p-5
      "
    >


      <h3
        className="
          text-lg
          font-semibold
          text-green-700
        "
      >

        ✓ {title}

      </h3>



      {
        message && (

          <p
            className="
              text-green-600
              mt-2
            "
          >

            {message}

          </p>

        )
      }



      {
        action && (

          <div
            className="
              mt-4
            "
          >

            {action}

          </div>

        )
      }



    </div>

  );

};


export default SuccessMessage;