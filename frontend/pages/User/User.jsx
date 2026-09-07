import React, { useState } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";
import "./User.css";

const User = () => {

    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const handleAddUser = () => {
        setSelectedUser(null);
        setShowForm(true);
    };


    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowForm(true);
    };


    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedUser(null);
    };


    return (

        <div className="user-container">


            <div className="user-header">

                <h2>
                    User Management
                </h2>


                <button
                    className="add-user-btn"
                    onClick={handleAddUser}
                >
                    + Add Employee
                </button>

            </div>



            {
                showForm ? (

                    <UserForm
                        user={selectedUser}
                        onClose={handleCloseForm}
                    />

                ) : (

                    <UserList
                        onEdit={handleEditUser}
                    />

                )
            }


        </div>

    );
};


export default User;