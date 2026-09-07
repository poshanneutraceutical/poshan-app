import React, { useState } from "react";
import UserService from "../../services/UserService";
import "./User.css";


const UserForm = ({
    user,
    onClose
}) => {

    const [formData, setFormData] = useState({

        name:
            user?.name || "",

        username:
            user?.username || "",

        email:
            user?.email || "",

        password:
            "",

        roles:
            user?.roles || ["ROLE_EMPLOYEE"],

        position:
            user?.position || ""

    });


    /*
     ==========================================
     ROLES
     ==========================================
     */

    const rolesList = [

        "ROLE_EMPLOYEE",

        "ROLE_USER",

        "ROLE_ADMIN",

        "ROLE_SALES",

        "ROLE_PURCHASE",

        "ROLE_INVENTORY",

        "ROLE_HR",

        "ROLE_MARKETING"

    ];


    /*
     ==========================================
     POSITIONS
     ==========================================
     */

    const positionsList = [

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


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData(
            previous => ({

                ...previous,

                [name]: value

            })
        );

    };


    const handleRoleChange = (e) => {

        const selectedRoles =
            Array.from(
                e.target.selectedOptions,
                option =>
                    option.value
            );


        setFormData(
            previous => ({

                ...previous,

                roles:
                    selectedRoles

            })
        );

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            if (!formData.position) {

                alert(
                    "Please select a position."
                );

                return;

            }


            if (user) {

                await UserService.updateUser(
                    user.id,
                    formData
                );

            } else {

                await UserService.createUser(
                    formData
                );

            }


            onClose();

        } catch (error) {

            console.error(
                "User save failed",
                error
            );


            alert(
                error.response?.data?.message ||
                "Unable to save user."
            );

        }

    };


    return (

        <div className="user-form-container">

            <h3>

                {
                    user
                        ? "Update Employee"
                        : "Create Employee"
                }

            </h3>


            <form
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Employee Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />


                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />


                <input
                    type="password"
                    name="password"
                    placeholder={
                        user
                            ? "New Password (optional)"
                            : "Password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    required={!user}
                />


                {/* ==========================================
                    POSITION
                ========================================== */}

                <label>
                    Position
                </label>


                <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Position
                    </option>


                    {
                        positionsList.map(
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


                {/* ==========================================
                    ROLES
                ========================================== */}

                <label>
                    Assign Role
                </label>


                <select
                    multiple
                    value={formData.roles}
                    onChange={handleRoleChange}
                >

                    {
                        rolesList.map(
                            role => (

                                <option
                                    key={role}
                                    value={role}
                                >

                                    {role}

                                </option>

                            )
                        )
                    }

                </select>


                <div className="form-buttons">

                    <button
                        type="submit"
                        className="save-btn"
                    >

                        Save

                    </button>


                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onClose}
                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

};


export default UserForm;