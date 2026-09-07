import React from "react";


const Modal = ({
  isOpen,
  title,
  children,
  footer,
  onClose,
  size = "md"
}) => {


  if (!isOpen) {

    return null;

  }



  const sizes = {


    sm:
      "max-w-sm",


    md:
      "max-w-lg",


    lg:
      "max-w-3xl",


    xl:
      "max-w-5xl"


  };



  return (

    <div
      className="
        fixed
        inset-0
        bg-black
        bg-opacity-40
        flex
        items-center
        justify-center
        z-50
      "
    >



      <div

        className={`
          bg-white
          rounded-lg
          shadow-xl
          w-full
          ${sizes[size]}
        `}

      >


        <div
          className="
            flex
            justify-between
            items-center
            border-b
            px-6
            py-4
          "
        >


          <h2
            className="
              text-lg
              font-semibold
              text-gray-800
            "
          >

            {title}

          </h2>



          <button

            onClick={onClose}

            className="
              text-gray-500
              hover:text-gray-800
              text-xl
            "

          >

            ×

          </button>



        </div>




        <div
          className="
            p-6
          "
        >

          {children}

        </div>




        {
          footer && (

            <div
              className="
                border-t
                px-6
                py-4
                flex
                justify-end
                gap-3
              "
            >

              {footer}

            </div>

          )
        }



      </div>


    </div>

  );

};


export default Modal;

