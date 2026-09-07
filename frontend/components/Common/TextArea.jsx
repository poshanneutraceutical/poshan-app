import React from "react";


const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  required = false,
  error,
  disabled = false
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




      <textarea

        id={name}

        name={name}

        value={value}

        onChange={onChange}

        placeholder={placeholder}

        rows={rows}

        disabled={disabled}

        className={`
          w-full
          px-4
          py-2
          border
          rounded-lg
          resize-none
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

      />



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


export default TextArea;