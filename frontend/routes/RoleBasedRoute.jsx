import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const RoleBasedRoute = ({
    children,
    role,
    allowedRoles = []
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

            <div className="flex justify-center items-center h-screen">

                Loading...

            </div>

        );

    }


    /*
     ==========================================
     USER NOT LOGGED IN
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
     NORMALIZE USER ROLE
     ==========================================
     */

    const userRole =
        user.role
            ?.replace("ROLE_", "")
            .toUpperCase();


    /*
     ==========================================
     BUILD ALLOWED ROLES
     ==========================================
     */

    let roles = [];


    /*
     ------------------------------------------
     SINGLE ROLE

     Example:

     <RoleBasedRoute role="ADMIN">
     ------------------------------------------
     */

    if (role) {

        roles.push(
            role
                .replace("ROLE_", "")
                .toUpperCase()
        );

    }


    /*
     ------------------------------------------
     MULTIPLE ROLES

     Example:

     <RoleBasedRoute
         allowedRoles={["ADMIN", "EMPLOYEE"]}
     >
     ------------------------------------------
     */

    if (allowedRoles.length > 0) {

        roles = [
            ...roles,
            ...allowedRoles.map(
                allowedRole =>
                    allowedRole
                        .replace("ROLE_", "")
                        .toUpperCase()
            )
        ];

    }


    /*
     ==========================================
     CHECK ROLE
     ==========================================
     */

    if (
        roles.length > 0 &&
        !roles.includes(userRole)
    ) {

        return (

            <Navigate
                to="/dashboard"
                replace
            />

        );

    }


    /*
     ==========================================
     ACCESS GRANTED
     ==========================================
     */

    return children;

};


export default RoleBasedRoute;