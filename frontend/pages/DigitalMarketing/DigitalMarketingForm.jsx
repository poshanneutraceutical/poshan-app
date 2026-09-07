import { useEffect, useState } from "react";

const initialForm = {
    companyname: "",
    projectname: "",
    type: "",
    status: "HOLD",
    assignto: "",
    assigndate: "",
    duedate: "",
    leadgenerated: "",
    notes: ""
};

const DigitalMarketingForm = ({
    editingProject,
    onCreate,
    onUpdate
}) => {

    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {

        if (editingProject) {

            setFormData({
                ...editingProject,
                assigndate: editingProject.assigndate
                    ? editingProject.assigndate.substring(0, 16)
                    : "",
                duedate: editingProject.duedate
                    ? editingProject.duedate.substring(0, 16)
                    : ""
            });

        } else {

            setFormData(initialForm);

        }

    }, [editingProject]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (editingProject) {

            onUpdate(formData);

        } else {

            onCreate(formData);

        }

        setFormData(initialForm);

    };

    return (

        <form
            className="digital-form"
            onSubmit={handleSubmit}
        >

            <input
                type="text"
                name="companyname"
                placeholder="Company Name"
                value={formData.companyname}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="projectname"
                placeholder="Project Name"
                value={formData.projectname}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="type"
                placeholder="Campaign Type"
                value={formData.type}
                onChange={handleChange}
            />

            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
            >

                <option value="HOLD">HOLD</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>

            </select>

            <input
                type="text"
                name="assignto"
                placeholder="Assign To"
                value={formData.assignto}
                onChange={handleChange}
            />

            <input
                type="datetime-local"
                name="assigndate"
                value={formData.assigndate}
                onChange={handleChange}
            />

            <input
                type="datetime-local"
                name="duedate"
                value={formData.duedate}
                onChange={handleChange}
            />

            <input
                type="number"
                name="leadgenerated"
                placeholder="Leads Generated"
                value={formData.leadgenerated}
                onChange={handleChange}
            />

            <textarea
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
            />

            <button type="submit">

                {editingProject
                    ? "Update Project"
                    : "Add Project"}

            </button>

        </form>

    );

};

export default DigitalMarketingForm;