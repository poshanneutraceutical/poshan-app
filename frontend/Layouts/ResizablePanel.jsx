import React, { useState } from "react";


const ResizablePanel = ({
  children,
  defaultWidth = 50
}) => {


  const [width, setWidth] =
    useState(defaultWidth);



  const handleResize = (event) => {


    const newWidth =
      (event.clientX / window.innerWidth) * 100;



    if (
      newWidth > 20 &&
      newWidth < 80
    ) {

      setWidth(newWidth);

    }


  };




  return (

    <div
      className="
        flex
        w-full
        min-h-full
      "
    >


      <div

        style={{
          width: `${width}%`
        }}

      >

        {children}

      </div>



      <div

        onMouseMove={(event) => {

          if (event.buttons === 1) {

            handleResize(event);

          }

        }}

        className="
          w-1
          cursor-col-resize
          bg-gray-300
        "

      >
      </div>



    </div>

  );

};


export default ResizablePanel;