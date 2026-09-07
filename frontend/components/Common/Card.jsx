import React from "react";


const Card = ({
  title,
  children,
  action,
  className = ""
}) => {


  return (

    <div
      className={`
        bg-white
        rounded-lg
        shadow
        p-5
        ${className}
      `}
    >



      {
        (title || action) && (

          <div
            className="
              flex
              justify-between
              items-center
              mb-4
            "
          >


            {
              title && (

                <h2
                  className="
                    text-lg
                    font-semibold
                    text-gray-800
                  "
                >

                  {title}

                </h2>

              )
            }



            {
              action && (

                <div>

                  {action}

                </div>

              )
            }



          </div>

        )
      }




      <div>

        {children}

      </div>



    </div>

  );

};


export default Card;