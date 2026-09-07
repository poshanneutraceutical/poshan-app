import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import webDevelopmentService
    from "../../services/WebDevelopmentService";

import DepartmentTasks
    from "../../components/DepartmentTasks";

import "./WebDevelopment.css";


const WebDevelopmentList = () => {

    const navigate =
        useNavigate();


    const [
        projects,
        setProjects
    ] = useState([]);


    const [
        search,
        setSearch
    ] = useState("");


    const [
        loading,
        setLoading
    ] = useState(true);


    /*
     ==========================================
     LOAD PROJECTS
     ==========================================
     */

    useEffect(() => {

        loadProjects();

    }, []);


    const loadProjects = async () => {

        try {

            setLoading(true);


            const data =
                await webDevelopmentService
                    .getAll();


            setProjects(
                Array.isArray(data)
                    ? data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Failed to load projects",
                error
            );


            setProjects([]);

        }
        finally {

            setLoading(false);

        }

    };


    /*
     ==========================================
     DELETE PROJECT
     ==========================================
     */

    const deleteProject = async (
        id
    ) => {

        if (
            !window.confirm(
                "Delete this project?"
            )
        ) {

            return;

        }


        try {

            await webDevelopmentService
                .delete(id);


            await loadProjects();

        }
        catch (error) {

            console.error(
                "Failed to delete project:",
                error
            );

        }

    };


    /*
     ==========================================
     SEARCH
     ==========================================
     */

    const filteredProjects =
        projects.filter(
            project => {

                const query =
                    search
                        .trim()
                        .toLowerCase();


                if (!query) {

                    return true;

                }


                return (

                    (
                        project.companyname ||
                        ""
                    )
                        .toLowerCase()
                        .includes(query)

                    ||

                    (
                        project.projectname ||
                        ""
                    )
                        .toLowerCase()
                        .includes(query)

                    ||

                    (
                        project.assigndeveloper ||
                        ""
                    )
                        .toLowerCase()
                        .includes(query)

                    ||

                    (
                        project.projecttype ||
                        ""
                    )
                        .toLowerCase()
                        .includes(query)

                );

            }
        );


    /*
     ==========================================
     LOADING
     ==========================================
     */

    if (loading) {

        return (

            <div className="webdevelopment-container">

                <h2>
                    Loading...
                </h2>

            </div>

        );

    }


    return (

        <div className="webdevelopment-container">


            {/* =================================================
                WEB DEVELOPMENT HEADER
            ================================================= */}

            <div className="webdevelopment-header">

                <div>

                    <h2>
                        Web Development Projects
                    </h2>

                    <p>
                        Manage Website Projects
                    </p>

                </div>


                <button
                    type="button"
                    className="add-btn"
                    onClick={() =>
                        navigate(
                            "/web/development/add"
                        )
                    }
                >

                    + Add Project

                </button>

            </div>


            {/* =================================================
                SEARCH
            ================================================= */}

            <input
                type="text"
                className="search-box"
                placeholder="Search Company, Project or Developer..."
                value={
                    search
                }
                onChange={
                    event =>
                        setSearch(
                            event.target.value
                        )
                }
            />


            {/* =================================================
                PROJECT TABLE
            ================================================= */}

            <div className="webdevelopment-table-container">

                <table className="webdevelopment-table">

                    <thead>

                        <tr>

                            <th>
                                ID
                            </th>

                            <th>
                                Company
                            </th>

                            <th>
                                Project
                            </th>

                            <th>
                                Type
                            </th>

                            <th>
                                Developer
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Priority
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            filteredProjects.length === 0

                                ?

                                (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            style={{
                                                textAlign:
                                                    "center"
                                            }}
                                        >

                                            No Projects Found

                                        </td>

                                    </tr>

                                )

                                :

                                filteredProjects.map(
                                    project => (

                                        <tr
                                            key={
                                                project.id
                                            }
                                        >

                                            <td>

                                                {
                                                    project.id
                                                }

                                            </td>


                                            <td>

                                                {
                                                    project.companyname ||
                                                    "-"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    project.projectname ||
                                                    "-"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    project.projecttype ||
                                                    "-"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    project.assigndeveloper ||
                                                    "-"
                                                }

                                            </td>


                                            <td>

                                                <span className="status-badge">

                                                    {
                                                        project.status ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <span className="priority-badge">

                                                    {
                                                        project.priority ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <button
                                                    type="button"
                                                    className="view-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/web/development/${project.id}`
                                                        )
                                                    }
                                                >

                                                    View

                                                </button>


                                                <button
                                                    type="button"
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/web/development/edit/${project.id}`
                                                        )
                                                    }
                                                >

                                                    Edit

                                                </button>


                                                <button
                                                    type="button"
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        deleteProject(
                                                            project.id
                                                        )
                                                    }
                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                        }

                    </tbody>

                </table>

            </div>


            {/* =================================================
                ASSIGNED TASKS
            =================================================

                Tasks are NOT copied into Web Development.

                This section reads from the central Task module
                using:

                    department = WEB_DEVELOPMENT

                "View Task" opens the same Task record used
                by the main Task module.
            ================================================= */}

            <DepartmentTasks

                department="WEB_DEVELOPMENT"

                title="Assigned Web Development Tasks"

            />

        </div>

    );

};


export default WebDevelopmentList;