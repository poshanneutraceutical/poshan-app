import React, { useEffect, useState } from "react";

import {
    getTasks,
    deleteTask
} from "../../services/TaskService";

import {
    Plus,
    Eye,
    Pencil,
    Trash2,
    ListTodo,
    Search
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Task.css";


const TaskList = () => {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const navigate = useNavigate();


    const {
        user,
        loading: authLoading
    } = useAuth();


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
            loadTasks();
        }

    }, [authLoading]);


    const loadTasks = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getTasks();

            setTasks(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Error loading tasks:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to load tasks."
            );

        } finally {

            setLoading(false);

        }

    };


    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this task?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            await deleteTask(id);

            await loadTasks();

        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to delete task."
            );

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


    const filteredTasks =
        tasks.filter((task) => {

            const searchableText = [

                task.title,
                task.assignedTo,
                task.department,
                task.priority,
                task.status

            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableText.includes(
                search.toLowerCase()
            );

        });


    if (authLoading) {

        return (

            <div className="task-loading">

                Loading User...

            </div>

        );

    }


    if (loading) {

        return (

            <div className="task-loading">

                Loading Tasks...

            </div>

        );

    }


    return (

        <div>


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="task-header">

                <div>

                    <h1 className="task-page-title">

                        Task Management

                    </h1>

                    <p className="task-page-subtitle">

                        Create, assign and manage organizational tasks

                    </p>

                </div>


                {isAdmin && (

                    <button
                        type="button"
                        className="task-primary-btn"
                        onClick={() =>
                            navigate("/tasks/add")
                        }
                    >

                        <Plus size={18} />

                        Create Task

                    </button>

                )}

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="task-error-message">

                    {error}

                </div>

            )}


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="task-search-container">

                <Search
                    size={18}
                    className="task-search-icon"
                />

                <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    placeholder="Search tasks by title, employee, department, priority or status..."
                    className="task-search-input"
                />

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="task-table-wrapper">

                <table className="task-table">

                    <thead>

                        <tr>

                            <th>
                                Task
                            </th>

                            <th>
                                Assigned To
                            </th>

                            <th>
                                Department
                            </th>

                            <th>
                                Priority
                            </th>

                            <th>
                                Status
                            </th>

                            <th className="task-actions-header">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredTasks.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="task-empty-state"
                                >

                                    <ListTodo
                                        size={36}
                                        style={{
                                            margin: "0 auto 12px"
                                        }}
                                    />

                                    {search
                                        ? "No tasks match your search."
                                        : "No tasks found."
                                    }

                                </td>

                            </tr>

                        ) : (

                            filteredTasks.map((task) => (

                                <tr
                                    key={task.id}
                                >

                                    <td className="task-title-cell">

                                        {task.title}

                                    </td>


                                    <td>

                                        {task.assignedTo || "-"}

                                    </td>


                                    <td>

                                        {task.department || "-"}

                                    </td>


                                    <td>

                                        <span
                                            className={`task-priority-badge ${getPriorityClass(
                                                task.priority
                                            )}`}
                                        >

                                            {task.priority || "-"}

                                        </span>

                                    </td>


                                    <td>

                                        <span
                                            className={`task-status-badge ${getStatusClass(
                                                task.status
                                            )}`}
                                        >

                                            {task.status || "-"}

                                        </span>

                                    </td>


                                    <td className="task-actions-cell">

                                        <div className="task-actions">


                                            {/* VIEW */}

                                            <button
                                                type="button"
                                                className="task-action-btn task-view-btn"
                                                title="View Task"
                                                onClick={() =>
                                                    navigate(
                                                        `/tasks/${task.id}`
                                                    )
                                                }
                                            >

                                                <Eye />

                                            </button>


                                            {/* EDIT */}

                                            {(isAdmin || isEmployee) && (

                                                <button
                                                    type="button"
                                                    className="task-action-btn task-edit-btn"
                                                    title="Edit Task"
                                                    onClick={() =>
                                                        navigate(
                                                            `/tasks/edit/${task.id}`
                                                        )
                                                    }
                                                >

                                                    <Pencil />

                                                </button>

                                            )}


                                            {/* DELETE */}

                                            {(isAdmin || isEmployee) && (

                                                <button
                                                    type="button"
                                                    className="task-action-btn task-delete-btn"
                                                    title="Delete Task"
                                                    onClick={() =>
                                                        handleDelete(
                                                            task.id
                                                        )
                                                    }
                                                >

                                                    <Trash2 />

                                                </button>

                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};


export default TaskList;