const DigitalMarketingTable = ({
    projects,
    onEdit,
    onDelete
}) => {

    return (

        <div className="digital-table-container">

            <table className="digital-table">

                <thead>

                    <tr>

                        <th>Company</th>
                        <th>Project</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Assign Date</th>
                        <th>Due Date</th>
                        <th>Leads</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {projects.length === 0 ? (

                        <tr>

                            <td
                                colSpan="9"
                                style={{
                                    textAlign: "center",
                                    padding: "20px"
                                }}
                            >

                                No Projects Found

                            </td>

                        </tr>

                    ) : (

                        projects.map((project) => (

                            <tr key={project.id}>

                                <td>{project.companyname}</td>

                                <td>{project.projectname}</td>

                                <td>{project.type}</td>

                                <td>{project.status}</td>

                                <td>{project.assignto}</td>

                                <td>
                                    {project.assigndate
                                        ? new Date(project.assigndate).toLocaleString()
                                        : "-"}
                                </td>

                                <td>
                                    {project.duedate
                                        ? new Date(project.duedate).toLocaleString()
                                        : "-"}
                                </td>

                                <td>{project.leadgenerated}</td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() => onEdit(project)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => onDelete(project.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

};

export default DigitalMarketingTable;