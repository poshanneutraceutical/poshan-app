import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmployeeService from "../../services/EmployeeService";

import "./Employee.css";


/*
=========================================================
DEPARTMENTS
=========================================================
*/

const departments = [

    "WEB_DEVELOPMENT",
    "MARKETING",
    "DESIGN",
    "PRODUCTION",
    "QUALITY",
    "SALES",
    "PURCHASE",
    "INVENTORY",
    "WAREHOUSE",
    "HR",
    "FINANCE",
    "ACCOUNTS",
    "IT",
    "ADMIN"

];


/*
=========================================================
DESIGNATIONS
=========================================================
*/

const designations = [

    "MANAGING_DIRECTOR",
    "DIRECTOR",
    "CHIEF_EXECUTIVE_OFFICER",
    "CHIEF_OPERATING_OFFICER",
    "PLANT_HEAD",
    "PLANT_MANAGER",
    "PRODUCTION_MANAGER",
    "QUALITY_MANAGER",
    "HR_MANAGER",
    "SALES_MANAGER",
    "PURCHASE_MANAGER",
    "INVENTORY_MANAGER",
    "FINANCE_MANAGER",
    "IT_MANAGER",
    "MARKETING_MANAGER",
    "TEAM_LEADER",
    "SHIFT_INCHARGE",
    "SUPERVISOR",
    "SALES_EXECUTIVE",
    "HR_EXECUTIVE",
    "PURCHASE_EXECUTIVE",
    "ACCOUNT_EXECUTIVE",
    "MARKETING_EXECUTIVE",
    "MACHINE_OPERATOR",
    "PRODUCTION_EXECUTIVE",
    "QUALITY_ANALYST",
    "QUALITY_INSPECTOR",
    "PACKAGING_EXECUTIVE",
    "STORE_KEEPER",
    "DISPATCH_EXECUTIVE",
    "SOFTWARE_DEVELOPER",
    "SYSTEM_ADMINISTRATOR",
    "SUPPORT_ENGINEER",
    "ACCOUNTANT",
    "CASHIER",
    "OFFICE_ASSISTANT",
    "RECEPTIONIST",
    "SECURITY_GUARD",
    "HOUSEKEEPING"

];


/*
=========================================================
USER POSITIONS

IMPORTANT:
These values MUST match UserPosition.java
=========================================================
*/

const positions = [

    {
        value: "WEB_DEVELOPMENT",
        label: "Web Development"
    },

    {
        value: "DESIGN",
        label: "Design"
    },

    {
        value: "MARKETING",
        label: "Marketing"
    },

    {
        value: "MRP_PRINTING",
        label: "MRP Printing"
    },

    {
        value: "LABOUR",
        label: "Labour"
    }

];


/*
=========================================================
ROLES
=========================================================
*/

const roles = [

    "ROLE_ADMIN",
    "ROLE_EMPLOYEE"

];


/*
=========================================================
EMPLOYEE STATUS
=========================================================
*/

const statusList = [

    "ACTIVE",
    "INACTIVE",
    "PROBATION",
    "ON_LEAVE",
    "RESIGNED",
    "TERMINATED",
    "RETIRED"

];


/*
=========================================================
EMPLOYEE FORM
=========================================================
*/

const EmployeeForm = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);


    /*
    =====================================================
    LOADING
    =====================================================
    */

    const [loading, setLoading] = useState(false);


    /*
    =====================================================
    PROFILE IMAGE FILE
    =====================================================
    */

    const [profileImageFile, setProfileImageFile] =
        useState(null);


    /*
    =====================================================
    IMAGE PREVIEW
    =====================================================
    */

    const [imagePreview, setImagePreview] =
        useState("");


    /*
    =====================================================
    EMPLOYEE DATA
    =====================================================
    */

    const [employee, setEmployee] = useState({

        firstName: "",

        lastName: "",

        email: "",

        mobile: "",

        alternateMobile: "",

        aadhaarNumber: "",

        panNumber: "",

        emergencyContactName: "",

        emergencyContactNumber: "",

        bankName: "",

        accountHolderName: "",

        accountNumber: "",

        ifscCode: "",

        note: "",

        department: "",

        designation: "",

        status: "ACTIVE",

        dateOfJoining: "",

        salary: "",

        address: "",

        city: "",

        state: "",

        country: "",

        pincode: "",

        profileImage: "",

        username: "",

        password: "",

        role: "ROLE_EMPLOYEE",

        /*
        IMPORTANT:
        This is the ERP access position.
        */

        position: ""

    });


    /*
    =====================================================
    GET BACKEND IMAGE URL
    =====================================================
    */

    const getImageUrl = (imagePath) => {

        if (!imagePath) {

            return "";

        }


        /*
        -------------------------------------------------
        Already a complete URL
        -------------------------------------------------
        */

        if (

            imagePath.startsWith("http://") ||

            imagePath.startsWith("https://") ||

            imagePath.startsWith("blob:")

        ) {

            return imagePath;

        }


        /*
        -------------------------------------------------
        BACKEND URL
        -------------------------------------------------

        If VITE_API_URL is:

        http://localhost:8080/api

        remove /api and get:

        http://localhost:8080
        -------------------------------------------------
        */

        const apiUrl =
            import.meta.env.VITE_API_URL ||
            "http://localhost:8080/api";


        const backendUrl =
            apiUrl.replace(/\/api\/?$/, "");


        if (imagePath.startsWith("/")) {

            return backendUrl + imagePath;

        }


        return backendUrl + "/" + imagePath;

    };


    /*
    =====================================================
    LOAD EMPLOYEE WHEN EDITING
    =====================================================
    */

    useEffect(() => {

        if (isEdit) {

            loadEmployee();

        }

    }, [id]);


    /*
    =====================================================
    LOAD EMPLOYEE
    =====================================================
    */

    const loadEmployee = async () => {

        try {

            const response =
                await EmployeeService.getEmployeeById(id);


            setEmployee({

                ...response.data,

                password: "",

                /*
                If backend returns null,
                keep it as empty string.
                */

                position:
                    response.data.position || ""

            });


            /*
            -------------------------------------------------
            EXISTING PROFILE IMAGE
            -------------------------------------------------
            */

            if (response.data.profileImage) {

                setImagePreview(

                    getImageUrl(
                        response.data.profileImage
                    )

                );

            }

        }

        catch (error) {

            console.error(
                "Unable to load employee",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to load employee."
            );

        }

    };


    /*
    =====================================================
    HANDLE NORMAL INPUT
    =====================================================
    */

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setEmployee(previous => ({

            ...previous,

            [name]: value

        }));

    };


    /*
    =====================================================
    HANDLE PROFILE IMAGE
    =====================================================
    */

    const handleProfileImageChange = (e) => {

        const file =
            e.target.files?.[0];


        if (!file) {

            return;

        }


        /*
        -------------------------------------------------
        VALIDATE IMAGE TYPE
        -------------------------------------------------
        */

        if (!file.type.startsWith("image/")) {

            alert(
                "Please select a valid image file."
            );

            e.target.value = "";

            return;

        }


        /*
        -------------------------------------------------
        VALIDATE IMAGE SIZE
        -------------------------------------------------
        */

        if (file.size > 20 * 1024 * 1024) {

            alert(
                "Profile image must be less than 20MB."
            );

            e.target.value = "";

            return;

        }


        /*
        -------------------------------------------------
        REMOVE OLD BLOB PREVIEW
        -------------------------------------------------
        */

        if (

            imagePreview &&

            imagePreview.startsWith("blob:")

        ) {

            URL.revokeObjectURL(
                imagePreview
            );

        }


        /*
        -------------------------------------------------
        SAVE SELECTED FILE
        -------------------------------------------------
        */

        setProfileImageFile(file);


        /*
        -------------------------------------------------
        CREATE LIVE PREVIEW
        -------------------------------------------------
        */

        const previewUrl =
            URL.createObjectURL(file);


        setImagePreview(
            previewUrl
        );

    };


    /*
    =====================================================
    REMOVE PROFILE IMAGE
    =====================================================
    */

    const removeProfileImage = () => {

        /*
        -------------------------------------------------
        REVOKE TEMPORARY BLOB URL
        -------------------------------------------------
        */

        if (

            imagePreview &&

            imagePreview.startsWith("blob:")

        ) {

            URL.revokeObjectURL(
                imagePreview
            );

        }


        setProfileImageFile(null);

        setImagePreview("");


        /*
        -------------------------------------------------
        CLEAR EXISTING IMAGE
        -------------------------------------------------
        */

        setEmployee(previous => ({

            ...previous,

            profileImage: ""

        }));


        /*
        -------------------------------------------------
        RESET FILE INPUT
        -------------------------------------------------
        */

        const fileInput =
            document.getElementById(
                "employee-profile-image"
            );


        if (fileInput) {

            fileInput.value = "";

        }

    };


    /*
    =====================================================
    CLEANUP IMAGE PREVIEW
    =====================================================
    */

    useEffect(() => {

        return () => {

            if (

                imagePreview &&

                imagePreview.startsWith("blob:")

            ) {

                URL.revokeObjectURL(
                    imagePreview
                );

            }

        };

    }, [imagePreview]);


    /*
    =====================================================
    VALIDATE FORM
    =====================================================
    */

    const validateForm = () => {

        if (!employee.firstName.trim()) {

            alert(
                "Please enter first name."
            );

            return false;

        }


        if (!employee.email.trim()) {

            alert(
                "Please enter employee email."
            );

            return false;

        }


        if (!employee.mobile.trim()) {

            alert(
                "Please enter mobile number."
            );

            return false;

        }


        if (!employee.department) {

            alert(
                "Please select department."
            );

            return false;

        }


        if (!employee.designation) {

            alert(
                "Please select designation."
            );

            return false;

        }


        /*
        -------------------------------------------------
        POSITION IS REQUIRED

        This controls ERP module access.
        -------------------------------------------------
        */

        if (!employee.position) {

            alert(
                "Please select employee position."
            );

            return false;

        }


        if (!employee.username.trim()) {

            alert(
                "Please enter username."
            );

            return false;

        }


        if (!isEdit && !employee.password) {

            alert(
                "Please enter password."
            );

            return false;

        }


        if (!employee.role) {

            alert(
                "Please select role."
            );

            return false;

        }


        return true;

    };


    /*
    =====================================================
    SAVE / UPDATE EMPLOYEE
    =====================================================
    */

    const handleSubmit = async (e) => {

        e.preventDefault();


        /*
        -------------------------------------------------
        VALIDATE
        -------------------------------------------------
        */

        if (!validateForm()) {

            return;

        }


        try {

            setLoading(true);


            /*
            -------------------------------------------------
            PREPARE PAYLOAD

            Do not send empty password while editing.
            -------------------------------------------------
            */

            const payload = {

                ...employee,

                firstName:
                    employee.firstName.trim(),

                lastName:
                    employee.lastName.trim(),

                email:
                    employee.email.trim(),

                mobile:
                    employee.mobile.trim(),

                username:
                    employee.username.trim(),

                role:
                    employee.role,

                position:
                    employee.position

            };


            if (isEdit && !payload.password) {

                delete payload.password;

            }


            /*
            =================================================
            CREATE
            =================================================
            */

            if (!isEdit) {

                await EmployeeService.createEmployee(

                    payload,

                    profileImageFile

                );


                alert(
                    "Employee created successfully."
                );

            }


            /*
            =================================================
            UPDATE
            =================================================
            */

            else {

                await EmployeeService.updateEmployee(

                    id,

                    payload,

                    profileImageFile

                );


                alert(
                    "Employee updated successfully."
                );

            }


            /*
            -------------------------------------------------
            RETURN TO EMPLOYEE LIST
            -------------------------------------------------
            */

            navigate(
                "/hr/employee"
            );

        }

        catch (error) {

            console.error(
                "Employee save error:",
                error
            );


            /*
            -------------------------------------------------
            BETTER ERROR MESSAGE
            -------------------------------------------------
            */

            if (
                error.response?.status === 403
            ) {

                alert(
                    "Access denied (403). Your logged-in account does not have permission to create or update employees."
                );

            }

            else if (
                error.response?.status === 401
            ) {

                alert(
                    "Your login session has expired. Please login again."
                );

            }

            else {

                alert(

                    error.response?.data?.message ||

                    error.response?.data ||

                    "Unable to save employee."

                );

            }

        }

        finally {

            setLoading(false);

        }

    };


    /*
    =====================================================
    RENDER
    =====================================================
    */

    return (

        <div className="employee-form-container">


            <h2>

                {

                    isEdit

                        ?

                        "Update Employee"

                        :

                        "Add Employee"

                }

            </h2>


            <form
                onSubmit={handleSubmit}
            >


                <div className="form-grid">


                    {/* =================================================
                        EMPLOYEE INFORMATION
                    ================================================= */}

                    <div className="full-width">

                        <h3 className="section-title">

                            Employee Information

                        </h3>

                    </div>


                    <div>

                        <label>

                            First Name

                        </label>


                        <input

                            type="text"

                            name="firstName"

                            value={
                                employee.firstName
                            }

                            onChange={
                                handleChange
                            }

                            required

                        />

                    </div>


                    <div>

                        <label>

                            Last Name

                        </label>


                        <input

                            type="text"

                            name="lastName"

                            value={
                                employee.lastName
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    <div>

                        <label>

                            Email

                        </label>


                        <input

                            type="email"

                            name="email"

                            value={
                                employee.email
                            }

                            onChange={
                                handleChange
                            }

                            required

                        />

                    </div>


                    <div>

                        <label>

                            Mobile Number

                        </label>


                        <input

                            type="text"

                            name="mobile"

                            value={
                                employee.mobile
                            }

                            onChange={
                                handleChange
                            }

                            required

                        />

                    </div>


                    <div>

                        <label>

                            Alternate Mobile Number

                        </label>


                        <input

                            type="text"

                            name="alternateMobile"

                            value={
                                employee.alternateMobile
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    {/* =================================================
                        DEPARTMENT
                    ================================================= */}

                    <div>

                        <label>

                            Department

                        </label>


                        <select

                            name="department"

                            value={
                                employee.department
                            }

                            onChange={
                                handleChange
                            }

                            required

                        >

                            <option value="">

                                Select Department

                            </option>


                            {

                                departments.map(
                                    department => (

                                        <option

                                            key={
                                                department
                                            }

                                            value={
                                                department
                                            }

                                        >

                                            {
                                                department
                                            }

                                        </option>

                                    )

                                )

                            }

                        </select>

                    </div>


                    {/* =================================================
                        DESIGNATION
                    ================================================= */}

                    <div>

                        <label>

                            Designation

                        </label>


                        <select

                            name="designation"

                            value={
                                employee.designation
                            }

                            onChange={
                                handleChange
                            }

                            required

                        >

                            <option value="">

                                Select Designation

                            </option>


                            {

                                designations.map(
                                    designation => (

                                        <option

                                            key={
                                                designation
                                            }

                                            value={
                                                designation
                                            }

                                        >

                                            {
                                                designation
                                            }

                                        </option>

                                    )

                                )

                            }

                        </select>

                    </div>


                    {/* =================================================
                        ERP POSITION
                    ================================================= */}

                    <div>

                        <label>

                            ERP Position

                        </label>


                        <select

                            name="position"

                            value={
                                employee.position
                            }

                            onChange={
                                handleChange
                            }

                            required

                        >

                            <option value="">

                                Select ERP Position

                            </option>


                            {

                                positions.map(
                                    position => (

                                        <option

                                            key={
                                                position.value
                                            }

                                            value={
                                                position.value
                                            }

                                        >

                                            {
                                                position.label
                                            }

                                        </option>

                                    )

                                )

                            }

                        </select>


                        <small>

                            This position controls which ERP modules the employee can access.

                        </small>

                    </div>


                    {/* =================================================
                        STATUS
                    ================================================= */}

                    <div>

                        <label>

                            Status

                        </label>


                        <select

                            name="status"

                            value={
                                employee.status
                            }

                            onChange={
                                handleChange
                            }

                        >

                            {

                                statusList.map(
                                    status => (

                                        <option

                                            key={
                                                status
                                            }

                                            value={
                                                status
                                            }

                                        >

                                            {
                                                status
                                            }

                                        </option>

                                    )

                                )

                            }

                        </select>

                    </div>


                    {/* =================================================
                        DATE OF JOINING
                    ================================================= */}

                    <div>

                        <label>

                            Date Of Joining

                        </label>


                        <input

                            type="date"

                            name="dateOfJoining"

                            value={
                                employee.dateOfJoining || ""
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    {/* =================================================
                        SALARY
                    ================================================= */}

                    <div>

                        <label>

                            Salary

                        </label>


                        <input

                            type="number"

                            name="salary"

                            value={
                                employee.salary || ""
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    {/* =================================================
                        PROFILE IMAGE
                    ================================================= */}

                    <div className="profile-upload-section">

                        <label>

                            Employee Profile Image

                        </label>


                        <input

                            id="employee-profile-image"

                            type="file"

                            accept="image/*"

                            onChange={
                                handleProfileImageChange
                            }

                        />


                        <small>

                            Maximum size: 20MB

                        </small>

                    </div>


                    {/* =================================================
                        PROFILE IMAGE PREVIEW
                    ================================================= */}

                    {

                        imagePreview && (

                            <div className="employee-image-preview">


                                <div className="preview-image-container">

                                    <img

                                        src={
                                            imagePreview
                                        }

                                        alt="Employee Profile Preview"

                                        className="profile-preview-image"

                                    />

                                </div>


                                <div className="preview-image-info">

                                    <strong>

                                        Profile Image Preview

                                    </strong>


                                    {

                                        profileImageFile && (

                                            <span>

                                                {
                                                    profileImageFile.name
                                                }

                                            </span>

                                        )

                                    }


                                    {

                                        !profileImageFile &&
                                        isEdit && (

                                            <span>

                                                Current profile image

                                            </span>

                                        )

                                    }


                                    <button

                                        type="button"

                                        className="remove-image-btn"

                                        onClick={
                                            removeProfileImage
                                        }

                                    >

                                        Remove Image

                                    </button>

                                </div>


                            </div>

                        )

                    }


                    {/* =================================================
                        ADDRESS
                    ================================================= */}

                    <div className="full-width">

                        <h3 className="section-title">

                            Address

                        </h3>

                    </div>


                    <div className="full-width">

                        <label>

                            Address

                        </label>


                        <textarea

                            name="address"

                            value={
                                employee.address
                            }

                            onChange={
                                handleChange
                            }

                            rows="3"

                        />

                    </div>


                    <div>

                        <label>

                            City

                        </label>


                        <input

                            type="text"

                            name="city"

                            value={
                                employee.city
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    <div>

                        <label>

                            State

                        </label>


                        <input

                            type="text"

                            name="state"

                            value={
                                employee.state
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    <div>

                        <label>

                            Country

                        </label>


                        <input

                            type="text"

                            name="country"

                            value={
                                employee.country
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    <div>

                        <label>

                            Pincode

                        </label>


                        <input

                            type="text"

                            name="pincode"

                            value={
                                employee.pincode
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    {/* =================================================
                        IDENTITY INFORMATION
                    ================================================= */}

                    <div className="full-width">

                        <h3 className="section-title">

                            Identity Information

                        </h3>

                    </div>


                    <div>

                        <label>

                            Aadhaar Number

                        </label>


                        <input

                            type="text"

                            name="aadhaarNumber"

                            value={
                                employee.aadhaarNumber
                            }

                            onChange={
                                handleChange
                            }

                            maxLength="12"

                        />

                    </div>


                    <div>

                        <label>

                            PAN Card Number

                        </label>


                        <input

                            type="text"

                            name="panNumber"

                            value={
                                employee.panNumber
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    {/* =================================================
                        EMERGENCY CONTACT
                    ================================================= */}

                    <div className="full-width">

                        <h3 className="section-title">

                            Emergency Contact

                        </h3>

                    </div>


                    <div>

                        <label>

                            Emergency Contact Name

                        </label>


                        <input

                            type="text"

                            name="emergencyContactName"

                            value={
                                employee.emergencyContactName
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    <div>

                        <label>

                            Emergency Contact Number

                        </label>


                        <input

                            type="text"

                            name="emergencyContactNumber"

                            value={
                                employee.emergencyContactNumber
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    {/* =================================================
                        BANK DETAILS
                    ================================================= */}

                    <div className="full-width">

                        <h3 className="section-title">

                            Bank Details

                        </h3>

                    </div>


                    <div>

                        <label>

                            Bank Name

                        </label>


                        <input

                            type="text"

                            name="bankName"

                            value={
                                employee.bankName
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    <div>

                        <label>

                            Account Holder Name

                        </label>


                        <input

                            type="text"

                            name="accountHolderName"

                            value={
                                employee.accountHolderName
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    <div>

                        <label>

                            Account Number

                        </label>


                        <input

                            type="text"

                            name="accountNumber"

                            value={
                                employee.accountNumber
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    <div>

                        <label>

                            IFSC Code

                        </label>


                        <input

                            type="text"

                            name="ifscCode"

                            value={
                                employee.ifscCode
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    {/* =================================================
                        NOTE
                    ================================================= */}

                    <div className="full-width">

                        <h3 className="section-title">

                            Additional Information

                        </h3>

                    </div>


                    <div className="full-width">

                        <label>

                            Note

                        </label>


                        <textarea

                            name="note"

                            value={
                                employee.note
                            }

                            onChange={
                                handleChange
                            }

                            rows="4"

                            placeholder="Add any additional notes..."

                        />

                    </div>


                    {/* =================================================
                        LOGIN ACCOUNT
                    ================================================= */}

                    <div className="full-width">

                        <h3 className="section-title">

                            Login Account

                        </h3>

                    </div>


                    <div>

                        <label>

                            Username

                        </label>


                        <input

                            type="text"

                            name="username"

                            value={
                                employee.username
                            }

                            onChange={
                                handleChange
                            }

                            required

                        />

                    </div>


                    <div>

                        <label>

                            Password

                        </label>


                        <input

                            type="password"

                            name="password"

                            value={
                                employee.password
                            }

                            onChange={
                                handleChange
                            }

                            placeholder={

                                isEdit

                                    ?

                                    "Leave blank to keep current password"

                                    :

                                    ""

                            }

                            required={
                                !isEdit
                            }

                        />

                    </div>


                    <div>

                        <label>

                            Role

                        </label>


                        <select

                            name="role"

                            value={
                                employee.role
                            }

                            onChange={
                                handleChange
                            }

                            required

                        >

                            {

                                roles.map(
                                    role => (

                                        <option

                                            key={
                                                role
                                            }

                                            value={
                                                role
                                            }

                                        >

                                            {
                                                role
                                            }

                                        </option>

                                    )

                                )

                            }

                        </select>

                    </div>


                </div>


                {/* =================================================
                    FORM ACTIONS
                ================================================= */}

                <div className="form-actions">


                    <button

                        type="submit"

                        className="save-btn"

                        disabled={
                            loading
                        }

                    >

                        {

                            loading

                                ?

                                "Saving..."

                                :

                                isEdit

                                    ?

                                    "Update Employee"

                                    :

                                    "Create Employee"

                        }

                    </button>


                    <button

                        type="button"

                        className="cancel-btn"

                        disabled={
                            loading
                        }

                        onClick={() =>
                            navigate(
                                "/hr/employee"
                            )
                        }

                    >

                        Cancel

                    </button>


                </div>


            </form>

        </div>

    );

};


export default EmployeeForm;