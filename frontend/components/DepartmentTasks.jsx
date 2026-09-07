import React, {
    useEffect,
    useState
} from "react";

import {
    Eye,
    ClipboardList,
    RefreshCcw
} from "lucide-react";

import {
    useNavigate
} from "react-router-dom";

import {
    getTasksByDepartment
} from "../services/TaskService";

import "./DepartmentTasks.css";


/*
=========================================================
DEPARTMENT TASKS

Reusable component for:

WEB_DEVELOPMENT
DESIGN
MARKETING
and future departments.
=========================================================
*/

const DepartmentTasks = ({
    department,
    title = "Assigned Tasks"
}) => {

    const navigate = useNavigate();


    /*
    =====================================================
    STATE
    =====================================================
    */

    const [
        tasks,
        setTasks
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    /*
    =====================================================
    LOAD TASKS
    =====================================================
    */

    useEffect(() => {

        if (!department) {

            setTasks([]);

            setLoading(false);

            return;

        }


        loadTasks();

    }, [department]);


    const loadTasks = async () => {

        try {

            setLoading(true);

            setError("");


            /*
             * The department value determines
             * which tasks are loaded.
             *
             * Examples:
             *
             * WEB_DEVELOPMENT
             * DESIGN
             * MARKETING
             */

            const data =
                await getTasksByDepartment(
                    department
                );


            setTasks(
                Array.isArray(data)
                    ? data
                    : []
            );

        }
        catch (error) {

            console.error(
                `Failed to load tasks for department ${department}:`,
                error
            );


            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to load assigned tasks."
            );


            setTasks([]);

        }
        finally {

            setLoading(false);

        }

    };


    /*
    =====================================================
    STATUS CLASS
    =====================================================
    */

    const getStatusClass = (
        status
    ) => {

        switch (
            String(status || "")
                .toUpperCase()
                .replace(/\s+/g, "_")
        ) {

            case "PENDING":

                return "pending";


            case "IN_PROGRESS":

                return "in-progress";


            case "COMPLETE":

                return "complete";


            case "ON_HOLD":

                return "on-hold";


            case "CANCEL":

                return "cancel";


            case "DELIVERED":

                return "delivered";


            default:

                return "default";

        }

    };


    /*
    =====================================================
    PRIORITY CLASS
    =====================================================
    */

    const getPriorityClass = (
        priority
    ) => {

        switch (
            String(priority || "")
                .toUpperCase()
        ) {

            case "LOW":

                return "low";


            case "MEDIUM":

                return "medium";


            case "HIGH":

                return "high";


            case "URGENT":

                return "urgent";


            default:

                return "default";

        }

    };


    /*
    =====================================================
    DATE FORMAT
    =====================================================
    */

    const formatDate = (
        date
    ) => {

        if (!date) {

            return "-";

        }


        const parsedDate =
            new Date(date);


        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            return "-";

        }


        return parsedDate.toLocaleString();

    };


    /*
    =====================================================
    VIEW TASK

    Opens the SAME centralized task record.
    =====================================================
    */

    const handleViewTask = (
        taskId
    ) => {

        if (!taskId) {

            return;

        }


        navigate(
            `/tasks/${taskId}`
        );

    };


    /*
    =====================================================
    LOADING
    =====================================================
    */

    if (loading) {

        return (

            <section className="department-tasks-section">

                <div className="department-tasks-header">

                    <div className="department-tasks-title">

                        <ClipboardList
                            size={21}
                        />

                        <div>

                            <h2>
                                {title}
                            </h2>

                            <p>
                                Tasks assigned to this department
                            </p>

                        </div>

                    </div>

                </div>


                <div className="department-tasks-empty">

                    <div className="department-tasks-loading-icon">

                        <RefreshCcw
                            size={28}
                        />

                    </div>


                    <h3>
                        Loading Tasks...
                    </h3>


                    <p>
                        Fetching tasks assigned to this department.
                    </p>

                </div>

            </section>

        );

    }


    /*
    =====================================================
    MAIN UI
    =====================================================
    */

    return (

        <section className="department-tasks-section">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="department-tasks-header">


                <div className="department-tasks-title">

                    <ClipboardList
                        size={21}
                    />


                    <div>

                        <h2>
                            {title}
                        </h2>


                        <p>
                            Tasks assigned to this department
                        </p>

                    </div>

                </div>


                <button
                    type="button"
                    className="department-tasks-refresh"
                    onClick={loadTasks}
                    disabled={loading}
                    title="Refresh tasks"
                >

                    <RefreshCcw
                        size={17}
                    />

                    Refresh

                </button>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {
                error && (

                    <div className="department-tasks-error">

                        {error}

                    </div>

                )
            }


            {/* =================================================
                EMPTY
            ================================================= */}

            {
                !error &&
                tasks.length === 0
                    ? (

                        <div className="department-tasks-empty">

                            <ClipboardList
                                size={40}
                            />


                            <h3>
                                No Assigned Tasks
                            </h3>


                            <p>
                                Tasks assigned to this department
                                will appear here.
                            </p>

                        </div>

                    )
                    : !error && (

                        <div className="department-tasks-table-wrapper">

                            <table className="department-tasks-table">

                                <thead>

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            Task
                                        </th>

                                        <th>
                                            Assigned To
                                        </th>

                                        <th>
                                            Priority
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Due Date
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {
                                        tasks.map(
                                            task => (

                                                <tr
                                                    key={
                                                        task.id
                                                    }
                                                >

                                                    {/* =================================================
                                                        ID
                                                    ================================================= */}

                                                    <td>

                                                        #
                                                        {task.id}

                                                    </td>


                                                    {/* =================================================
                                                        TITLE
                                                    ================================================= */}

                                                    <td>

                                                        <strong>

                                                            {
                                                                task.title ||
                                                                "-"
                                                            }

                                                        </strong>

                                                    </td>


                                                    {/* =================================================
                                                        ASSIGNED TO
                                                    ================================================= */}

                                                    <td>

                                                        {
                                                            task.assignedTo ||
                                                            "-"
                                                        }

                                                    </td>


                                                    {/* =================================================
                                                        PRIORITY
                                                    ================================================= */}

                                                    <td>

                                                        {
                                                            task.priority

                                                                ?

                                                                (

                                                                    <span
                                                                        className={
                                                                            `department-task-priority ${getPriorityClass(
                                                                                task.priority
                                                                            )}`
                                                                        }
                                                                    >

                                                                        {
                                                                            task.priority
                                                                        }

                                                                    </span>

                                                                )

                                                                :

                                                                "-"
                                                        }

                                                    </td>


                                                    {/* =================================================
                                                        STATUS
                                                    ================================================= */}

                                                    <td>

                                                        {
                                                            task.status

                                                                ?

                                                                (

                                                                    <span
                                                                        className={
                                                                            `department-task-status ${getStatusClass(
                                                                                task.status
                                                                            )}`
                                                                        }
                                                                    >

                                                                        {
                                                                            task.status
                                                                        }

                                                                    </span>

                                                                )

                                                                :

                                                                "-"
                                                        }

                                                    </td>


                                                    {/* =================================================
                                                        DUE DATE
                                                    ================================================= */}

                                                    <td>

                                                        {
                                                            formatDate(
                                                                task.dueDate
                                                            )
                                                        }

                                                    </td>


                                                    {/* =================================================
                                                        ACTION
                                                    ================================================= */}

                                                    <td>

                                                        <button
                                                            type="button"
                                                            className="department-task-view-btn"
                                                            onClick={() =>
                                                                handleViewTask(
                                                                    task.id
                                                                )
                                                            }
                                                            title="View Task"
                                                            disabled={!task.id}
                                                        >

                                                            <Eye
                                                                size={16}
                                                            />

                                                            View Task

                                                        </button>

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

        </section>

    );

};


export default DepartmentTasks;