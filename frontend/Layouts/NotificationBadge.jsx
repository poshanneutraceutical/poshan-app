import React from "react";


const NotificationBadge = ({
  count = 0,
  children,
  hideZero = true
}) => {


  return (

    <div
      className="
        relative
        inline-flex
      "
    >


      {children}



      {
        (!hideZero || count > 0) && (

          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-600
              text-white
              text-xs
              font-bold
              rounded-full
              min-w-[18px]
              h-[18px]
              flex
              items-center
              justify-center
              px-1
            "
          >

            {count}

          </span>

        )
      }



    </div>

  );

};


export default NotificationBadge;
