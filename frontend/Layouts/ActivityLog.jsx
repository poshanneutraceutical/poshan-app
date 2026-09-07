import React from "react";


const ActivityLog = ({
  activities = []
}) => {


  return (

    <div
      className="
        bg-white
        rounded-lg
        shadow
        p-5
      "
    >


      <h2
        className="
          text-lg
          font-semibold
          text-gray-800
          mb-5
        "
      >

        Activity Log

      </h2>




      {
        activities.length === 0 ? (

          <p
            className="
              text-gray-500
              text-center
              py-5
            "
          >

            No activities found

          </p>


        ) : (


          <div
            className="
              space-y-4
            "
          >

            {
              activities.map((activity, index) => (

                <div

                  key={index}

                  className="
                    border-b
                    pb-3
                    last:border-none
                  "

                >


                  <p
                    className="
                      text-gray-700
                    "
                  >

                    <span
                      className="
                        font-semibold
                      "
                    >

                      {activity.user || "System"}

                    </span>

                    {" "}

                    {activity.action}

                  </p>



                  {
                    activity.time && (

                      <p
                        className="
                          text-xs
                          text-gray-400
                          mt-1
                        "
                      >

                        {activity.time}

                      </p>

                    )
                  }


                </div>

              ))
            }


          </div>


        )
      }



    </div>

  );

};


export default ActivityLog;