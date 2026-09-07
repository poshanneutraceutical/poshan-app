import { useEffect, useState } from "react";

const DesigningForm = ({
    project,
    onSave,
    onCancel
}) => {

    const [formData, setFormData] = useState({

        projectname: "",
        companyname: "",
        designtype: "",
        status: "IN_PROGRESS",
        assignby: "",
        assignto: "",
        assigndate: "",
        duedate: "",
        notes: ""

    });


    useEffect(() => {

        if (project) {

            setFormData({

                projectname:
                    project.projectname || "",

                companyname:
                    project.companyname || "",

                designtype:
                    project.designtype || "",

                status:
                    project.status || "IN_PROGRESS",

                assignby:
                    project.assignby || "",

                assignto:
                    project.assignto || "",

                assigndate:
                    project.assigndate
                        ? project.assigndate.slice(0, 16)
                        : "",

                duedate:
                    project.duedate
                        ? project.duedate.slice(0, 16)
                        : "",

                notes:
                    project.notes || ""

            });

        }
        else {

            setFormData({

                projectname: "",
                companyname: "",
                designtype: "",
                status: "IN_PROGRESS",
                assignby: "",
                assignto: "",
                assigndate: "",
                duedate: "",
                notes: ""

            });

        }

    }, [project]);


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData(previous => ({

            ...previous,

            [name]: value

        }));

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(formData);

    };


    return (

        <div className="modal-overlay">

            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="design-project-title"
            >

                <h2 id="design-project-title">

                    {project
                        ? "Edit Design Project"
                        : "Add Design Project"}

                </h2>


                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="projectname"
                        placeholder="Project Name"
                        value={formData.projectname}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />


                    <input
                        type="text"
                        name="companyname"
                        placeholder="Company Name"
                        value={formData.companyname}
                        onChange={handleChange}
                        autoComplete="organization"
                    />


                    <input
                        type="text"
                        name="designtype"
                        placeholder="Design Type"
                        value={formData.designtype}
                        onChange={handleChange}
                        autoComplete="off"
                    />


                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >

                        <option value="IN_PROGRESS">
                            In Progress
                        </option>

                        <option value="COMPLETED">
                            Completed
                        </option>

                        <option value="DELIVERED">
                            Delivered
                        </option>

                        <option value="HOLD">
                            Hold
                        </option>

                    </select>


                    <input
                        type="text"
                        name="assignby"
                        placeholder="Assigned By"
                        value={formData.assignby}
                        onChange={handleChange}
                        autoComplete="off"
                    />


                    <input
                        type="text"
                        name="assignto"
                        placeholder="Assigned To"
                        value={formData.assignto}
                        onChange={handleChange}
                        autoComplete="off"
                    />


                    <label htmlFor="design-assign-date">

                        Assign Date

                    </label>

                    <input
                        id="design-assign-date"
                        type="datetime-local"
                        name="assigndate"
                        value={formData.assigndate}
                        onChange={handleChange}
                    />


                    <label htmlFor="design-due-date">

                        Due Date

                    </label>

                    <input
                        id="design-due-date"
                        type="datetime-local"
                        name="duedate"
                        value={formData.duedate}
                        onChange={handleChange}
                    />


                    <textarea
                        rows="4"
                        name="notes"
                        placeholder="Notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />


                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onCancel}
                        >

                            Cancel

                        </button>


                        <button
                            type="submit"
                            className="save-btn"
                        >

                            {project
                                ? "Update Project"
                                : "Save Project"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default DesigningForm;