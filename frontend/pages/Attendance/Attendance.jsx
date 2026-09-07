import {
    useEffect,
    useState
} from "react";

import AttendanceService
    from "../../services/AttendanceService";

import AttendanceButtons
    from "./AttendanceButtons";

import AttendanceTable
    from "./AttendanceTable";

import "./Attendance.css";


const Attendance = () => {

    const [
        todayAttendance,
        setTodayAttendance
    ] = useState(null);


    const [
        attendanceHistory,
        setAttendanceHistory
    ] = useState([]);


    const [
        employeeError,
        setEmployeeError
    ] = useState("");


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        actionLoading,
        setActionLoading
    ] = useState(false);


    /*
     =========================================================
     LOAD ATTENDANCE
     =========================================================
     */

    useEffect(() => {

        loadAttendance();

    }, []);


    const loadAttendance = async () => {

        try {

            setLoading(true);

            setEmployeeError("");


            /*
             =====================================================
             CHECK EMPLOYEE ACCESS
             =====================================================
             */

            const accessResponse =
                await AttendanceService
                    .checkAttendanceAccess();


            if (
                !accessResponse?.data?.employeeExists
            ) {

                setEmployeeError(
                    accessResponse?.data?.message ||
                    "Attendance is available only for employee accounts."
                );


                setTodayAttendance(null);

                setAttendanceHistory([]);

                return;

            }


            /*
             =====================================================
             LOAD TODAY'S ATTENDANCE
             =====================================================
             */

            try {

                const todayResponse =
                    await AttendanceService
                        .getTodayAttendance();


                setTodayAttendance(
                    todayResponse.data
                );

            }
            catch (todayError) {

                /*
                 * No attendance for today is normal.
                 */

                setTodayAttendance(null);

            }


            /*
             =====================================================
             LOAD HISTORY
             =====================================================
             */

            const historyResponse =
                await AttendanceService
                    .getAttendanceHistory();


            setAttendanceHistory(
                Array.isArray(
                    historyResponse?.data
                )
                    ? historyResponse.data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Attendance Error:",
                error
            );


            setEmployeeError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to load attendance."
            );

        }
        finally {

            setLoading(false);

        }

    };


    /*
     =========================================================
     CHECK IN
     =========================================================
     */

    const handleCheckIn = async () => {

        try {

            setActionLoading(true);


            await AttendanceService.checkIn();


            alert(
                "Check In Successful"
            );


            await loadAttendance();

        }
        catch (error) {

            console.error(
                "Check In Error:",
                error
            );


            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to Check In";


            alert(message);

        }
        finally {

            setActionLoading(false);

        }

    };


    /*
     =========================================================
     CHECK OUT
     =========================================================
     */

    const handleCheckOut = async () => {

        try {

            setActionLoading(true);


            await AttendanceService.checkOut();


            alert(
                "Check Out Successful"
            );


            await loadAttendance();

        }
        catch (error) {

            console.error(
                "Check Out Error:",
                error
            );


            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to Check Out";


            alert(message);

        }
        finally {

            setActionLoading(false);

        }

    };


    /*
     =========================================================
     LOADING
     =========================================================
     */

    if (loading) {

        return (

            <div className="attendance-loading">

                Loading Attendance...

            </div>

        );

    }


    /*
     =========================================================
     EMPLOYEE ACCESS ERROR
     =========================================================
     */

    if (employeeError) {

        return (

            <div className="attendance-page">

                <div className="attendance-message-card">

                    <div className="message-icon">

                        👤

                    </div>


                    <h2>

                        Employee Attendance

                    </h2>


                    <p>

                        {employeeError}

                    </p>


                    <small>

                        This feature is available only for users
                        who have an Employee Profile linked to
                        their account.

                    </small>

                </div>

            </div>

        );

    }


    /*
     =========================================================
     PAGE
     =========================================================
     */

    return (

        <div className="attendance-page">


            {/* =================================================
                PAGE TITLE
            ================================================= */}

            <h1 className="page-title">

                Employee Attendance

            </h1>


            {/* =================================================
                CHECK IN / CHECK OUT
            ================================================= */}

            <AttendanceButtons

                todayAttendance={
                    todayAttendance
                }

                onCheckIn={
                    handleCheckIn
                }

                onCheckOut={
                    handleCheckOut
                }

                loading={
                    actionLoading
                }

            />


            {/* =================================================
                TODAY'S ATTENDANCE
            ================================================= */}

            <div className="attendance-card">

                <h2>

                    Today's Attendance

                </h2>


                <p>

                    <strong>
                        Status :
                    </strong>{" "}

                    {
                        todayAttendance?.status ||
                        "Not Marked"
                    }

                </p>


                <p>

                    <strong>
                        Check In :
                    </strong>{" "}

                    {
                        todayAttendance?.checkIn

                            ?

                            new Date(
                                todayAttendance.checkIn
                            ).toLocaleString()

                            :

                            "-"
                    }

                </p>


                <p>

                    <strong>
                        Check Out :
                    </strong>{" "}

                    {
                        todayAttendance?.checkOut

                            ?

                            new Date(
                                todayAttendance.checkOut
                            ).toLocaleString()

                            :

                            "-"
                    }

                </p>


                <p>

                    <strong>
                        IP Address :
                    </strong>{" "}

                    {
                        todayAttendance?.ipAddress ||
                        "-"
                    }

                </p>

            </div>


            {/* =================================================
                HISTORY
            ================================================= */}

            <AttendanceTable

                attendanceHistory={
                    attendanceHistory
                }

            />

        </div>

    );

};


export default Attendance;