import React, {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    Pencil,
    ClipboardList,
    User,
    UserRound,
    Building2,
    Flag,
    Calendar,
    FileText,
    Clock
} from "lucide-react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getTaskById
} from "../../services/TaskService";

import "./Task.css";


const TaskDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [task, setTask] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        loadTask();

    }, [id]);


    const loadTask = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getTaskById(id);

            setTask(data);

        } catch (error) {

            console.error(
                "Error fetching task:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to load task details."
            );

        } finally {

            setLoading(false);

        }

    };


    const getStatusClass = (status) => {

        switch (status) {

            case "PENDING":
                return "task-status-pending";

            case "IN_PROGRESS":
                return "task-status-in-progress";

            case "COMPLETE":
                return "task-status-complete";

            case "ON_HOLD":
                return "task-status-on-hold";

            case "CANCEL":
                return "task-status-cancel";

            case "DELIVERED":
                return "task-status-delivered";

            default:
                return "task-status-default";

        }

    };


    const getPriorityClass = (priority) => {

        switch (priority) {

            case "LOW":
                return "task-priority-low";

            case "MEDIUM":
                return "task-priority-medium";

            case "HIGH":
                return "task-priority-high";

            case "URGENT":
                return "task-priority-urgent";

            default:
                return "task-priority-default";

        }

    };


    const formatDate = (date) => {

        if (!date) {

            return "-";

        }

        return String(date).replace("T", " ");

    };


    if (loading) {

        return (

            <div className="task-module">

                <div className="task-details-container">

                    <div className="task-loading">

                        Loading Task Details...

                    </div>

                </div>

            </div>

        );

    }


    if (error) {

        return (

            <div className="task-module">

                <div className="task-details-container">

                    <div className="task-form-card">

                        <div className="task-section-header">

                            <div className="task-section-icon">

                                <ClipboardList size={20} />

                            </div>

                            <div>

                                <h2>
                                    Task Details
                                </h2>

                                <p>
                                    Unable to load task information
                                </p>

                            </div>

                        </div>


                        <div className="task-error-message">

                            {error}

                        </div>


                        <button
                            type="button"
                            className="task-cancel-btn"
                            onClick={() =>
                                navigate("/tasks")
                            }
                        >

                            <ArrowLeft size={17} />

                            Back to Tasks

                        </button>

                    </div>

                </div>

            </div>

        );

    }


    if (!task) {

        return (

            <div className="task-module">

                <div className="task-details-container">

                    <div className="task-form-card">

                        <div className="task-section-header">

                            <div className="task-section-icon">

                                <ClipboardList size={20} />

                            </div>

                            <div>

                                <h2>
                                    Task Details
                                </h2>

                                <p>
                                    Task information
                                </p>

                            </div>

                        </div>


                        <div className="task-error-message">

                            Task not found.

                        </div>


                        <button
                            type="button"
                            className="task-cancel-btn"
                            onClick={() =>
                                navigate("/tasks")
                            }
                        >

                            <ArrowLeft size={17} />

                            Back to Tasks

                        </button>

                    </div>

                </div>

            </div>

        );

    }


    return (

        <div className="task-module">

            <div className="task-details-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="task-details-header">

                    <div className="task-details-title-row">

                        <div className="task-details-title-icon">

                            <ClipboardList size={22} />

                        </div>


                        <div>

                            <h1 className="task-details-title">

                                {task.title || "Task Details"}

                            </h1>


                            <p className="task-details-subtitle">

                                Task Details

                            </p>

                        </div>

                    </div>


                    <div className="task-details-actions">

                        <button
                            type="button"
                            className="task-details-action-btn task-details-back"
                            onClick={() =>
                                navigate("/tasks")
                            }
                        >

                            <ArrowLeft size={17} />

                            Back

                        </button>


                        <button
                            type="button"
                            className="task-details-action-btn task-details-edit"
                            onClick={() =>
                                navigate(
                                    `/tasks/edit/${task.id}`
                                )
                            }
                        >

                            <Pencil size={17} />

                            Edit Task

                        </button>

                    </div>

                </div>


                {/* =================================================
                    DETAILS GRID
                ================================================= */}

                <div className="task-details-grid">


                    {/* =================================================
                        TASK INFORMATION
                    ================================================= */}

                    <div className="task-details-card">

                        <div className="task-details-card-header">

                            <div className="task-details-card-icon">

                                <FileText size={20} />

                            </div>


                            <h2>
                                Task Information
                            </h2>

                        </div>


                        <div className="task-info-grid">


                            {/* ASSIGNED BY */}

                            <div className="task-info-item">

                                <User
                                    size={19}
                                    className="task-info-item-icon"
                                />

                                <div>

                                    <p className="task-info-label">
                                        Assigned By
                                    </p>

                                    <p className="task-info-value">
                                        {task.assignedBy || "-"}
                                    </p>

                                </div>

                            </div>


                            {/* ASSIGNED TO */}

                            <div className="task-info-item">

                                <UserRound
                                    size={19}
                                    className="task-info-item-icon"
                                />

                                <div>

                                    <p className="task-info-label">
                                        Assigned To
                                    </p>

                                    <p className="task-info-value">
                                        {task.assignedTo || "-"}
                                    </p>

                                </div>

                            </div>


                            {/* DEPARTMENT */}

                            <div className="task-info-item">

                                <Building2
                                    size={19}
                                    className="task-info-item-icon"
                                />

                                <div>

                                    <p className="task-info-label">
                                        Department
                                    </p>

                                    <p className="task-info-value">
                                        {task.department || "-"}
                                    </p>

                                </div>

                            </div>


                            {/* PRIORITY */}

                            <div className="task-info-item">

                                <Flag
                                    size={19}
                                    className="task-info-item-icon"
                                />

                                <div>

                                    <p className="task-info-label">
                                        Priority
                                    </p>

                                    <span
                                        className={`task-priority-badge ${getPriorityClass(
                                            task.priority
                                        )}`}
                                    >

                                        {task.priority || "-"}

                                    </span>

                                </div>

                            </div>


                            {/* ASSIGN DATE */}

                            <div className="task-info-item">

                                <Calendar
                                    size={19}
                                    className="task-info-item-icon"
                                />

                                <div>

                                    <p className="task-info-label">
                                        Assign Date
                                    </p>

                                    <p className="task-info-value">
                                        {formatDate(task.assignDate)}
                                    </p>

                                </div>

                            </div>


                            {/* DUE DATE */}

                            <div className="task-info-item">

                                <Clock
                                    size={19}
                                    className="task-info-item-icon"
                                />

                                <div>

                                    <p className="task-info-label">
                                        Due Date
                                    </p>

                                    <p className="task-info-value">
                                        {formatDate(task.dueDate)}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        STATUS
                    ================================================= */}

                    <div className="task-details-card">

                        <div className="task-details-card-header">

                            <div className="task-details-card-icon">

                                <ClipboardList size={20} />

                            </div>


                            <h2>
                                Task Status
                            </h2>

                        </div>


                        <div className="task-info-grid">


                            {/* CURRENT STATUS */}

                            <div className="task-info-item">

                                <ClipboardList
                                    size={19}
                                    className="task-info-item-icon"
                                />

                                <div>

                                    <p className="task-info-label">
                                        Current Status
                                    </p>

                                    <span
                                        className={`task-details-status ${getStatusClass(
                                            task.status
                                        )}`}
                                    >

                                        {task.status || "-"}

                                    </span>

                                </div>

                            </div>


                            {/* PRIORITY */}

                            <div className="task-info-item">

                                <Flag
                                    size={19}
                                    className="task-info-item-icon"
                                />

                                <div>

                                    <p className="task-info-label">
                                        Priority
                                    </p>

                                    <span
                                        className={`task-priority-badge ${getPriorityClass(
                                            task.priority
                                        )}`}
                                    >

                                        {task.priority || "-"}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <div className="task-details-card task-details-card-full">

                        <div className="task-details-card-header">

                            <div className="task-details-card-icon">

                                <FileText size={20} />

                            </div>


                            <h2>
                                Description
                            </h2>

                        </div>


                        <div className="task-description-box">

                            {task.description ||
                                "No description has been provided for this task."
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default TaskDetails;