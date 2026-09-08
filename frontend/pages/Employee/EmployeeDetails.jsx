import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmployeeService from "../../services/EmployeeService";

import "./Employee.css";


const EmployeeDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        loadEmployee();

    }, [id]);


    const loadEmployee = async () => {

        try {

            const response =
                await EmployeeService.getEmployeeById(id);

            setEmployee(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };


    const deleteEmployee = async () => {

        const confirmDelete = window.confirm(

            "Are you sure you want to permanently delete this employee?\n\nThis will also delete:\n• User Account\n• Attendance\n• Future HR Records"

        );


        if (!confirmDelete) {

            return;

        }


        try {

            await EmployeeService.deleteEmployee(id);

            alert(
                "Employee deleted successfully."
            );

            navigate("/hr/employee");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to delete employee."

            );

        }

    };


    if (loading) {

        return (

            <h3>

                Loading Employee...

            </h3>

        );

    }


    if (!employee) {

        return (

            <h3>

                Employee not found.

            </h3>

        );

    }


    /*
     ==========================================
     PROFILE IMAGE URL
     ==========================================
     */

    const profileImageUrl =
        employee.profileImage
            ? employee.profileImage.startsWith("http")
                ? employee.profileImage
                 : employee.profileImage
            : null;


    return (

        <div className="employee-details-container">


            <div className="details-header">

                <h2>

                    Employee Details

                </h2>


                <div>

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
                        onClick={deleteEmployee}
                    >

                        Delete

                    </button>

                </div>

            </div>


            <div className="employee-card">


                {/* ==========================================
                    PROFILE IMAGE
                ========================================== */}

                {

                    profileImageUrl && (

                        <div className="employee-profile">

                            <img
                                src={profileImageUrl}
                                alt={
                                    `${employee.firstName} ${employee.lastName}`
                                }
                                className="employee-image"
                            />

                        </div>

                    )

                }


                {/* ==========================================
                    BASIC INFORMATION
                ========================================== */}

                <div className="detail-row">

                    <strong>

                        Employee Code

                    </strong>

                    <span>

                        {employee.employeeCode}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Full Name

                    </strong>

                    <span>

                        {employee.firstName}{" "}
                        {employee.lastName}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Email

                    </strong>

                    <span>

                        {employee.email}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Mobile

                    </strong>

                    <span>

                        {employee.mobile}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Alternate Mobile

                    </strong>

                    <span>

                        {employee.alternateMobile || "-"}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Department

                    </strong>

                    <span>

                        {employee.department}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Designation

                    </strong>

                    <span>

                        {employee.designation}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Status

                    </strong>

                    <span
                        className={
                            employee.status === "ACTIVE"
                                ? "active-status"
                                : "inactive-status"
                        }
                    >

                        {employee.status}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Date Of Joining

                    </strong>

                    <span>

                        {employee.dateOfJoining || "-"}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Salary

                    </strong>

                    <span>

                        {employee.salary || "-"}

                    </span>

                </div>


                <hr />


                {/* ==========================================
                    IDENTITY INFORMATION
                ========================================== */}

                <h3>

                    Identity Information

                </h3>


                <div className="detail-row">

                    <strong>

                        Aadhaar Number

                    </strong>

                    <span>

                        {employee.aadhaarNumber || "-"}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        PAN Card Number

                    </strong>

                    <span>

                        {employee.panNumber || "-"}

                    </span>

                </div>


                <hr />


                {/* ==========================================
                    EMERGENCY CONTACT
                ========================================== */}

                <h3>

                    Emergency Contact

                </h3>


                <div className="detail-row">

                    <strong>

                        Contact Name

                    </strong>

                    <span>

                        {employee.emergencyContactName || "-"}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Contact Number

                    </strong>

                    <span>

                        {employee.emergencyContactNumber || "-"}

                    </span>

                </div>


                <hr />


                {/* ==========================================
                    BANK DETAILS
                ========================================== */}

                <h3>

                    Bank Details

                </h3>


                <div className="detail-row">

                    <strong>

                        Bank Name

                    </strong>

                    <span>

                        {employee.bankName || "-"}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Account Holder

                    </strong>

                    <span>

                        {employee.accountHolderName || "-"}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Account Number

                    </strong>

                    <span>

                        {employee.accountNumber || "-"}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        IFSC Code

                    </strong>

                    <span>

                        {employee.ifscCode || "-"}

                    </span>

                </div>


                <hr />


                {/* ==========================================
                    ADDRESS
                ========================================== */}

                <h3>

                    Address

                </h3>


                <div className="detail-row">

                    <strong>

                        Address

                    </strong>

                    <span>

                        {employee.address || "-"}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        City

                    </strong>

                    <span>

                        {employee.city || "-"}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        State

                    </strong>

                    <span>

                        {employee.state || "-"}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Country

                    </strong>

                    <span>

                        {employee.country || "-"}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Pincode

                    </strong>

                    <span>

                        {employee.pincode || "-"}

                    </span>

                </div>


                <hr />


                {/* ==========================================
                    ADDITIONAL INFORMATION
                ========================================== */}

                <h3>

                    Additional Information

                </h3>


                <div className="detail-row">

                    <strong>

                        Note

                    </strong>

                    <span>

                        {employee.note || "-"}

                    </span>

                </div>


                <hr />


                {/* ==========================================
                    LOGIN ACCOUNT
                ========================================== */}

                <h3>

                    Login Account

                </h3>


                <div className="detail-row">

                    <strong>

                        Username

                    </strong>

                    <span>

                        {employee.username}

                    </span>

                </div>


                <div className="detail-row">

                    <strong>

                        Role

                    </strong>

                    <span className="role-badge">

                        {employee.role}

                    </span>

                </div>


            </div>

        </div>

    );

};


export default EmployeeDetails;