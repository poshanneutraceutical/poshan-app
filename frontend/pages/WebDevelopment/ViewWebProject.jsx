import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import webDevelopmentService from "../../services/WebDevelopmentService";

import "./WebDevelopment.css";

const ViewWebProject = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [project, setProject] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProject();

    }, []);

    const loadProject = async () => {

        try {

            const data =
                await webDevelopmentService.getById(id);

            setProject(data);

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="view-container">

            <div className="view-header">

                <h2>

                    Web Development Project Details

                </h2>

            </div>

            <div className="view-grid">

                <div>

                    <label>

                        Company Name

                    </label>

                    <p>

                        {project.companyname}

                    </p>

                </div>

                <div>

                    <label>

                        Contact Person

                    </label>

                    <p>

                        {project.contactperson}

                    </p>

                </div>

                <div>

                    <label>

                        Project Name

                    </label>

                    <p>

                        {project.projectname}

                    </p>

                </div>

                <div>

                    <label>

                        Project Type

                    </label>

                    <p>

                        {project.projecttype}

                    </p>

                </div>

                <div>

                    <label>

                        Assigned Developer

                    </label>

                    <p>

                        {project.assigndeveloper}

                    </p>

                </div>

                <div>

                    <label>

                        Status

                    </label>

                    <p>

                        {project.status}

                    </p>

                </div>

                <div>

                    <label>

                        Priority

                    </label>

                    <p>

                        {project.priority}

                    </p>

                </div>

                <div>

                    <label>

                        Assign Date

                    </label>

                    <p>

                        {

                            project.assigndate

                                ?

                                new Date(
                                    project.assigndate
                                ).toLocaleString()

                                :

                                "-"

                        }

                    </p>

                </div>

                <div>

                    <label>

                        Due Date

                    </label>

                    <p>

                        {

                            project.duedate

                                ?

                                new Date(
                                    project.duedate
                                ).toLocaleString()

                                :

                                "-"

                        }

                    </p>

                </div>

                <div className="full-width">

                    <label>

                        Notes

                    </label>

                    <p>

                        {project.notes || "-"}

                    </p>

                </div>

            </div>

            <div className="form-buttons">

                <button
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
                    className="cancel-btn"
                    onClick={() =>
                        navigate(
                            "/web/development"
                        )
                    }
                >

                    Back

                </button>

            </div>

        </div>

    );

};

export default ViewWebProject;