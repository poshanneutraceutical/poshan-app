import React from "react";


const ActionMenu = ({
  actions = []
}) => {


  return (

    <div
      className="
        flex
        gap-2
      "
    >

      {
        actions.map((action, index) => (

          <button

            key={index}

            onClick={action.onClick}

            className={`
              px-3
              py-1
              rounded
              text-sm
              ${
                action.variant === "danger"
                ?
                "bg-red-600 text-white hover:bg-red-700"
                :
                "bg-blue-600 text-white hover:bg-blue-700"
              }
            `}

          >

            {action.label}

          </button>

        ))
      }


    </div>

  );

};


export default ActionMenu;