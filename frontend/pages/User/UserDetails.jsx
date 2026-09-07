import React, {
    useEffect,
    useState
} from "react";

import { useParams } from "react-router-dom";

import UserService
    from "../../services/UserService";

import "./User.css";


const UserDetails = () => {

    const { id } = useParams();

    const [user, setUser] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        fetchUser();

    }, []);


    const fetchUser = async () => {

        try {

            const data =
                await UserService.getUserById(id);

            setUser(data);

        } catch (error) {

            console.error(
                "Failed to fetch user details",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <div className="loading">

                Loading user details...

            </div>

        );

    }


    if (!user) {

        return (

            <div className="empty-state">

                User not found

            </div>

        );

    }


    return (

        <div className="user-details-container">

            <h2>
                Employee Details
            </h2>


            <div className="user-details-card">

                <p>
                    <strong>Name:</strong>{" "}
                    {user.name}
                </p>


                <p>
                    <strong>Username:</strong>{" "}
                    {user.username}
                </p>


                <p>
                    <strong>Email:</strong>{" "}
                    {user.email}
                </p>


                <p>
                    <strong>Position:</strong>{" "}
                    {user.position || "-"}
                </p>


                <p>
                    <strong>Roles:</strong>{" "}
                    {user.roles?.join(", ")}
                </p>

            </div>

        </div>

    );

};


export default UserDetails;