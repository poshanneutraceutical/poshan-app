import React from "react";


const FormSection = ({
  title,
  children
}) => {


  return (

    <div
      className="
        mb-8
      "
    >


      {
        title && (

          <h3
            className="
              text-lg
              font-semibold
              text-gray-800
              mb-4
              border-b
              pb-2
            "
          >

            {title}

          </h3>

        )
      }



      <div>

        {children}

      </div>



    </div>

  );

};


export default FormSection;