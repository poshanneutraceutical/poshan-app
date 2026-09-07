import React from "react";


const FilterPanel = ({
  children,
  onApply,
  onReset
}) => {


  return (

    <div
      className="
        bg-white
        rounded-lg
        shadow
        p-5
        mb-6
      "
    >


      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
        "
      >

        {children}

      </div>




      <div
        className="
          flex
          justify-end
          gap-3
          mt-5
        "
      >


        <button

          onClick={onReset}

          className="
            px-4
            py-2
            border
            rounded-lg
            hover:bg-gray-100
          "

        >

          Reset

        </button>



        <button

          onClick={onApply}

          className="
            px-4
            py-2
            bg-blue-600
            text-white
            rounded-lg
            hover:bg-blue-700
          "

        >

          Apply Filter

        </button>


      </div>


    </div>

  );

};


export default FilterPanel;