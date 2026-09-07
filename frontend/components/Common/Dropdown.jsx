import React from "react";


const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select"
}) => {


  return (

    <select

      value={value}

      onChange={onChange}

      className="
        px-4
        py-2
        border
        rounded-lg
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "

    >


      <option value="">

        {placeholder}

      </option>



      {
        options.map((option, index) => (

          <option

            key={index}

            value={option.value}

            disabled={option.disabled}

          >

            {option.label}

          </option>

        ))
      }



    </select>

  );

};


export default Dropdown;