const DesigningTable = ({
    projects,
    loading,
    onEdit,
    onDelete
}) => {

    if (loading) {

        return (

            <div className="table-loading">

                Loading design projects...

            </div>

        );

    }


    return (

        <div className="table-container">

            <table className="designing-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Project Name</th>

                        <th>Company</th>

                        <th>Design Type</th>

                        <th>Status</th>

                        <th>Assigned By</th>

                        <th>Assigned To</th>

                        <th>Assign Date</th>

                        <th>Due Date</th>

                        <th>Notes</th>

                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    {projects.length > 0 ? (

                        projects.map((project) => (

                            <tr key={project.id}>

                                <td>
                                    {project.id}
                                </td>


                                <td>
                                    {project.projectname || "-"}
                                </td>


                                <td>
                                    {project.companyname || "-"}
                                </td>


                                <td>
                                    {project.designtype || "-"}
                                </td>


                                <td>

                                    <span
                                        className={`status ${
                                            project.status
                                                ?.toLowerCase()
                                                .replace(/\s+/g, "_") ||
                                            "hold"
                                        }`}
                                    >

                                        {project.status || "-"}

                                    </span>

                                </td>


                                <td>
                                    {project.assignby || "-"}
                                </td>


                                <td>
                                    {project.assignto || "-"}
                                </td>


                                <td>

                                    {project.assigndate

                                        ? new Date(
                                            project.assigndate
                                        ).toLocaleString()

                                        : "-"

                                    }

                                </td>


                                <td>

                                    {project.duedate

                                        ? new Date(
                                            project.duedate
                                        ).toLocaleString()

                                        : "-"

                                    }

                                </td>


                                <td>
                                    {project.notes || "-"}
                                </td>


                                <td>

                                    <button
                                        type="button"
                                        className="edit-btn"
                                        onClick={() =>
                                            onEdit(project)
                                        }
                                        aria-label={`Edit ${project.projectname || "project"}`}
                                        title="Edit project"
                                    >

                                        Edit

                                    </button>


                                    <button
                                        type="button"
                                        className="delete-btn"
                                        onClick={() =>
                                            onDelete(project.id)
                                        }
                                        aria-label={`Delete ${project.projectname || "project"}`}
                                        title="Delete project"
                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="11">

                                No Design Projects Found

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

};

export default DesigningTable;