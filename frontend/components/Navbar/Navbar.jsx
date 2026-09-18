import {
    LogOut,
    Menu,
    UserCircle,
    X
} from "lucide-react";

import NotificationBell
    from "../NotificationBell";

import {
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../../context/AuthContext";

import "./Navbar.css";


const normalizeRole = (
    value
) => {

    return String(
        value || ""
    )
        .replace(
            /^ROLE_/i,
            ""
        )
        .trim()
        .toUpperCase();

};


const formatUserPosition = (
    user
) => {

    const roles =
        Array.isArray(user?.roles)
            ? user.roles
            : [];


    const normalizedRoles =
        roles.map(
            role => {

                if (
                    typeof role === "object"
                    &&
                    role !== null
                ) {

                    return normalizeRole(
                        role.name ||
                        role.role ||
                        ""
                    );

                }

                return normalizeRole(
                    role
                );

            }
        );


    const isAdmin =
        normalizeRole(
            user?.role
        ) === "ADMIN"
        ||
        normalizedRoles.includes(
            "ADMIN"
        );


    if (isAdmin) {

        return "Administrator";

    }


    const labels = {

        WEB_DEVELOPMENT:
            "Web Development",

        DESIGN:
            "Design",

        MARKETING:
            "Marketing",

        MRP_PRINTING:
            "MRP Printing",

        LABOUR:
            "Labour"

    };


    const position =
        normalizeRole(
            user?.position
        );


    return (
        labels[position]
        ||
        (
            user?.role
                ? String(
                    user.role
                )
                    .replace(
                        /^ROLE_/i,
                        ""
                    )
                    .replace(
                        /_/g,
                        " "
                    )
                    .replace(
                        /\b\w/g,
                        char =>
                            char.toUpperCase()
                    )
                : "Employee"
        )
    );

};


function Navbar({
    onMenuToggle,
    sidebarOpen = false
}) {

    const {
        user,
        logout
    } = useAuth();


    const navigate =
        useNavigate();


    const employeeName =
        user?.name ||
        user?.username ||
        "User";


    const employeeRole =
        formatUserPosition(
            user
        );


    const today =
        new Intl.DateTimeFormat(
            "en-IN",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        ).format(
            new Date()
        );


    const handleLogout =
        async () => {

            try {

                await logout();

                navigate(
                    "/",
                    {
                        replace: true
                    }
                );

            } catch (error) {

                console.error(
                    "Logout Error:",
                    error
                );

            }

        };


    const handleProfile =
        () => {

            navigate(
                "/profile"
            );

        };


    return (

        <header className="app-navbar">

            <div className="navbar-left">

                <button
                    type="button"
                    className="navbar-menu-toggle"
                    onClick={
                        onMenuToggle
                    }
                    aria-label={
                        sidebarOpen
                            ? "Close menu"
                            : "Open menu"
                    }
                    aria-expanded={
                        sidebarOpen
                    }
                >

                    {
                        sidebarOpen ? (
                            <X size={22} />
                        ) : (
                            <Menu size={22} />
                        )
                    }

                </button>


                <div className="navbar-brand">

                    <h2>
                        Poshan ERP
                    </h2>

                    <p>
                        {today}
                    </p>

                </div>

            </div>


            <div className="navbar-actions">

                <div className="navbar-notification">

                    <NotificationBell />

                </div>


                <button
                    type="button"
                    className="navbar-profile"
                    onClick={
                        handleProfile
                    }
                    aria-label="Open profile"
                >

                    <UserCircle
                        className="navbar-profile-icon"
                    />


                    <span className="navbar-profile-info">

                        <strong>
                            {employeeName}
                        </strong>


                        <span>
                            {employeeRole}
                        </span>

                    </span>

                </button>


                <button
                    type="button"
                    className="navbar-logout"
                    onClick={
                        handleLogout
                    }
                    aria-label="Logout"
                    title="Logout"
                >

                    <LogOut size={18} />

                </button>

            </div>

        </header>

    );

}


export default Navbar;
