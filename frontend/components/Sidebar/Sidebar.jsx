import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Building2,
    Boxes,
    Truck,
    Users,
    FileText,
    CheckCircle,
    ClipboardList,
    BarChart3,
    Palette,
    Monitor,
    Megaphone,
    Globe,
    UserCog,
    Bell,
    CalendarDays,
    Briefcase,
    ListTodo,
    Settings,
    Tag
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";


function Sidebar({ open = false, onClose = () => {} }) {

    const { user } = useAuth();


    /*
     ==========================================
     ROLES
     ==========================================
     */

    const roles =
        Array.isArray(user?.roles)
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
            user?.role || ""
        )
            .replace(/^ROLE_/, "")
            .toUpperCase();


    const isAdmin =
        normalizedSingleRole === "ADMIN"
        ||
        normalizedRoles.includes("ADMIN");


    /*
     ==========================================
     POSITION
     ==========================================
     */

    const position =
        String(
            user?.position || ""
        )
            .trim()
            .toUpperCase();


    /*
     ==========================================
     COMMON ITEMS
     ==========================================
     */

    const dashboardItem = {

        name: "Dashboard",

        path: "/dashboard",

        icon: (
            <LayoutDashboard
                size={20}
            />
        )

    };


    const openingItem = {

        name: "Job Openings",

        path: "/openings",

        icon: (
            <Briefcase
                size={20}
            />
        )

    };


    /*
     ==========================================
     ATTENDANCE
     ==========================================
     */

    const attendanceItem = {

        name: "Attendance",

        path:
            isAdmin
                ? "/attendance/admin"
                : "/hr/attendance",

        icon: (
            <CalendarDays
                size={20}
            />
        )

    };


    /*
     ==========================================
     ADMIN
     ==========================================
     */

    if (isAdmin) {

        return (

            <SidebarContainer open={open} onClose={onClose}>

                {
                    getAllMenuItems(
                        attendanceItem
                    ).map(
                        item => (

                            <SidebarItem
                                key={item.path}
                                item={item}
                            />

                        )
                    )
                }

            </SidebarContainer>

        );

    }


    /*
     ==========================================
     WEB DEVELOPMENT
     ==========================================
     */

    if (
        position === "WEB_DEVELOPMENT"
    ) {

        return (

            <SidebarContainer open={open} onClose={onClose}>



                <SidebarItem
                    item={openingItem}
                />

                <SidebarItem
                    item={{
                        name: "Web Development",
                        path: "/web/development",
                        icon: <Globe size={20} />
                    }}
                />

                <SidebarItem
                    item={{
                        name: "Web Dashboard",
                        path: "/web/dashboard",
                        icon: <Globe size={20} />
                    }}
                />

                <SidebarItem
                    item={attendanceItem}
                />

            </SidebarContainer>

        );

    }


    /*
     ==========================================
     DESIGN
     ==========================================
     */

    if (
        position === "DESIGN"
    ) {

        return (

            <SidebarContainer open={open} onClose={onClose}>



                <SidebarItem
                    item={openingItem}
                />

                <SidebarItem
                    item={{
                        name: "Design Projects",
                        path: "/design/projects",
                        icon: <Palette size={20} />
                    }}
                />

                <SidebarItem
                    item={{
                        name: "Design Dashboard",
                        path: "/design/dashboard",
                        icon: <Palette size={20} />
                    }}
                />

                <SidebarItem
                    item={{
                        name: "Box Dimensions",
                        path: "/box-dimensions",
                        icon: <Boxes size={20} />
                    }}
                />

                <SidebarItem
                    item={attendanceItem}
                />

            </SidebarContainer>

        );

    }


    /*
     ==========================================
     MARKETING
     ==========================================
     */

    if (
        position === "MARKETING"
    ) {

        return (

            <SidebarContainer open={open} onClose={onClose}>



                <SidebarItem
                    item={openingItem}
                />

                <SidebarItem
                    item={{
                        name: "Digital Marketing",
                        path: "/digital/marketing",
                        icon: <Megaphone size={20} />
                    }}
                />

                <SidebarItem
                    item={{
                        name: "Digital Dashboard",
                        path: "/digital/dashboard",
                        icon: <Monitor size={20} />
                    }}
                />

                <SidebarItem
                    item={attendanceItem}
                />

            </SidebarContainer>

        );

    }


    /*
     ==========================================
     MRP PRINTING
     ==========================================
     */

    if (
        position === "MRP_PRINTING"
    ) {

        return (

            <SidebarContainer open={open} onClose={onClose}>

                <SidebarItem
                    item={{
                        name: "MRP Master",
                        path: "/mrp",
                        icon: <Tag size={20} />
                    }}
                />

                <SidebarItem
                    item={attendanceItem}
                />

            </SidebarContainer>

        );

    }


    /*
     ==========================================
     LABOUR
     ==========================================
     */

    if (
        position === "LABOUR"
    ) {

        return (

            <SidebarContainer open={open} onClose={onClose}>

                <SidebarItem
                    item={attendanceItem}
                />

            </SidebarContainer>

        );

    }


    /*
     ==========================================
     NO POSITION
     ==========================================
     */

    return (

        <SidebarContainer open={open} onClose={onClose}>

        </SidebarContainer>

    );

}


/*
 ==========================================
 SIDEBAR CONTAINER
 ==========================================
 */

function SidebarContainer({
    children,
    open = false,
    onClose = () => {}
}) {

    return (

        <aside className={`sidebar${open ? " open" : ""}`}>

            <div className="sidebar-logo">
                POSHAN ERP
            </div>

            <div
                className="sidebar-menu"
                onClickCapture={(event) => {
                    if (event.target.closest("a")) {
                        onClose();
                    }
                }}
            >
                {children}
            </div>

        </aside>

    );

}


/*
 ==========================================
 SIDEBAR ITEM
 ==========================================
 */

function SidebarItem({
    item
}) {

    return (

        <NavLink
            to={item.path}
            className={({ isActive }) =>
                `sidebar-link${isActive ? " active" : ""}`
            }
        >

            <span className="sidebar-icon">
                {item.icon}
            </span>

            <span className="sidebar-label">
                {item.name}
            </span>

        </NavLink>

    );

}


/*
 ==========================================
 ADMIN MENU
 ==========================================
 */

function getAllMenuItems(
    attendanceItem
) {

    return [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <LayoutDashboard size={20} />
        },

        {
            name: "Tasks",
            path: "/tasks",
            icon: <ListTodo size={20} />
        },

        {
            name: "Job Openings",
            path: "/openings",
            icon: <Briefcase size={20} />
        },

        {
            name: "Company",
            path: "/company",
            icon: <Building2 size={20} />
        },

        {
            name: "Box Dimensions",
            path: "/box-dimensions",
            icon: <Boxes size={20} />
        },

        {
            name: "MRP Master",
            path: "/mrp",
            icon: <Tag size={20} />
        },

        {
            name: "Production Plan",
            path: "/production",
            icon: <Settings size={20} />
        },

        {
            name: "Inventory",
            path: "/inventory",
            icon: <Boxes size={20} />
        },

        {
            name: "Receiving Material",
            path: "/procurement/receiving-material",
            icon: <Truck size={20} />
        },

        {
            name: "Delivery",
            path: "/sales/delivery",
            icon: <Truck size={20} />
        },

        {
            name: "Vendor",
            path: "/procurement/vendors",
            icon: <Users size={20} />
        },

        {
            name: "Purchase Requisition",
            path: "/procurement/purchase-requisition",
            icon: <FileText size={20} />
        },

        {
            name: "Approval",
            path: "/approval",
            icon: <CheckCircle size={20} />
        },

        {
            name: "Purchase Order",
            path: "/procurement/purchase-order",
            icon: <ClipboardList size={20} />
        },

        {
            name: "Sales",
            path: "/sales",
            icon: <BarChart3 size={20} />
        },

        {
            name: "User Management",
            path: "/users",
            icon: <Users size={20} />
        },

        {
            name: "Sales Dashboard",
            path: "/sales/dashboard",
            icon: <BarChart3 size={20} />
        },

        {
            name: "Design Projects",
            path: "/design/projects",
            icon: <Palette size={20} />
        },

        {
            name: "Design Dashboard",
            path: "/design/dashboard",
            icon: <Palette size={20} />
        },

        {
            name: "Digital Marketing",
            path: "/digital/marketing",
            icon: <Megaphone size={20} />
        },

        {
            name: "Digital Dashboard",
            path: "/digital/dashboard",
            icon: <Monitor size={20} />
        },

        {
            name: "Web Development",
            path: "/web/development",
            icon: <Globe size={20} />
        },

        {
            name: "Web Dashboard",
            path: "/web/dashboard",
            icon: <Globe size={20} />
        },

        attendanceItem,

        {
            name: "Employee",
            path: "/hr/employee",
            icon: <UserCog size={20} />
        },

        {
            name: "Notifications",
            path: "/notifications",
            icon: <Bell size={20} />
        }

    ];

}


export default Sidebar;