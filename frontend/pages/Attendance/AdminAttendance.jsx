import {
    useEffect,
    useMemo,
    useState
} from "react";

import AttendanceService
    from "../../services/AttendanceService";

import "./AdminAttendance.css";


const AdminAttendance = () => {


    const [
        allAttendance,
        setAllAttendance
    ] = useState([]);


    const [
        selectedEmployeeId,
        setSelectedEmployeeId
    ] = useState("");


    const [
        selectedYear,
        setSelectedYear
    ] = useState(
        String(
            new Date().getFullYear()
        )
    );


    const [
        selectedMonth,
        setSelectedMonth
    ] = useState(
        String(
            new Date().getMonth() + 1
        )
    );


    const [
        attendance,
        setAttendance
    ] = useState([]);


    const [
        loadingEmployees,
        setLoadingEmployees
    ] = useState(true);


    const [
        loadingAttendance,
        setLoadingAttendance
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    /*
     =========================================================
     LOAD EMPLOYEES FROM ATTENDANCE RECORDS

     Using all attendance records lets us populate the
     employee selector without requiring another backend
     employee-list endpoint.
     =========================================================
     */

    useEffect(() => {

        loadEmployees();

    }, []);


    const loadEmployees = async () => {

        try {

            setLoadingEmployees(true);

            setError("");


            const response =
                await AttendanceService
                    .getAllAttendance();


            const records =
                Array.isArray(
                    response?.data
                )
                    ? response.data
                    : [];


            setAllAttendance(
                records
            );


            /*
             * Automatically select the first employee
             * if one exists.
             */

            const uniqueEmployees =
                new Map();


            records.forEach(
                record => {

                    if (
                        record?.employeeId
                    ) {

                        uniqueEmployees.set(
                            String(
                                record.employeeId
                            ),
                            {
                                id:
                                    record.employeeId,

                                code:
                                    record.employeeCode,

                                name:
                                    record.employeeName
                            }
                        );

                    }

                }
            );


            if (
                uniqueEmployees.size > 0
            ) {

                const firstEmployee =
                    Array.from(
                        uniqueEmployees.values()
                    )[0];


                setSelectedEmployeeId(
                    String(
                        firstEmployee.id
                    )
                );

            }

        }
        catch (err) {

            console.error(
                "Unable to load attendance employees:",
                err
            );


            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to load employee attendance."
            );

        }
        finally {

            setLoadingEmployees(false);

        }

    };


    /*
     =========================================================
     EMPLOYEE OPTIONS
     =========================================================
     */

    const employeeOptions =
        useMemo(() => {

            const uniqueEmployees =
                new Map();


            allAttendance.forEach(
                record => {

                    if (
                        record?.employeeId
                    ) {

                        uniqueEmployees.set(
                            String(
                                record.employeeId
                            ),
                            {
                                id:
                                    record.employeeId,

                                code:
                                    record.employeeCode,

                                name:
                                    record.employeeName
                            }
                        );

                    }

                }
            );


            return Array
                .from(
                    uniqueEmployees.values()
                )
                .sort(
                    (a, b) =>
                        String(
                            a.name || ""
                        ).localeCompare(
                            String(
                                b.name || ""
                            )
                        )
                );

        }, [allAttendance]);


    /*
     =========================================================
     YEAR OPTIONS
     =========================================================
     */

    const yearOptions = useMemo(() => {

        const currentYear =
            new Date().getFullYear();


        return Array.from(
            {
                length: 6
            },
            (_, index) =>
                currentYear - index
        );

    }, []);


    /*
     =========================================================
     MONTHS
     =========================================================
     */

    const months = [
        {
            value: "1",
            label: "January"
        },
        {
            value: "2",
            label: "February"
        },
        {
            value: "3",
            label: "March"
        },
        {
            value: "4",
            label: "April"
        },
        {
            value: "5",
            label: "May"
        },
        {
            value: "6",
            label: "June"
        },
        {
            value: "7",
            label: "July"
        },
        {
            value: "8",
            label: "August"
        },
        {
            value: "9",
            label: "September"
        },
        {
            value: "10",
            label: "October"
        },
        {
            value: "11",
            label: "November"
        },
        {
            value: "12",
            label: "December"
        }
    ];


    /*
     =========================================================
     LOAD SELECTED EMPLOYEE MONTH
     =========================================================
     */

    const loadMonthlyAttendance = async () => {

        if (
            !selectedEmployeeId
        ) {

            setAttendance([]);

            return;

        }


        try {

            setLoadingAttendance(true);

            setError("");


            const response =
                await AttendanceService
                    .getEmployeeAttendanceByMonth(
                        selectedEmployeeId,
                        Number(
                            selectedYear
                        ),
                        Number(
                            selectedMonth
                        )
                    );


            setAttendance(
                Array.isArray(
                    response?.data
                )
                    ? response.data
                    : []
            );

        }
        catch (err) {

            console.error(
                "Unable to load monthly attendance:",
                err
            );


            setAttendance([]);


            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to load selected employee attendance."
            );

        }
        finally {

            setLoadingAttendance(false);

        }

    };


    /*
     =========================================================
     AUTOMATICALLY LOAD WHEN SELECTION CHANGES
     =========================================================
     */

    useEffect(() => {

        if (
            selectedEmployeeId
        ) {

            loadMonthlyAttendance();

        }

    }, [
        selectedEmployeeId,
        selectedYear,
        selectedMonth
    ]);


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
     FORMAT DATE TIME
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
     SELECTED EMPLOYEE
     =========================================================
     */

    const selectedEmployee =
        employeeOptions.find(
            employee =>
                String(
                    employee.id
                ) ===
                String(
                    selectedEmployeeId
                )
        );


    /*
     =========================================================
     SUMMARY
     =========================================================
     */

    const presentCount =
        attendance.filter(
            item =>
                item.status ===
                "PRESENT"
        ).length;


    const absentCount =
        attendance.filter(
            item =>
                item.status ===
                "ABSENT"
        ).length;


    const halfDayCount =
        attendance.filter(
            item =>
                item.status ===
                "HALF_DAY"
        ).length;


    /*
     =========================================================
     LOADING EMPLOYEES
     =========================================================
     */

    if (
        loadingEmployees
    ) {

        return (

            <div className="admin-attendance-page">

                <div className="admin-attendance-loading">

                    Loading Employee Attendance...

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

        <div className="admin-attendance-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="admin-attendance-header">

                <div>

                    <h1>

                        Attendance Management

                    </h1>


                    <p>

                        View employee attendance
                        month by month

                    </p>

                </div>

            </div>


            {/* =================================================
                FILTER CARD
            ================================================= */}

            <div className="admin-attendance-filter-card">


                <div className="admin-attendance-field">

                    <label>

                        Employee

                    </label>


                    <select
                        value={
                            selectedEmployeeId
                        }
                        onChange={
                            event =>
                                setSelectedEmployeeId(
                                    event.target.value
                                )
                        }
                    >

                        <option value="">

                            Select Employee

                        </option>


                        {
                            employeeOptions.map(
                                employee => (

                                    <option
                                        key={
                                            employee.id
                                        }
                                        value={
                                            employee.id
                                        }
                                    >

                                        {
                                            employee.name ||
                                            "Unnamed Employee"
                                        }

                                        {
                                            employee.code
                                                ? ` (${employee.code})`
                                                : ""
                                        }

                                    </option>

                                )
                            )
                        }

                    </select>

                </div>


                <div className="admin-attendance-field">

                    <label>

                        Year

                    </label>


                    <select
                        value={
                            selectedYear
                        }
                        onChange={
                            event =>
                                setSelectedYear(
                                    event.target.value
                                )
                        }
                    >

                        {
                            yearOptions.map(
                                year => (

                                    <option
                                        key={year}
                                        value={year}
                                    >

                                        {year}

                                    </option>

                                )
                            )
                        }

                    </select>

                </div>


                <div className="admin-attendance-field">

                    <label>

                        Month

                    </label>


                    <select
                        value={
                            selectedMonth
                        }
                        onChange={
                            event =>
                                setSelectedMonth(
                                    event.target.value
                                )
                        }
                    >

                        {
                            months.map(
                                month => (

                                    <option
                                        key={
                                            month.value
                                        }
                                        value={
                                            month.value
                                        }
                                    >

                                        {
                                            month.label
                                        }

                                    </option>

                                )
                            )
                        }

                    </select>

                </div>


                <button
                    type="button"
                    className="admin-attendance-refresh"
                    onClick={
                        loadMonthlyAttendance
                    }
                    disabled={
                        loadingAttendance ||
                        !selectedEmployeeId
                    }
                >

                    {
                        loadingAttendance
                            ? "Loading..."
                            : "Refresh"
                    }

                </button>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {
                error && (

                    <div className="admin-attendance-error">

                        {error}

                    </div>

                )
            }


            {/* =================================================
                SELECTED EMPLOYEE SUMMARY
            ================================================= */}

            {
                selectedEmployee && (

                    <div className="admin-attendance-employee-card">

                        <div>

                            <span>
                                Employee
                            </span>

                            <strong>
                                {
                                    selectedEmployee.name ||
                                    "-"
                                }
                            </strong>

                        </div>


                        <div>

                            <span>
                                Employee Code
                            </span>

                            <strong>
                                {
                                    selectedEmployee.code ||
                                    "-"
                                }
                            </strong>

                        </div>


                        <div>

                            <span>
                                Period
                            </span>

                            <strong>
                                {
                                    months.find(
                                        month =>
                                            month.value ===
                                            selectedMonth
                                    )?.label
                                }{" "}
                                {selectedYear}
                            </strong>

                        </div>

                    </div>

                )
            }


            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            {
                selectedEmployee && (

                    <div className="admin-attendance-summary">

                        <div className="attendance-summary-card">

                            <span>
                                Present
                            </span>

                            <strong>
                                {presentCount}
                            </strong>

                        </div>


                        <div className="attendance-summary-card">

                            <span>
                                Absent
                            </span>

                            <strong>
                                {absentCount}
                            </strong>

                        </div>


                        <div className="attendance-summary-card">

                            <span>
                                Half Day
                            </span>

                            <strong>
                                {halfDayCount}
                            </strong>

                        </div>


                        <div className="attendance-summary-card">

                            <span>
                                Records
                            </span>

                            <strong>
                                {attendance.length}
                            </strong>

                        </div>

                    </div>

                )
            }


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="admin-attendance-table-card">

                <div className="admin-attendance-table-header">

                    <div>

                        <h2>

                            Monthly Attendance

                        </h2>

                        <p>

                            {
                                selectedEmployee
                                    ? `${selectedEmployee.name || "Employee"} - ${
                                        months.find(
                                            month =>
                                                month.value ===
                                                selectedMonth
                                        )?.label
                                    } ${selectedYear}`
                                    : "Select an employee to view attendance."
                            }

                        </p>

                    </div>

                </div>


                {
                    loadingAttendance

                        ?

                        (

                            <div className="admin-attendance-empty">

                                Loading attendance...

                            </div>

                        )

                        :

                        !selectedEmployeeId

                            ?

                            (

                                <div className="admin-attendance-empty">

                                    Select an employee to
                                    view attendance.

                                </div>

                            )

                            :

                            attendance.length === 0

                                ?

                                (

                                    <div className="admin-attendance-empty">

                                        No attendance records
                                        found for this employee
                                        in the selected month.

                                    </div>

                                )

                                :

                                (

                                    <div className="admin-attendance-table-wrapper">

                                        <table className="admin-attendance-table">

                                            <thead>

                                                <tr>

                                                    <th>
                                                        Date
                                                    </th>

                                                    <th>
                                                        Employee
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
                                                    attendance.map(
                                                        record => (

                                                            <tr
                                                                key={
                                                                    record.id
                                                                }
                                                            >

                                                                <td>

                                                                    {
                                                                        formatDate(
                                                                            record.attendanceDate
                                                                        )
                                                                    }

                                                                </td>


                                                                <td>

                                                                    <strong>

                                                                        {
                                                                            record.employeeName ||
                                                                            "-"
                                                                        }

                                                                    </strong>

                                                                    <small>

                                                                        {
                                                                            record.employeeCode ||
                                                                            "-"
                                                                        }

                                                                    </small>

                                                                </td>


                                                                <td>

                                                                    {
                                                                        formatDateTime(
                                                                            record.checkIn
                                                                        )
                                                                    }

                                                                </td>


                                                                <td>

                                                                    {
                                                                        formatDateTime(
                                                                            record.checkOut
                                                                        )
                                                                    }

                                                                </td>


                                                                <td>

                                                                    <span
                                                                        className={
                                                                            `admin-attendance-status ${
                                                                                String(
                                                                                    record.status ||
                                                                                    ""
                                                                                )
                                                                                    .toLowerCase()
                                                                            }`
                                                                        }
                                                                    >

                                                                        {
                                                                            record.status ||
                                                                            "-"
                                                                        }

                                                                    </span>

                                                                </td>


                                                                <td>

                                                                    {
                                                                        record.ipAddress ||
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

                                )
                }

            </div>

        </div>

    );

};


export default AdminAttendance;