import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import webDevelopmentService from "../../services/WebDevelopmentService";

import "./WebDevelopment.css";

const AddWebProject = () => {

    const navigate = useNavigate();

    const [project, setProject] = useState({

        companyname: "",
        contactperson: "",
        projectname: "",
        projecttype: "",
        status: "HOLD",
        priority: "LOW",
        assigndeveloper: "",
        notes: "",
        assigndate: "",
        duedate: ""

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProject(prev => ({

            ...prev,

            [name]: value

        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await webDevelopmentService.create(project);

            alert("Project Created Successfully");

            navigate("/web/development");

        }
        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to create project"
            );

        }

    };

    return (

        <div className="form-container">

            <h2>

                Add Web Development Project

            </h2>

            <form onSubmit={handleSubmit}>

                <div className="form-grid">

                    <input
                        type="text"
                        name="companyname"
                        value={project.companyname}
                        onChange={handleChange}
                        placeholder="Company Name"
                        required
                    />

                    <input
                        type="text"
                        name="contactperson"
                        value={project.contactperson}
                        onChange={handleChange}
                        placeholder="Contact Person"
                    />

                    <input
                        type="text"
                        name="projectname"
                        value={project.projectname}
                        onChange={handleChange}
                        placeholder="Project Name"
                        required
                    />

                    <input
                        type="text"
                        name="projecttype"
                        value={project.projecttype}
                        onChange={handleChange}
                        placeholder="Project Type"
                    />

                    <input
                        type="text"
                        name="assigndeveloper"
                        value={project.assigndeveloper}
                        onChange={handleChange}
                        placeholder="Assigned Developer"
                    />

                    <select
                        name="status"
                        value={project.status}
                        onChange={handleChange}
                    >

                        <option value="HOLD">HOLD</option>

                        <option value="ONGOING">ONGOING</option>

                        <option value="COMPLETED">COMPLETED</option>

                        <option value="DELIVERED">DELIVERED</option>

                    </select>

                    <select
                        name="priority"
                        value={project.priority}
                        onChange={handleChange}
                    >

                        <option value="LOW">LOW</option>

                        <option value="MEDIUM">MEDIUM</option>

                        <option value="HIGH">HIGH</option>

                    </select>

                    <input
                        type="datetime-local"
                        name="assigndate"
                        value={project.assigndate}
                        onChange={handleChange}
                    />

                    <input
                        type="datetime-local"
                        name="duedate"
                        value={project.duedate}
                        onChange={handleChange}
                    />

                </div>

                <textarea
                    name="notes"
                    value={project.notes}
                    onChange={handleChange}
                    placeholder="Project Notes"
                    rows="5"
                />

                <div className="form-buttons">

                    <button
                        type="submit"
                        className="save-btn"
                    >

                        Save Project

                    </button>

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() =>
                            navigate("/web/development")
                        }
                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

};

export default AddWebProject;