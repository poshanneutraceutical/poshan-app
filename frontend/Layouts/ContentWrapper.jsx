import React from "react";


const ContentWrapper = ({
  children
}) => {


  return (

    <main
      className="
        flex-1
        bg-gray-100
        min-h-screen
        p-6
      "
    >


      <div
        className="
          max-w-7xl
          mx-auto
        "
      >


        {children}


      </div>


    </main>

  );

};


export default ContentWrapper;