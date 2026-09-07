import React from "react";


const NoDataFound = ({
  title = "No Data Found",
  message = "No records are available to display.",
  action
}) => {


  return (

    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-12
        text-center
        bg-white
        rounded-lg
      "
    >


      <div
        className="
          text-5xl
          mb-4
        "
      >

        📂

      </div>



      <h2
        className="
          text-xl
          font-semibold
          text-gray-700
        "
      >

        {title}

      </h2>



      <p
        className="
          mt-2
          text-gray-500
          max-w-md
        "
      >

        {message}

      </p>



      {
        action && (

          <div className="mt-5">

            {action}

          </div>

        )
      }



    </div>

  );

};


export default NoDataFound;