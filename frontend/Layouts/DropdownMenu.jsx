import React, { useEffect, useRef, useState } from "react";


const DropdownMenu = ({
  trigger,
  items = []
}) => {


  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);



  useEffect(() => {


    const handleClickOutside = (event) => {


      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {

        setOpen(false);

      }


    };



    document.addEventListener(
      "mousedown",
      handleClickOutside
    );



    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };


  }, []);




  return (

    <div
      ref={dropdownRef}
      className="relative"
    >


      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      >

        {trigger}

      </div>



      {
        open && (

          <div
            className="
              absolute
              right-0
              mt-2
              w-48
              bg-white
              rounded-lg
              shadow-lg
              border
              z-50
            "
          >


            {
              items.map((item, index) => (

                <button

                  key={index}

                  onClick={() => {

                    item.onClick();

                    setOpen(false);

                  }}

                  className="
                    w-full
                    text-left
                    px-4
                    py-2
                    hover:bg-gray-100
                    text-sm
                  "

                >

                  {item.label}

                </button>

              ))
            }



          </div>

        )
      }



    </div>

  );

};


export default DropdownMenu;