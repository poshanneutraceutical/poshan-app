import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

function DashboardLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="app-shell">

            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {sidebarOpen && (
                <button
                    type="button"
                    className="app-sidebar-overlay"
                    aria-label="Close navigation menu"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="app-main">

                <Navbar
                    sidebarOpen={sidebarOpen}
                    onMenuToggle={() =>
                        setSidebarOpen((current) => !current)
                    }
                />

                <main className="app-content">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;
