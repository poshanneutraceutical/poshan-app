import React from "react";


const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  loading = false,
  className = ""
}) => {


  const variants = {


    primary:
      "bg-blue-600 text-white hover:bg-blue-700",


    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300",


    success:
      "bg-green-600 text-white hover:bg-green-700",


    danger:
      "bg-red-600 text-white hover:bg-red-700",


    warning:
      "bg-yellow-500 text-white hover:bg-yellow-600"


  };



  const sizes = {


    sm:
      "px-3 py-1 text-sm",


    md:
      "px-4 py-2",


    lg:
      "px-6 py-3 text-lg"


  };



  return (

    <button

      type={type}

      onClick={onClick}

      disabled={disabled || loading}

      className={`
        rounded-lg
        font-medium
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}

    >

      {
        loading
        ?
        "Loading..."
        :
        children
      }


    </button>

  );

};


export default Button;