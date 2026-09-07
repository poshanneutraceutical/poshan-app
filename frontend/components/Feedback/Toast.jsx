import React, { useEffect } from "react";


const Toast = ({
  message,
  type = "success",
  duration = 3000,
  onClose
}) => {


  useEffect(() => {


    const timer =
      setTimeout(() => {

        onClose();

      }, duration);



    return () => {

      clearTimeout(timer);

    };


  }, [duration, onClose]);




  const styles = {


    success:
      "bg-green-600",


    error:
      "bg-red-600",


    warning:
      "bg-yellow-500",


    info:
      "bg-blue-600"


  };




  return (

    <div
      className={`
        fixed
        top-5
        right-5
        text-white
        px-5
        py-3
        rounded-lg
        shadow-lg
        z-50
        ${styles[type]}
      `}
    >


      <div
        className="
          flex
          items-center
          gap-4
        "
      >


        <span>

          {message}

        </span>



        <button

          onClick={onClose}

          className="
            font-bold
          "

        >

          ×

        </button>



      </div>


    </div>

  );

};


export default Toast;