import React from "react";


const ModuleHeader = ({
  title,
  description,
  children
}) => {


  return (

    <div
      className="
        bg-white
        rounded-lg
        shadow
        p-6
        mb-6
      "
    >


      <div
        className="
          flex
          justify-between
          items-center
        "
      >


        <div>


          <h1
            className="
              text-2xl
              font-bold
              text-gray-800
            "
          >

            {title}

          </h1>



          {
            description && (

              <p
                className="
                  text-gray-500
                  mt-1
                "
              >

                {description}

              </p>

            )
          }


        </div>



        <div>

          {children}

        </div>



      </div>


    </div>

  );

};


export default ModuleHeader;