import React from "react";


const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false
}) => {


  return (

    <div className="mb-4">


      <label
        className="block text-sm font-medium text-gray-700 mb-1"
      >

        {label}

      </label>



      <input

        type={type}

        name={name}

        value={value}

        onChange={onChange}

        placeholder={placeholder}

        required={required}

        disabled={disabled}

        className="
          w-full
          px-3
          py-2
          border
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          disabled:bg-gray-100
        "

      />


    </div>

  );

};


export default InputField;