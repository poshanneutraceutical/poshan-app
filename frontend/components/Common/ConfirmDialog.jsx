import React from "react";
import Button from "./Button";


const ConfirmDialog = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}) => {


  if (!isOpen) {
    return null;
  }



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
        className="
          bg-white
          rounded-lg
          shadow-xl
          p-6
          w-full
          max-w-md
        "
      >


        <h2
          className="
            text-xl
            font-semibold
            text-gray-800
          "
        >

          {title}

        </h2>



        <p
          className="
            text-gray-600
            mt-3
          "
        >

          {message}

        </p>




        <div
          className="
            flex
            justify-end
            gap-3
            mt-6
          "
        >


          <Button

            variant="secondary"

            onClick={onCancel}

          >

            {cancelText}

          </Button>




          <Button

            variant="danger"

            onClick={onConfirm}

          >

            {confirmText}

          </Button>



        </div>


      </div>


    </div>

  );

};


export default ConfirmDialog;