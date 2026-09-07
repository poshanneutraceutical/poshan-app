import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

function DashboardLayout() {

    return (

        <div
            style={{
                display: "flex",
                height: "100vh",
                overflow: "hidden"
            }}
        >

            {/* Sidebar */}

            <Sidebar />



            {/* Right Side */}

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                {/* Navbar */}

                <Navbar />



                {/* Page Content */}

                <div
                    style={{
                        flex: 1,
                        padding: "20px",
                        overflowY: "auto",
                        backgroundColor: "#f5f6fa"
                    }}
                >

                    <Outlet />

                </div>

            </div>

        </div>

    );

}

export default DashboardLayout;