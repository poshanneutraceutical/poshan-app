import React, {
    useEffect,
    useState
} from "react";

import {
    Save,
    ArrowLeft,
    ClipboardList,
    User,
    Building2,
    Flag,
    Calendar,
    FileText
} from "lucide-react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getTaskById,
    updateTask
} from "../../services/TaskService";

import { useAuth } from "../../context/AuthContext";

import "./Task.css";


const TaskEdit = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const {
        user,
        loading: authLoading
    } = useAuth();


    const [task, setTask] = useState(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");


    const getUserRole = () => {

        if (!user) {
            return "";
        }

        if (
            typeof user.role === "string"
        ) {

            return user.role
                .replace("ROLE_", "")
                .toUpperCase();

        }

        if (
            Array.isArray(user.roles) &&
            user.roles.length > 0
        ) {

            const role = user.roles[0];

            if (
                typeof role === "string"
            ) {

                return role
                    .replace("ROLE_", "")
                    .toUpperCase();

            }

            if (
                role &&
                typeof role === "object" &&
                typeof role.name === "string"
            ) {

                return role.name
                    .replace("ROLE_", "")
                    .toUpperCase();

            }

        }

        if (
            Array.isArray(user.authorities) &&
            user.authorities.length > 0
        ) {

            const authority =
                user.authorities[0];

            if (
                typeof authority === "string"
            ) {

                return authority
                    .replace("ROLE_", "")
                    .toUpperCase();

            }

            if (
                authority &&
                typeof authority === "object" &&
                typeof authority.authority === "string"
            ) {

                return authority.authority
                    .replace("ROLE_", "")
                    .toUpperCase();

            }

        }

        return "";

    };


    const userRole = getUserRole();

    const isAdmin =
        userRole === "ADMIN";

    const isEmployee =
        userRole === "EMPLOYEE";


    useEffect(() => {

        if (!authLoading) {
            loadTask();
        }

    }, [id, authLoading]);


    const loadTask = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getTaskById(id);

            setTask(data);

        } catch (error) {

            console.error(
                "Error loading task:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load task."
            );

        } finally {

            setLoading(false);

        }

    };


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setTask(previousTask => ({

            ...previousTask,

            [name]: value

        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!task) {
            return;
        }

        if (!isAdmin && !isEmployee) {

            setError(
                "You are not authorized to edit tasks."
            );

            return;

        }

        try {

            setSaving(true);

            setError("");


            if (isAdmin) {

                const adminTaskData = {

                    title:
                        task.title,

                    description:
                        task.description,

                    assignedBy:
                        task.assignedBy,

                    assignedTo:
                        task.assignedTo,

                    department:
                        task.department,

                    priority:
                        task.priority,

                    assignDate:
                        task.assignDate || null,

                    dueDate:
                        task.dueDate || null

                };

                await updateTask(
                    id,
                    adminTaskData
                );

            } else if (isEmployee) {

                if (!task.status) {

                    setError(
                        "Status is required."
                    );

                    setSaving(false);

                    return;

                }

                const employeeTaskData = {

                    status:
                        task.status

                };

                await updateTask(
                    id,
                    employeeTaskData
                );

            }

            navigate("/tasks");

        } catch (error) {

            console.error(
                "Task update failed:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                error.message ||
                "Unable to update task."
            );

        } finally {

            setSaving(false);

        }

    };


    if (authLoading) {

        return (

            <div className="task-loading">

                Loading User...

            </div>

        );

    }


    if (!user) {

        return (

            <div className="task-form-container">

                <div className="task-form-card">

                    <div className="task-section-header">

                        <div className="task-section-icon">

                            <ClipboardList size={20} />

                        </div>

                        <div>

                            <h2>
                                Edit Task
                            </h2>

                            <p>
                                Authentication required
                            </p>

                        </div>

                    </div>

                    <div className="task-error-message">

                        You are not logged in.

                    </div>

                    <button
                        type="button"
                        className="task-save-btn"
                        onClick={() =>
                            navigate("/")
                        }
                    >

                        Go to Login

                    </button>

                </div>

            </div>

        );

    }


    if (!isAdmin && !isEmployee) {

        return (

            <div className="task-form-container">

                <div className="task-form-card">

                    <div className="task-section-header">

                        <div className="task-section-icon">

                            <ClipboardList size={20} />

                        </div>

                        <div>

                            <h2>
                                Edit Task
                            </h2>

                            <p>
                                Access restricted
                            </p>

                        </div>

                    </div>

                    <div className="task-error-message">

                        You do not have permission to edit tasks.

                    </div>

                    <button
                        type="button"
                        className="task-cancel-btn"
                        onClick={() =>
                            navigate("/tasks")
                        }
                    >

                        Back to Tasks

                    </button>

                </div>

            </div>

        );

    }


    if (loading) {

        return (

            <div className="task-loading">

                Loading Task...

            </div>

        );

    }


    if (!task) {

        return (

            <div className="task-form-container">

                <div className="task-form-card">

                    <div className="task-section-header">

                        <div className="task-section-icon">

                            <ClipboardList size={20} />

                        </div>

                        <div>

                            <h2>
                                Edit Task
                            </h2>

                            <p>
                                Task information
                            </p>

                        </div>

                    </div>

                    <div className="task-error-message">

                        {error || "Task not found."}

                    </div>

                    <button
                        type="button"
                        className="task-cancel-btn"
                        onClick={() =>
                            navigate("/tasks")
                        }
                    >

                        Back to Tasks

                    </button>

                </div>

            </div>

        );

    }


   return (

       <div className="task-module">

           <div className="task-form-container">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="task-form-header">

                <div className="task-form-title-row">

                    <div className="task-form-title-icon">

                        <ClipboardList size={22} />

                    </div>

                    <div>

                        <h1 className="task-form-title">

                            Edit Task

                        </h1>

                        <p className="task-form-subtitle">

                            Update task information and status

                        </p>

                    </div>

                </div>


                <button
                    type="button"
                    className="task-back-btn"
                    onClick={() =>
                        navigate("/tasks")
                    }
                    disabled={saving}
                >

                    <ArrowLeft size={17} />

                    Back to Tasks

                </button>

            </div>


            {/* =================================================
                ROLE INFORMATION
            ================================================= */}

            <div className="task-edit-info">

                {isAdmin && (

                    <span>

                        Admin Mode — You can edit all task details except status.

                    </span>

                )}

                {isEmployee && (

                    <span>

                        Employee Mode — You can update only the task status.

                    </span>

                )}

            </div>


            {error && (

                <div className="task-error-message">

                    {error}

                </div>

            )}


            <form onSubmit={handleSubmit}>


                {/* =================================================
                    TASK INFORMATION
                ================================================= */}

                <div className="task-form-card">

                    <div className="task-section-header">

                        <div className="task-section-icon">

                            <FileText size={20} />

                        </div>

                        <div>

                            <h2>
                                Task Information
                            </h2>

                            <p>
                                Manage the task details
                            </p>

                        </div>

                    </div>


                    <div className="task-form-grid">


                        {/* TITLE */}

                        <div className="task-field task-field-full">

                            <label htmlFor="title">

                                Task Title

                            </label>

                            <div className="task-input-wrapper">

                                <ClipboardList
                                    size={17}
                                    className="task-input-icon"
                                />

                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={task.title || ""}
                                    onChange={handleChange}
                                    disabled={!isAdmin || saving}
                                    required
                                />

                            </div>

                        </div>


                        {/* DESCRIPTION */}

                        <div className="task-field task-field-full">

                            <label htmlFor="description">

                                Description

                            </label>

                            <textarea
                                id="description"
                                name="description"
                                value={task.description || ""}
                                onChange={handleChange}
                                disabled={!isAdmin || saving}
                                rows="5"
                            />

                        </div>


                        {/* ASSIGNED BY */}

                        <div className="task-field">

                            <label htmlFor="assignedBy">

                                Assigned By

                            </label>

                            <div className="task-input-wrapper">

                                <User
                                    size={17}
                                    className="task-input-icon"
                                />

                                <select
                                    id="assignedBy"
                                    name="assignedBy"
                                    value={task.assignedBy || ""}
                                    onChange={handleChange}
                                    disabled={!isAdmin || saving}
                                >

                                    <option value="ADMIN">
                                        ADMIN
                                    </option>

                                    <option value="MANAGER">
                                        MANAGER
                                    </option>

                                    <option value="DEPT_HEAD">
                                        DEPT_HEAD
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* ASSIGNED TO */}

                        <div className="task-field">

                            <label htmlFor="assignedTo">

                                Assigned To

                            </label>

                            <div className="task-input-wrapper">

                                <User
                                    size={17}
                                    className="task-input-icon"
                                />

                                <input
                                    id="assignedTo"
                                    type="text"
                                    name="assignedTo"
                                    value={task.assignedTo || ""}
                                    onChange={handleChange}
                                    disabled={!isAdmin || saving}
                                />

                            </div>

                        </div>


                        {/* DEPARTMENT */}

                        <div className="task-field">

                            <label htmlFor="department">

                                Department

                            </label>

                            <div className="task-input-wrapper">

                                <Building2
                                    size={17}
                                    className="task-input-icon"
                                />

                                <select
                                    id="department"
                                    name="department"
                                    value={task.department || ""}
                                    onChange={handleChange}
                                    disabled={!isAdmin || saving}
                                >

                                    <option value="WEB_DEVELOPMENT">
                                        WEB_DEVELOPMENT
                                    </option>

                                    <option value="MARKETING">
                                        MARKETING
                                    </option>

                                    <option value="DESIGN">
                                        DESIGN
                                    </option>

                                    <option value="PRODUCTION">
                                        PRODUCTION
                                    </option>

                                    <option value="QUALITY">
                                        QUALITY
                                    </option>

                                    <option value="SALES">
                                        SALES
                                    </option>

                                    <option value="PURCHASE">
                                        PURCHASE
                                    </option>

                                    <option value="INVENTORY">
                                        INVENTORY
                                    </option>

                                    <option value="WAREHOUSE">
                                        WAREHOUSE
                                    </option>

                                    <option value="HR">
                                        HR
                                    </option>

                                    <option value="FINANCE">
                                        FINANCE
                                    </option>

                                    <option value="ACCOUNTS">
                                        ACCOUNTS
                                    </option>

                                    <option value="IT">
                                        IT
                                    </option>

                                    <option value="ADMIN">
                                        ADMIN
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* PRIORITY */}

                        <div className="task-field">

                            <label htmlFor="priority">

                                Priority

                            </label>

                            <div className="task-input-wrapper">

                                <Flag
                                    size={17}
                                    className="task-input-icon"
                                />

                                <select
                                    id="priority"
                                    name="priority"
                                    value={task.priority || ""}
                                    onChange={handleChange}
                                    disabled={!isAdmin || saving}
                                >

                                    <option value="LOW">
                                        LOW
                                    </option>

                                    <option value="MEDIUM">
                                        MEDIUM
                                    </option>

                                    <option value="HIGH">
                                        HIGH
                                    </option>

                                    <option value="URGENT">
                                        URGENT
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    SCHEDULE + STATUS
                ================================================= */}

                <div className="task-form-card">

                    <div className="task-section-header">

                        <div className="task-section-icon">

                            <Calendar size={20} />

                        </div>

                        <div>

                            <h2>
                                Schedule & Status
                            </h2>

                            <p>
                                Manage task dates and current progress
                            </p>

                        </div>

                    </div>


                    <div className="task-form-grid">


                        {/* ASSIGN DATE */}

                        <div className="task-field">

                            <label htmlFor="assignDate">

                                Assign Date

                            </label>

                            <div className="task-input-wrapper">

                                <Calendar
                                    size={17}
                                    className="task-input-icon"
                                />

                                <input
                                    id="assignDate"
                                    type="datetime-local"
                                    name="assignDate"
                                    value={
                                        task.assignDate
                                            ? task.assignDate.substring(0, 16)
                                            : ""
                                    }
                                    onChange={handleChange}
                                    disabled={!isAdmin || saving}
                                />

                            </div>

                        </div>


                        {/* DUE DATE */}

                        <div className="task-field">

                            <label htmlFor="dueDate">

                                Due Date

                            </label>

                            <div className="task-input-wrapper">

                                <Calendar
                                    size={17}
                                    className="task-input-icon"
                                />

                                <input
                                    id="dueDate"
                                    type="datetime-local"
                                    name="dueDate"
                                    value={
                                        task.dueDate
                                            ? task.dueDate.substring(0, 16)
                                            : ""
                                    }
                                    onChange={handleChange}
                                    disabled={!isAdmin || saving}
                                />

                            </div>

                        </div>


                        {/* STATUS */}

                        <div className="task-field task-field-full">

                            <label htmlFor="status">

                                Status

                            </label>

                            <div className="task-input-wrapper">

                                <ClipboardList
                                    size={17}
                                    className="task-input-icon"
                                />

                                <select
                                    id="status"
                                    name="status"
                                    value={task.status || ""}
                                    onChange={handleChange}
                                    disabled={!isEmployee || saving}
                                >

                                    <option value="PENDING">
                                        PENDING
                                    </option>

                                    <option value="IN_PROGRESS">
                                        IN_PROGRESS
                                    </option>

                                    <option value="COMPLETE">
                                        COMPLETE
                                    </option>

                                    <option value="ON_HOLD">
                                        ON_HOLD
                                    </option>

                                    <option value="CANCEL">
                                        CANCEL
                                    </option>

                                    <option value="DELIVERED">
                                        DELIVERED
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="task-form-actions">

                    <button
                        type="button"
                        className="task-cancel-btn"
                        onClick={() =>
                            navigate("/tasks")
                        }
                        disabled={saving}
                    >

                        Cancel

                    </button>


                    <button
                        type="submit"
                        className="task-save-btn"
                        disabled={
                            saving ||
                            (!isAdmin && !isEmployee)
                        }
                    >

                        <Save size={17} />

                        {saving
                            ? "Saving..."
                            : "Save Changes"
                        }

                    </button>

                </div>

            </form>

                </div>

            </div>

        );

};


export default TaskEdit;