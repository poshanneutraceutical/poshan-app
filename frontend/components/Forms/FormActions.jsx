import React from "react";


const FormActions = ({
  children
}) => {


  return (

    <div
      className="
        flex
        justify-end
        gap-3
        mt-6
        pt-4
        border-t
      "
    >

      {children}

    </div>

  );

};


export default FormActions;