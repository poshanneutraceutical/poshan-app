import React from "react";


const FormRow = ({
  children,
  columns = 2
}) => {


  const gridColumns = {


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
        gap-4
        mb-4
        ${gridColumns[columns]}
      `}
    >

      {children}

    </div>

  );

};


export default FormRow;