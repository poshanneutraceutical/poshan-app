import { LogOut, UserCircle } from "lucide-react";
import NotificationBell from "../NotificationBell";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

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

        <div
            style={{
                height: "70px",
                background: "#ffffff",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 30px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
            }}
        >

            {/* Left */}

            <div>

                <h2>Poshan ERP</h2>

                <p
                    style={{
                        fontSize: "13px",
                        color: "gray"
                    }}
                >
                    {today}
                </p>

            </div>

            {/* Right */}

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}
            >

                {/* Notification */}

              <NotificationBell />

                {/* Profile */}
<div

    onClick={handleProfile}

    style={{

        display: "flex",

        alignItems: "center",

        gap: "10px",

        cursor: "pointer",

        padding: "8px 12px",

        borderRadius: "10px",

        transition: "all .25s ease"

    }}

    onMouseEnter={(e) => {

        e.currentTarget.style.background = "#f3f4f6";

    }}

    onMouseLeave={(e) => {

        e.currentTarget.style.background = "transparent";

    }}

>

    <UserCircle size={35} />

    <div>

        <h4
            style={{
                margin: 0
            }}
        >
            {employeeName}
        </h4>

        <p
            style={{
                fontSize: "12px",
                color: "gray",
                margin: 0
            }}
        >
            {employeeRole}
        </p>

    </div>

</div>

                {/* Logout */}

                <button

                    onClick={handleLogout}

                    style={{
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        padding: "8px 50px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}

                >

                    <LogOut size={18} />

                </button>

            </div>

        </div>

    );

}

export default Navbar;