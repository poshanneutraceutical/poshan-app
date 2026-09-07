import React from "react";
import Toast from "./Toast";


const ToastContainer = ({
  toasts = [],
  removeToast
}) => {


  return (

    <div
      className="
        fixed
        top-5
        right-5
        z-50
        space-y-3
      "
    >


      {
        toasts.map((toast) => (

          <Toast

            key={toast.id}

            message={toast.message}

            type={toast.type}

            onClose={() =>
              removeToast(toast.id)
            }

          />

        ))
      }



    </div>

  );

};


export default ToastContainer;