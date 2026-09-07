import React from "react";


const QuickAction = ({
  title,
  description,
  icon,
  onClick
}) => {


  return (

    <button

      onClick={onClick}

      className="
        bg-white
        rounded-lg
        shadow
        p-5
        text-left
        hover:shadow-md
        transition
        w-full
      "

    >


      <div
        className="
          flex
          items-center
          gap-4
        "
      >


        {
          icon && (

            <div
              className="
                text-3xl
              "
            >

              {icon}

            </div>

          )
        }




        <div>


          <h3
            className="
              font-semibold
              text-gray-800
            "
          >

            {title}

          </h3>



          {
            description && (

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >

                {description}

              </p>

            )
          }



        </div>



      </div>


    </button>

  );

};


export default QuickAction;