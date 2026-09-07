import React, {
    useEffect,
    useState
} from "react";

import UserService
    from "../../services/UserService";

import "./User.css";


const UserList = ({
    onEdit
}) => {

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        fetchUsers();

    }, []);


    const fetchUsers = async () => {

        try {

            const data =
                await UserService.getAllUsers();

            setUsers(data);

        } catch (error) {

            console.error(
                "Error fetching users",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const handleDelete = async (
        id
    ) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this user?"
            );


        if (!confirmDelete) return;


        try {

            await UserService.deleteUser(id);


            setUsers(
                previous =>
                    previous.filter(
                        user =>
                            user.id !== id
                    )
            );

        } catch (error) {

            console.error(
                "Delete failed",
                error
            );

        }

    };


    if (loading) {

        return (

            <div className="loading">

                Loading users...

            </div>

        );

    }


    return (

        <div className="user-table-container">

            <table className="user-table">

                <thead>

                    <tr>

                        <th>
                            Name
                        </th>

                        <th>
                            Username
                        </th>

                        <th>
                            Email
                        </th>

                        <th>
                            Position
                        </th>

                        <th>
                            Roles
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {
                        users.length > 0
                            ? (

                                users.map(
                                    user => (

                                        <tr
                                            key={
                                                user.id
                                            }
                                        >

                                            <td>
                                                {user.name}
                                            </td>

                                            <td>
                                                {user.username}
                                            </td>

                                            <td>
                                                {user.email}
                                            </td>

                                            <td>
                                                {
                                                    user.position ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    user.roles?.join(
                                                        ", "
                                                    )
                                                }
                                            </td>

                                            <td>

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        onEdit(
                                                            user
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                            )
                            : (

                                <tr>

                                    <td
                                        colSpan="6"
                                    >

                                        No users found

                                    </td>

                                </tr>

                            )
                    }

                </tbody>

            </table>

        </div>

    );

};


export default UserList;