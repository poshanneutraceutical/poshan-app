import React from "react";
import { useNavigate } from "react-router-dom";


const PermissionDenied = ({
  message = "You do not have permission to access this page."
}) => {


  const navigate = useNavigate();



  return (

    <div
      className="
        min-h-[400px]
        flex
        flex-col
        justify-center
        items-center
        text-center
        bg-white
        rounded-lg
        shadow
        p-8
      "
    >


      <div
        className="
          text-5xl
          mb-4
        "
      >

        🔒

      </div>



      <h1
        className="
          text-2xl
          font-bold
          text-gray-800
        "
      >

        Access Denied

      </h1>



      <p
        className="
          text-gray-500
          mt-3
          max-w-md
        "
      >

        {message}

      </p>



      <button

        onClick={() =>
          navigate("/dashboard")
        }

        className="
          mt-6
          bg-blue-600
          text-white
          px-5
          py-2
          rounded-lg
          hover:bg-blue-700
        "

      >

        Go To Dashboard

      </button>



    </div>

  );

};


export default PermissionDenied;