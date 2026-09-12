import { LogOut, Menu, UserCircle, X } from "lucide-react";
import NotificationBell from "../NotificationBell";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar({ onMenuToggle, sidebarOpen = false }) {

    const employeeName = "Admin";
    const employeeRole = "Administrator";
    const today = new Date().toLocaleDateString();

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {

        try {

            await logout();

            navigate("/", { replace: true });

        } catch (error) {

            console.error("Logout Error:", error);

        }

    };

    const handleProfile = () => {

        navigate("/profile");

    };

    return (

        <header className="app-navbar">

            <div className="navbar-left">

                <button
                    type="button"
                    className="navbar-menu-toggle"
                    onClick={onMenuToggle}
                    aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                    aria-expanded={sidebarOpen}
                >
                    {sidebarOpen ? (
                        <X size={22} />
                    ) : (
                        <Menu size={22} />
                    )}
                </button>

                <div className="navbar-brand">

                    <h2>Poshan ERP</h2>

                    <p>{today}</p>

                </div>

            </div>

            <div className="navbar-actions">

                <div className="navbar-notification">
                    <NotificationBell />
                </div>

                <button
                    type="button"
                    className="navbar-profile"
                    onClick={handleProfile}
                    aria-label="Open profile"
                >

                    <UserCircle className="navbar-profile-icon" />

                    <span className="navbar-profile-info">

                        <strong>{employeeName}</strong>

                        <span>{employeeRole}</span>

                    </span>

                </button>

                <button
                    type="button"
                    className="navbar-logout"
                    onClick={handleLogout}
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
