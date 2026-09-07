import React from "react";


const Avatar = ({
  image,
  name = "User",
  size = "md"
}) => {


  const sizes = {


    sm:
      "w-8 h-8 text-sm",


    md:
      "w-10 h-10 text-base",


    lg:
      "w-16 h-16 text-xl"


  };



  const getInitials = () => {


    const words =
      name.trim().split(" ");



    if (words.length === 1) {

      return words[0]
        .charAt(0)
        .toUpperCase();

    }



    return (
      words[0].charAt(0) +
      words[1].charAt(0)
    ).toUpperCase();


  };



  return (

    <div

      className={`
        ${sizes[size]}
        rounded-full
        overflow-hidden
        flex
        items-center
        justify-center
        bg-blue-600
        text-white
        font-semibold
      `}

    >


      {
        image ? (

          <img

            src={image}

            alt={name}

            className="
              w-full
              h-full
              object-cover
            "

          />

        ) : (

          <span>

            {getInitials()}

          </span>

        )
      }



    </div>

  );

};


export default Avatar;