import React from "react";


const EmptyState = ({
  title = "No Data Found",
  description = "There are no records available.",
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

        📄

      </div>




      <h2
        className="
          text-xl
          font-semibold
          text-gray-800
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

        {description}

      </p>




      {
        action && (

          <div
            className="
              mt-5
            "
          >

            {action}

          </div>

        )
      }



    </div>

  );

};


export default EmptyState;