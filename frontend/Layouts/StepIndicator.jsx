import React from "react";


const StepIndicator = ({
  steps = [],
  currentStep = 0
}) => {


  return (

    <div
      className="
        flex
        items-center
        justify-between
        w-full
      "
    >


      {
        steps.map((step, index) => (

          <React.Fragment key={index}>


            <div
              className="
                flex
                flex-col
                items-center
              "
            >


              <div

                className={`
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-semibold
                  ${
                    index <= currentStep
                    ?
                    "bg-blue-600 text-white"
                    :
                    "bg-gray-200 text-gray-600"
                  }
                `}

              >

                {index + 1}

              </div>



              <span
                className="
                  mt-2
                  text-sm
                  text-gray-600
                "
              >

                {step}

              </span>



            </div>




            {
              index !== steps.length - 1 && (

                <div
                  className={`
                    flex-1
                    h-1
                    mx-3
                    ${
                      index < currentStep
                      ?
                      "bg-blue-600"
                      :
                      "bg-gray-200"
                    }
                  `}
                >
                </div>

              )
            }



          </React.Fragment>

        ))
      }



    </div>

  );

};


export default StepIndicator;