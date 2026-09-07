import React from "react";


const FormGrid = ({
  children,
  columns = 2
}) => {


  const columnsClass = {


    1:
      "grid-cols-1",


    2:
      "grid-cols-1 md:grid-cols-2",


    3:
      "grid-cols-1 md:grid-cols-3",


    4:
      "grid-cols-1 md:grid-cols-4"


  };



  return (

    <div
      className={`
        grid
        gap-6
        ${columnsClass[columns]}
      `}
    >

      {children}

    </div>

  );

};


export default FormGrid;