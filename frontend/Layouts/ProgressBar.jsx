import React from "react";


const ProgressBar = ({
  progress = 0,
  label
}) => {


  return (

    <div
      className="
        w-full
      "
    >


      {
        label && (

          <div
            className="
              flex
              justify-between
              mb-2
              text-sm
              text-gray-600
            "
          >

            <span>

              {label}

            </span>


            <span>

              {progress}%

            </span>


          </div>

        )
      }



      <div
        className="
          w-full
          bg-gray-200
          rounded-full
          h-3
        "
      >


        <div

          className="
            bg-blue-600
            h-3
            rounded-full
            transition-all
          "

          style={{
            width: `${progress}%`
          }}

        >
        </div>



      </div>


    </div>

  );

};


export default ProgressBar;
