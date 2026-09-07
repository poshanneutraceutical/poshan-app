import React from "react";


const SectionCard = ({
  title,
  children,
  action
}) => {


  return (

    <div
      className="
        bg-white
        rounded-lg
        shadow
        p-5
      "
    >


      {
        (title || action) && (

          <div
            className="
              flex
              justify-between
              items-center
              mb-5
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


export default SectionCard;