import React from "react";


const FormContainer = ({
  children,
  onSubmit,
  title,
  loading = false
}) => {


  return (

    <form

      onSubmit={onSubmit}

      className="
        bg-white
        rounded-lg
        shadow
        p-6
      "

    >



      {
        title && (

          <h2
            className="
              text-xl
              font-semibold
              text-gray-800
              mb-6
            "
          >

            {title}

          </h2>

        )
      }




      <div>

        {children}

      </div>




      {
        loading && (

          <p
            className="
              text-sm
              text-blue-600
              mt-4
            "
          >

            Processing...

          </p>

        )
      }



    </form>

  );

};


export default FormContainer;