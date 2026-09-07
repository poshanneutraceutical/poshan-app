import React from "react";


const EmptyState = ({
  title = "No Data Found",
  message = "There are no records available.",
  icon = "📄",
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
      "
    >


      <div
        className="
          text-5xl
          mb-4
        "
      >

        {icon}

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
          text-gray-500
          mt-2
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


export default EmptyState;