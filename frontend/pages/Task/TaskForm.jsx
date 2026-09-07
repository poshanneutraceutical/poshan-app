import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
    Save,
    ArrowLeft,
    ClipboardList,
    FileText,
    User,
    Building2,
    Flag,
    CalendarDays,
    CalendarClock
} from "lucide-react";

import { createTask } from "../../services/TaskService";

import "./Task.css";


const TaskForm = () => {

    const navigate = useNavigate();


    /*
     ==========================================
     INITIAL TASK DATA
     ==========================================

     Status is intentionally NOT included.

     Backend automatically creates the task
     with PENDING status.
     */

    const [task, setTask] = useState({

        title: "",

        description: "",

        assignedBy: "ADMIN",

        assignedTo: "",

        department: "MARKETING",

        priority: "LOW",

        assignDate: "",

        dueDate: ""

    });


    /*
     ==========================================
     LOADING
     ==========================================
     */

    const [loading, setLoading] =
        useState(false);


    /*
     ==========================================
     ERROR
     ==========================================
     */

    const [error, setError] =
        useState("");


    /*
     ==========================================
     HANDLE INPUT CHANGE
     ==========================================
     */

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setTask((previousTask) => ({

            ...previousTask,

            [name]: value

        }));

    };


    /*
     ==========================================
     CREATE TASK
     ==========================================
     */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        /*
         Prevent multiple submissions
         */

        if (loading) {

            return;

        }


        try {

            setLoading(true);


            /*
             ==========================================
             TASK DATA SENT TO BACKEND
             ==========================================

             STATUS is intentionally NOT sent.

             Backend automatically creates
             the task with PENDING status.
             */

            const taskData = {

                title:
                    task.title.trim(),

                description:
                    task.description.trim(),

                assignedBy:
                    task.assignedBy,

                assignedTo:
                    task.assignedTo.trim(),

                department:
                    task.department,

                priority:
                    task.priority,

                assignDate:
                    task.assignDate
                        ? task.assignDate
                        : null,

                dueDate:
                    task.dueDate
                        ? task.dueDate
                        : null

            };


            /*
             ==========================================
             API CALL
             ==========================================
             */

            await createTask(taskData);


            /*
             ==========================================
             SUCCESS
             ==========================================
             */

            navigate("/tasks");


        } catch (error) {

            console.error(
                "Task creation failed:",
                error
            );


            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to create task."
            );


        } finally {

            setLoading(false);

        }

    };


    /*
     ==========================================
     CANCEL
     ==========================================
     */

    const handleCancel = () => {

        if (!loading) {

            navigate("/tasks");

        }

    };


    /*
     ==========================================
     MAIN UI
     ==========================================
     */

    return (

        <div className="task-module">

            <div className="task-form-page">


                {/* ==========================================
                    PAGE HEADER
                ========================================== */}

                <div className="task-form-header">

                    <div className="task-form-title-row">

                        <div className="task-form-title-icon">

                            <ClipboardList
                                size={24}
                                strokeWidth={2.1}
                            />

                        </div>


                        <div>

                            <h1 className="task-form-title">

                                Create Task

                            </h1>


                            <p className="task-form-subtitle">

                                Create and assign a new organizational task

                            </p>

                        </div>


                    </div>


                    <Link
                        to="/tasks"
                        className="task-back-btn"
                    >

                        <ArrowLeft size={17} />

                        Back to Tasks

                    </Link>


                </div>


                {/* ==========================================
                    ERROR MESSAGE
                ========================================== */}

                {error && (

                    <div className="task-error-message">

                        <span className="task-error-icon">

                            !

                        </span>

                        <span>

                            {error}

                        </span>

                    </div>

                )}


                {/* ==========================================
                    MAIN FORM
                ========================================== */}

                <form
                    onSubmit={handleSubmit}
                    className="task-form"
                >


                    {/* ==========================================
                        TASK INFORMATION
                    ========================================== */}

                    <div className="task-form-card">


                        <div className="task-section-header">

                            <div className="task-section-icon">

                                <FileText
                                    size={20}
                                />

                            </div>


                            <div>

                                <h2>

                                    Task Information

                                </h2>


                                <p>

                                    Enter the basic details of the task

                                </p>

                            </div>


                        </div>


                        <div className="task-form-grid">


                            {/* ==========================================
                                TASK TITLE
                            ========================================== */}

                            <div className="task-field task-field-full">

                                <label htmlFor="title">

                                    Task Title

                                    <span className="task-required">

                                        *

                                    </span>

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
                                        placeholder="Enter task title"
                                        value={task.title}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />

                                </div>


                            </div>


                            {/* ==========================================
                                DESCRIPTION
                            ========================================== */}

                            <div className="task-field task-field-full">

                                <label htmlFor="description">

                                    Task Description

                                </label>


                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Enter task description or instructions..."
                                    value={task.description}
                                    onChange={handleChange}
                                    rows="5"
                                    disabled={loading}
                                />


                            </div>


                            {/* ==========================================
                                ASSIGNED BY
                            ========================================== */}

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
                                        value={task.assignedBy}
                                        onChange={handleChange}
                                        disabled={loading}
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


                            {/* ==========================================
                                ASSIGNED TO
                            ========================================== */}

                            <div className="task-field">

                                <label htmlFor="assignedTo">

                                    Assigned To

                                    <span className="task-required">

                                        *

                                    </span>

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
                                        placeholder="Employee username or name"
                                        value={task.assignedTo}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />

                                </div>


                            </div>


                            {/* ==========================================
                                DEPARTMENT
                            ========================================== */}

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
                                        value={task.department}
                                        onChange={handleChange}
                                        disabled={loading}
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


                                        {/* ==========================================
                                            MRP PRINTING
                                        ========================================== */}

                                        <option value="MRP_PRINTING">

                                            MRP_PRINTING

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


                            {/* ==========================================
                                PRIORITY
                            ========================================== */}

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
                                        value={task.priority}
                                        onChange={handleChange}
                                        disabled={loading}
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


                    {/* ==========================================
                        SCHEDULE INFORMATION
                    ========================================== */}

                    <div className="task-form-card">


                        <div className="task-section-header">

                            <div className="task-section-icon">

                                <CalendarDays
                                    size={20}
                                />

                            </div>


                            <div>

                                <h2>

                                    Task Schedule

                                </h2>


                                <p>

                                    Set the assignment and expected completion dates

                                </p>

                            </div>


                        </div>


                        <div className="task-form-grid">


                            {/* ==========================================
                                ASSIGN DATE
                            ========================================== */}

                            <div className="task-field">

                                <label htmlFor="assignDate">

                                    Assign Date

                                </label>


                                <div className="task-input-wrapper">

                                    <CalendarDays
                                        size={17}
                                        className="task-input-icon"
                                    />


                                    <input
                                        id="assignDate"
                                        type="datetime-local"
                                        name="assignDate"
                                        value={task.assignDate}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />

                                </div>


                            </div>


                            {/* ==========================================
                                DUE DATE
                            ========================================== */}

                            <div className="task-field">

                                <label htmlFor="dueDate">

                                    Due Date

                                </label>


                                <div className="task-input-wrapper">

                                    <CalendarClock
                                        size={17}
                                        className="task-input-icon"
                                    />


                                    <input
                                        id="dueDate"
                                        type="datetime-local"
                                        name="dueDate"
                                        value={task.dueDate}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />

                                </div>


                            </div>


                        </div>


                    </div>


                    {/* ==========================================
                        STATUS INFORMATION
                    ========================================== */}

                    <div className="task-status-note">

                        <div className="task-status-note-icon">

                            <ClipboardList
                                size={18}
                            />

                        </div>


                        <div>

                            <strong>

                                Initial Status

                            </strong>


                            <p>

                                New tasks are automatically created with

                                <span className="task-status-pill">

                                    PENDING

                                </span>

                                status.

                            </p>

                        </div>


                    </div>


                    {/* ==========================================
                        FORM ACTIONS
                    ========================================== */}

                    <div className="task-form-actions">


                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            className="task-cancel-btn"
                        >

                            <ArrowLeft
                                size={17}
                            />

                            Cancel

                        </button>


                        <button
                            type="submit"
                            disabled={loading}
                            className="task-submit-btn"
                        >

                            <Save
                                size={17}
                            />


                            {loading

                                ? "Saving..."

                                : "Save Task"

                            }

                        </button>


                    </div>


                </form>


            </div>

        </div>

    );

};


export default TaskForm;