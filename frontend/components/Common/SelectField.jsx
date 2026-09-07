import React from "react";


const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
  disabled = false,
  placeholder = "Select option"
}) => {


  return (

    <div
      className="
        mb-4
      "
    >


      {
        label && (

          <label

            htmlFor={name}

            className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
            "

          >

            {label}

            {
              required && (

                <span
                  className="
                    text-red-600
                  "
                >

                  *

                </span>

              )
            }

          </label>

        )
      }



      <select

        id={name}

        name={name}

        value={value}

        onChange={onChange}

        disabled={disabled}

        className={`
          w-full
          px-4
          py-2
          border
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          disabled:bg-gray-100
          ${
            error
            ?
            "border-red-500"
            :
            "border-gray-300"
          }
        `}

      >


        <option value="">

          {placeholder}

        </option>



        {
          options.map((option, index) => (

            <option

              key={index}

              value={option.value}

            >

              {option.label}

            </option>

          ))
        }



      </select>



      {
        error && (

          <p
            className="
              text-red-600
              text-sm
              mt-1
            "
          >

            {error}

          </p>

        )
      }



    </div>

  );

};


export default SelectField;