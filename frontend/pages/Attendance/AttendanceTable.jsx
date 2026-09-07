const AttendanceTable = ({
    attendanceHistory = []
}) => {


    /*
     =========================================================
     FORMAT DATE/TIME
     =========================================================
     */

    const formatDateTime = (
        value
    ) => {

        if (!value) {

            return "-";

        }


        const date =
            new Date(value);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return "-";

        }


        return date.toLocaleString();

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


        const date =
            new Date(
                `${value}T00:00:00`
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return value;

        }


        return date.toLocaleDateString();

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

                        <th>
                            IP Address
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
                                        colSpan="5"
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


                                        {/* IP ADDRESS */}

                                        <td>

                                            {
                                                attendance.ipAddress ||
                                                "-"
                                            }

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