import React from "react";


const StatsCard = ({
  title,
  value,
  icon,
  variant = "blue",
  onClick
}) => {


  const variants = {


    blue:
      "border-blue-500",


    green:
      "border-green-500",


    red:
      "border-red-500",


    yellow:
      "border-yellow-500",


    gray:
      "border-gray-500"


  };



  return (

    <div

      onClick={onClick}

      className={`
        bg-white
        shadow
        rounded-lg
        p-5
        border-l-4
        ${variants[variant]}
        ${onClick ? "cursor-pointer hover:shadow-md" : ""}
        transition
      `}

    >


      <div
        className="
          flex
          justify-between
          items-center
        "
      >


        <div>


          <p
            className="
              text-gray-500
              text-sm
            "
          >

            {title}

          </p>



          <h2
            className="
              text-3xl
              font-bold
              mt-2
              text-gray-800
            "
          >

            {value}

          </h2>


        </div>



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



      </div>


    </div>

  );

};


export default StatsCard;