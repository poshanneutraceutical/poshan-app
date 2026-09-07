import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./PositionBasedRoute.css";


const PositionBasedRoute = ({
    children,
    allowedPositions = [],
    allowAdmin = true
}) => {

    const {
        user,
        loading
    } = useAuth();


    /*
     ==========================================
     AUTH LOADING
     ==========================================
     */

    if (loading) {

        return (

            <div className="position-loading">

                Loading...

            </div>

        );

    }


    /*
     ==========================================
     NOT LOGGED IN
     ==========================================
     */

    if (!user) {

        return (

            <Navigate
                to="/"
                replace
            />

        );

    }


    /*
     ==========================================
     NORMALIZE ROLES
     ==========================================
     */

    const roles =
        Array.isArray(user.roles)
            ? user.roles
            : [];


    const normalizedRoles =
        roles.map(role => {

            if (
                typeof role === "object"
                && role !== null
            ) {

                return String(
                    role.name ||
                    role.role ||
                    ""
                )
                    .replace(/^ROLE_/, "")
                    .toUpperCase();

            }


            return String(role)
                .replace(/^ROLE_/, "")
                .toUpperCase();

        });


    const normalizedSingleRole =
        String(
            user.role || ""
        )
            .replace(/^ROLE_/, "")
            .toUpperCase();


    const isAdmin =
        normalizedSingleRole === "ADMIN"
        ||
        normalizedRoles.includes("ADMIN");


    /*
     ==========================================
     ADMIN ACCESS
     ==========================================
     */

    if (
        isAdmin
        &&
        allowAdmin
    ) {

        return children;

    }


    /*
     ==========================================
     USER POSITION
     ==========================================
     */

    const position =
        String(
            user.position || ""
        )
            .trim()
            .toUpperCase();


    /*
     ==========================================
     ALLOWED POSITIONS
     ==========================================
     */

    const normalizedAllowedPositions =
        allowedPositions.map(
            item =>
                String(item)
                    .trim()
                    .toUpperCase()
        );


    const allowed =
        normalizedAllowedPositions.includes(
            position
        );


    /*
     ==========================================
     ACCESS DENIED
     ==========================================
     */

    if (!allowed) {

        return (

            <div className="position-denied-page">

                <div className="position-denied-content">

                    <div className="position-denied-blur">

                        {children}

                    </div>


                    <div className="position-denied-overlay">

                        <div className="position-denied-card">

                            <div className="position-denied-icon">

                                🔒

                            </div>


                            <h2>

                                Access Restricted

                            </h2>


                            <p>

                                You do not have permission
                                to access this module.

                            </p>


                            <small>

                                Your position does not include
                                access to this section.

                            </small>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    /*
     ==========================================
     ACCESS GRANTED
     ==========================================
     */

    return children;

};


export default PositionBasedRoute;