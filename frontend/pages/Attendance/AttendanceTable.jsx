const AttendanceTable = ({
    attendanceHistory = []
}) => {


    /*
     =========================================================
     FORMAT DATE/TIME - INDIA TIME (ASIA/KOLKATA)
     =========================================================
     */

    const formatDateTime = (
        value
    ) => {

        if (!value) {

            return "-";

        }


        const rawValue =
            String(value);


        /*
         Backend LocalDateTime does not contain timezone.
         Treat it as India time before formatting.
        */

        const normalizedValue =
            rawValue.endsWith("Z") ||
            /[+-]\d\d:\d\d$/.test(rawValue)
                ? rawValue
                : `${rawValue}+05:30`;


        const date =
            new Date(
                normalizedValue
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return "-";

        }


        return new Intl.DateTimeFormat(
            "en-IN",
            {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }
        ).format(date);

    };


    /*
     =========================================================
     FORMAT DATE
     =========================================================
     */

    const formatDate = (
        value
    ) => {

        if (!value) {

            return "-";

        }


        const rawValue =
            String(value);


        const date =
            new Date(
                `${rawValue}T00:00:00+05:30`
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return value;

        }


        return new Intl.DateTimeFormat(
            "en-IN",
            {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        ).format(date);

    };


    /*
     =========================================================
     TABLE
     =========================================================
     */

    return (

        <div className="attendance-table-container">


            <h2 className="table-title">

                Attendance History

            </h2>


            <table className="attendance-table">


                <thead>

                    <tr>

                        <th>
                            Date
                        </th>

                        <th>
                            Check In
                        </th>

                        <th>
                            Check Out
                        </th>

                        <th>
                            Status
                        </th>

                    </tr>

                </thead>


                <tbody>


                    {
                        attendanceHistory.length === 0

                            ?

                            (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="no-data"
                                    >

                                        No Attendance Records Found

                                    </td>

                                </tr>

                            )

                            :

                            attendanceHistory.map(
                                attendance => (

                                    <tr
                                        key={
                                            attendance.id
                                        }
                                    >


                                        {/* DATE */}

                                        <td>

                                            {
                                                formatDate(
                                                    attendance.attendanceDate
                                                )
                                            }

                                        </td>


                                        {/* CHECK IN */}

                                        <td>

                                            {
                                                formatDateTime(
                                                    attendance.checkIn
                                                )
                                            }

                                        </td>


                                        {/* CHECK OUT */}

                                        <td>

                                            {
                                                formatDateTime(
                                                    attendance.checkOut
                                                )
                                            }

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={
                                                    `status ${
                                                        String(
                                                            attendance.status ||
                                                            ""
                                                        )
                                                            .toLowerCase()
                                                    }`
                                                }
                                            >

                                                {
                                                    attendance.status ||
                                                    "-"
                                                }

                                            </span>

                                        </td>


                                    </tr>

                                )
                            )

                    }

                </tbody>

            </table>

        </div>

    );

};


export default AttendanceTable;