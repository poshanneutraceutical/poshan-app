import React from "react";
import { Link } from "react-router-dom";


const Breadcrumb = ({
  items = []
}) => {


  return (

    <nav
      className="
        flex
        items-center
        text-sm
        text-gray-500
        mb-4
      "
    >


      {
        items.map((item, index) => (

          <React.Fragment key={index}>


            {
              index > 0 && (

                <span className="mx-2">
                  /
                </span>

              )
            }



            {
              item.path && index !== items.length - 1 ? (

                <Link

                  to={item.path}

                  className="
                    hover:text-blue-600
                  "

                >

                  {item.label}

                </Link>


              ) : (


                <span
                  className="
                    text-gray-700
                    font-medium
                  "
                >

                  {item.label}

                </span>


              )
            }



          </React.Fragment>

        ))
      }


    </nav>

  );

};


export default Breadcrumb;