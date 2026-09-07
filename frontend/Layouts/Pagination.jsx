import React from "react";


const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) => {


  const goPrevious = () => {

    if (currentPage > 1) {

      onPageChange(
        currentPage - 1
      );

    }

  };



  const goNext = () => {

    if (currentPage < totalPages) {

      onPageChange(
        currentPage + 1
      );

    }

  };



  return (

    <div
      className="
        flex
        items-center
        justify-center
        gap-4
        mt-6
      "
    >


      <button

        onClick={goPrevious}

        disabled={currentPage === 1}

        className="
          px-4
          py-2
          rounded-lg
          border
          disabled:opacity-50
        "

      >

        Previous

      </button>



      <span
        className="
          text-gray-700
          font-medium
        "
      >

        Page {currentPage} of {totalPages}

      </span>



      <button

        onClick={goNext}

        disabled={currentPage === totalPages}

        className="
          px-4
          py-2
          rounded-lg
          border
          disabled:opacity-50
        "

      >

        Next

      </button>



    </div>

  );

};


export default Pagination;