import React from "react";


const InfoCard = ({
  label,
  value,
  icon
}) => {


  return (

    <div
      className="
        bg-white
        rounded-lg
        shadow
        p-4
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


        <p
          className="
            text-sm
            text-gray-500
          "
        >

          {label}

        </p>



        <h3
          className="
            text-lg
            font-semibold
            text-gray-800
          "
        >

          {value || "-"}

        </h3>


      </div>



    </div>

  );

};


export default InfoCard;
