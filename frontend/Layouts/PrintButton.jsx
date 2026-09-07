import React from "react";


const PrintButton = ({
  targetId,
  label = "Print"
}) => {


  const handlePrint = () => {


    const printContent =
      document.getElementById(targetId);



    if (!printContent) {

      console.error(
        "Print target not found"
      );

      return;

    }



    const originalContent =
      document.body.innerHTML;



    document.body.innerHTML =
      printContent.outerHTML;



    window.print();



    document.body.innerHTML =
      originalContent;



    window.location.reload();


  };



  return (

    <button

      onClick={handlePrint}

      className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-blue-700
      "

    >

      {label}

    </button>

  );

};


export default PrintButton;