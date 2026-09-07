import React from "react";


const DataViewToggle = ({
  view,
  onChange
}) => {


  return (

    <div
      className="
        flex
        border
        rounded-lg
        overflow-hidden
      "
    >


      <button

        onClick={() => onChange("table")}

        className={`
          px-4
          py-2
          text-sm
          ${
            view === "table"
            ?
            "bg-blue-600 text-white"
            :
            "bg-white text-gray-700"
          }
        `}

      >

        Table

      </button>




      <button

        onClick={() => onChange("card")}

        className={`
          px-4
          py-2
          text-sm
          ${
            view === "card"
            ?
            "bg-blue-600 text-white"
            :
            "bg-white text-gray-700"
          }
        `}

      >

        Cards

      </button>



    </div>

  );

};


export default DataViewToggle;