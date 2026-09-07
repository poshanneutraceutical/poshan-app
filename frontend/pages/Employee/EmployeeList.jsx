import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmployeeService from "../../services/EmployeeService";

import "./Employee.css";

const EmployeeList = () => {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        loadEmployees();

    }, []);


    const loadEmployees = async () => {

        try {

            setLoading(true);

            const response =
                await EmployeeService.getAllEmployees();

            setEmployees(response.data);

        }
        catch (error) {

            console.error(
                "Unable to load employees",
                error
            );

        }
        finally {

            setLoading(false);

        }

    };


    const deleteEmployee = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this employee permanently?"
        );

        if (!confirmDelete) {

            return;

        }

        try {

            await EmployeeService.deleteEmployee(id);

            setEmployees(prev =>
                prev.filter(
                    employee =>
                        employee.id !== id
                )
            );

            alert(
                "Employee deleted successfully."
            );

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to delete employee."
            );

        }

    };


    const filteredEmployees =
        employees.filter(employee => {

            const searchText =
                search.toLowerCase();


            const fullName =
                `${employee.firstName || ""} ${employee.lastName || ""}`
                    .toLowerCase();


            return (

                fullName.includes(searchText)

                ||

                employee.employeeCode
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                employee.username
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                employee.department
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText)

                ||

                employee.designation
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText)

                ||

                employee.role
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                employee.email
                    ?.toLowerCase()
                    .includes(searchText)

            );

        });


    if (loading) {

        return (

            <div className="employee-container">

                <h3>
                    Loading Employees...
                </h3>

            </div>

        );

    }


    return (

        <div className="employee-container">


            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="employee-header">

                <div>

                    <h2>
                        Employee Management
                    </h2>

                    <p className="employee-subtitle">
                        Manage employees, profiles and HR information
                    </p>

                </div>


                <button
                    className="add-btn"
                    onClick={() =>
                        navigate(
                            "/hr/employee/add"
                        )
                    }
                >

                    + Add Employee

                </button>

            </div>


            {/* ==========================================
                SEARCH
            ========================================== */}

            <input
                type="text"
                className="search-box"
                placeholder="Search by name, code, email, department..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />


            {/* ==========================================
                TABLE
            ========================================== */}

            <div className="employee-table-wrapper">

                <table className="employee-table">

                    <thead>

                        <tr>

                            <th>
                                Code
                            </th>

                            <th>
                                Name
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Department
                            </th>

                            <th>
                                Designation
                            </th>

                            <th>
                                Role
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredEmployees.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="no-employees"
                                >

                                    No Employees Found

                                </td>

                            </tr>

                        ) : (

                            filteredEmployees.map(
                                employee => (

                                    <tr
                                        key={employee.id}
                                    >

                                        <td>

                                            <strong>
                                                {employee.employeeCode}
                                            </strong>

                                        </td>


                                        <td>

                                            <div className="employee-name-cell">

                                                {employee.profileImage ? (

                                                    <img
                                                        src={
                                                            employee.profileImage
                                                        }
                                                        alt="Employee"
                                                        className="employee-list-image"
                                                    />

                                                ) : (

                                                    <div className="employee-list-placeholder">

                                                        {employee.firstName
                                                            ?.charAt(0)
                                                            .toUpperCase()}

                                                    </div>

                                                )}


                                                <span>

                                                    {employee.firstName}{" "}
                                                    {employee.lastName}

                                                </span>

                                            </div>

                                        </td>


                                        <td>
                                            {employee.email}
                                        </td>


                                        <td>
                                            {employee.department}
                                        </td>


                                        <td>
                                            {employee.designation}
                                        </td>


                                        <td>

                                            <span className="role-badge">

                                                {employee.role}

                                            </span>

                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    employee.status ===
                                                    "ACTIVE"

                                                        ?

                                                        "active-status"

                                                        :

                                                        "inactive-status"
                                                }
                                            >

                                                {employee.status}

                                            </span>

                                        </td>


                                        <td>

                                            <div className="table-actions">

                                                <button
                                                    className="view-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/hr/employee/${employee.id}`
                                                        )
                                                    }
                                                >

                                                    View

                                                </button>


                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/hr/employee/edit/${employee.id}`
                                                        )
                                                    }
                                                >

                                                    Edit

                                                </button>


                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        deleteEmployee(
                                                            employee.id
                                                        )
                                                    }
                                                >

                                                    Delete

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default EmployeeList;