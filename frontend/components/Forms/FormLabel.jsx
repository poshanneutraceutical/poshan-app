import React from "react";


const FormLabel = ({
  children,
  htmlFor,
  required = false
}) => {


  return (

    <label

      htmlFor={htmlFor}

      className="
        block
        text-sm
        font-medium
        text-gray-700
        mb-2
      "

    >

      {children}


      {
        required && (

          <span
            className="
              text-red-600
              ml-1
            "
          >

            *

          </span>

        )
      }



    </label>

  );

};


export default FormLabel;