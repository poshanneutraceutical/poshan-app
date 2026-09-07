import React from "react";


const RadioGroup = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error
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
            className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
            "
          >

            {label}

          </label>

        )
      }




      <div
        className="
          flex
          gap-6
        "
      >


        {
          options.map((option, index) => (

            <label

              key={index}

              className="
                flex
                items-center
                gap-2
                cursor-pointer
              "

            >


              <input

                type="radio"

                name={name}

                value={option.value}

                checked={
                  value === option.value
                }

                onChange={onChange}

              />



              <span
                className="
                  text-sm
                  text-gray-700
                "
              >

                {option.label}

              </span>



            </label>

          ))
        }



      </div>



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


export default RadioGroup;