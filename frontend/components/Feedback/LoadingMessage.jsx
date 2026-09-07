import React from "react";
import Loader from "../Common/Loader";


const LoadingMessage = ({
  message = "Loading..."
}) => {


  return (

    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-10
      "
    >


      <Loader size="md" />



      <p
        className="
          mt-4
          text-gray-500
        "
      >

        {message}

      </p>



    </div>

  );

};


export default LoadingMessage;