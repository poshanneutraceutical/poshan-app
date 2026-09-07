import React from "react";


const PageHeader = ({
  title,
  description,
  children
}) => {


  return (

    <div
      className="
        flex
        justify-between
        items-center
        mb-6
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

  );

};


export default PageHeader;