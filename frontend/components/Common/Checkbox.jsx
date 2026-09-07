import React from "react";


const Checkbox = ({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  error
}) => {


  return (

    <div
      className="
        mb-4
      "
    >


      <label
        className="
          flex
          items-center
          gap-2
          cursor-pointer
        "
      >


        <input

          type="checkbox"

          name={name}

          checked={checked}

          onChange={onChange}

          disabled={disabled}

          className="
            w-4
            h-4
          "

        />



        <span
          className="
            text-sm
            text-gray-700
          "
        >

          {label}

        </span>



      </label>



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


export default Checkbox;