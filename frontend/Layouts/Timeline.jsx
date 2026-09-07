import React from "react";


const Timeline = ({
  items = []
}) => {


  return (

    <div
      className="
        space-y-6
      "
    >


      {
        items.map((item, index) => (

          <div
            key={index}
            className="
              flex
              gap-4
            "
          >


            <div
              className="
                flex
                flex-col
                items-center
              "
            >


              <div
                className="
                  w-4
                  h-4
                  rounded-full
                  bg-blue-600
                "
              >
              </div>



              {
                index !== items.length - 1 && (

                  <div
                    className="
                      w-px
                      flex-1
                      bg-gray-300
                      mt-2
                    "
                  >
                  </div>

                )
              }


            </div>




            <div>


              <h3
                className="
                  font-semibold
                  text-gray-800
                "
              >

                {item.title}

              </h3>



              {
                item.description && (

                  <p
                    className="
                      text-gray-500
                      text-sm
                      mt-1
                    "
                  >

                    {item.description}

                  </p>

                )
              }



              {
                item.date && (

                  <p
                    className="
                      text-xs
                      text-gray-400
                      mt-2
                    "
                  >

                    {item.date}

                  </p>

                )
              }



            </div>


          </div>

        ))
      }


    </div>

  );

};


export default Timeline;