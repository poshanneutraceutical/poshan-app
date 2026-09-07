import React from "react";


const LoadingOverlay = ({
  message = "Loading..."
}) => {


  return (

    <div
      className="
        fixed
        inset-0
        bg-black
        bg-opacity-30
        flex
        items-center
        justify-center
        z-50
      "
    >


      <div
        className="
          bg-white
          rounded-lg
          shadow-lg
          p-6
          flex
          flex-col
          items-center
        "
      >


        <div
          className="
            w-12
            h-12
            border-4
            border-blue-600
            border-t-transparent
            rounded-full
            animate-spin
          "
        >
        </div>



        <p
          className="
            mt-4
            text-gray-700
            font-medium
          "
        >

          {message}

        </p>


      </div>


    </div>

  );

};


export default LoadingOverlay;