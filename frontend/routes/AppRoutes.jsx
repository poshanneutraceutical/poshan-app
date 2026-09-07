import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Notification
    from "../pages/Notification/Notification";

import "../pages/Company/Company.css";

import Login
    from "../pages/Login/Login";

import RoleBasedRoute
    from "./RoleBasedRoute";

import ProtectedRoute
    from "./ProtectedRoute";

import PositionBasedRoute
    from "./PositionBasedRoute";

import Dashboard
    from "../pages/Dashboard/Dashboard";

import WebDevelopment
    from "../pages/WebDevelopment/WebDevelopment";

import DigitalMarketing
    from "../pages/DigitalMarketing/DigitalMarketing";

import Designing
    from "../pages/Designing/Designing";

import Company
    from "../pages/Company/Company";

import Inventory
    from "../pages/Inventory/Inventory";

import Attendance
    from "../pages/Attendance/Attendance";

import AdminAttendance
    from "../pages/Attendance/AdminAttendance";

import ReceivingMaterial
    from "../pages/ReceivingMaterial/ReceivingMaterial";

import Delivery
    from "../pages/Delivery/Delivery";

import Vendor
    from "../pages/Vendor/Vendor";

import PurchaseRequisition
    from "../pages/PurchaseRequisition/PurchaseRequisition";

import PurchaseOrder
    from "../pages/PurchaseOrder/PurchaseOrder";

import Opening
    from "../pages/Opening/Opening";

import OpeningForm
    from "../pages/Opening/OpeningForm";

import OpeningDetails
    from "../pages/Opening/OpeningDetails";

import Approval
    from "../pages/Approval/Approval";

import Task
    from "../pages/Task/Task";

import TaskForm
    from "../pages/Task/TaskForm";

import TaskDetails
    from "../pages/Task/TaskDetails";

import TaskEdit
    from "../pages/Task/TaskEdit";

import SalesDashboard
    from "../pages/SalesDashboard/SalesDashboard";

import DesigningDashboard
    from "../pages/DesigningDashboard/DesigningDashboard";

import DigitalDashboard
    from "../pages/DigitalDashboard/DigitalDashboard";

import WebDashboard
    from "../pages/WebDashboard/WebDashboard";

import User
    from "../pages/User/User";

import UserDetails
    from "../pages/User/UserDetails";

import Employee
    from "../pages/Employee/Employee";

import Production
    from "../pages/Production/Production";

import ProductionDetails
    from "../pages/Production/ProductionDetails";

import DashboardLayout
    from "../layouts/DashboardLayout";

import BoxDimension
    from "../pages/BoxDimension/BoxDimension";

import Profile
    from "../pages/Profile/Profile";

import ChangePassword
    from "../pages/ChangePassword/ChangePassword";

import MRP
    from "../pages/MRP/MRP";

import MRPForm
    from "../pages/MRP/MRPForm";

import MRPDetails
    from "../pages/MRP/MRPDetails";


function AppRoutes() {

    return (

        <Routes>


            {/* =====================================================
                LOGIN
            ===================================================== */}

            <Route
                path="/"
                element={<Login />}
            />


            {/* =====================================================
                ADMIN USER MANAGEMENT
                ADMIN ONLY
            ===================================================== */}

            <Route
                path="/users"
                element={

                    <ProtectedRoute>

                        <RoleBasedRoute role="ADMIN">

                            <User />

                        </RoleBasedRoute>

                    </ProtectedRoute>

                }
            />


            <Route
                path="/users/:id"
                element={

                    <ProtectedRoute>

                        <RoleBasedRoute role="ADMIN">

                            <UserDetails />

                        </RoleBasedRoute>

                    </ProtectedRoute>

                }
            />


            {/* =====================================================
                PROTECTED ERP ROUTES
            ===================================================== */}

            <Route
                element={

                    <ProtectedRoute>

                        <DashboardLayout />

                    </ProtectedRoute>

                }
            >


                {/* =================================================
                    MAIN DASHBOARD
                    ADMIN ONLY
                ================================================= */}

                <Route
                    path="/dashboard"
                    element={
                        <RoleBasedRoute role="ADMIN">
                            <Dashboard />
                        </RoleBasedRoute>
                    }
                />


                {/* =================================================
                    PROFILE

                    ALL LOGGED-IN USERS
                ================================================= */}

                <Route
                    path="/profile"
                    element={<Profile />}
                />


                <Route
                    path="/change-password"
                    element={<ChangePassword />}
                />


                {/* =================================================
                    COMPANY
                    ADMIN ONLY
                ================================================= */}

                <Route
                    path="/company/*"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <Company />

                        </RoleBasedRoute>

                    }
                />


                {/* =================================================
                    BOX DIMENSIONS
                    ADMIN
                    DESIGN
                ================================================= */}

                <Route
                    path="/box-dimensions/*"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "DESIGN"
                            ]}
                        >

                            <BoxDimension />

                        </PositionBasedRoute>

                    }
                />


                {/* =================================================
                    PRODUCTION
                    ADMIN ONLY
                ================================================= */}

                <Route
                    path="/production"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <Production />

                        </RoleBasedRoute>

                    }
                />


                <Route
                    path="/production/:id"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <ProductionDetails />

                        </RoleBasedRoute>

                    }
                />


                {/* =================================================
                    INVENTORY
                    ADMIN ONLY
                ================================================= */}

                <Route
                    path="/inventory/*"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <Inventory />

                        </RoleBasedRoute>

                    }
                />


                {/* =================================================
                    PROCUREMENT
                    ADMIN ONLY
                ================================================= */}

                <Route
                    path="/procurement/receiving-material/*"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <ReceivingMaterial />

                        </RoleBasedRoute>

                    }
                />


                <Route
                    path="/procurement/vendors/*"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <Vendor />

                        </RoleBasedRoute>

                    }
                />


                <Route
                    path="/procurement/purchase-requisition/*"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <PurchaseRequisition />

                        </RoleBasedRoute>

                    }
                />


                <Route
                    path="/procurement/purchase-order/*"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <PurchaseOrder />

                        </RoleBasedRoute>

                    }
                />


                {/* =================================================
                    TASK MODULE
                    ADMIN ONLY
                ================================================= */}

                <Route
                    path="/tasks"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <Task />

                        </RoleBasedRoute>

                    }
                />


                <Route
                    path="/tasks/add"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <TaskForm />

                        </RoleBasedRoute>

                    }
                />


                <Route
                    path="/tasks/edit/:id"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <TaskEdit />

                        </RoleBasedRoute>

                    }
                />


                <Route
                    path="/tasks/:id"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <TaskDetails />

                        </RoleBasedRoute>

                    }
                />


                {/* =================================================
                    SALES
                    ADMIN ONLY
                ================================================= */}

                <Route
                    path="/sales/delivery/*"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <Delivery />

                        </RoleBasedRoute>

                    }
                />


                <Route
                    path="/sales/dashboard"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <SalesDashboard />

                        </RoleBasedRoute>

                    }
                />


                {/* =================================================
                    APPROVAL
                    ADMIN ONLY
                ================================================= */}

                <Route
                    path="/approval"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <Approval />

                        </RoleBasedRoute>

                    }
                />


                {/* =================================================
                    DESIGN PROJECTS

                    ADMIN
                    DESIGN
                ================================================= */}

                <Route
                    path="/design/projects"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "DESIGN"
                            ]}
                        >

                            <Designing />

                        </PositionBasedRoute>

                    }
                />


                {/* =================================================
                    DESIGN DASHBOARD

                    ADMIN
                    DESIGN
                ================================================= */}

                <Route
                    path="/design/dashboard"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "DESIGN"
                            ]}
                        >

                            <DesigningDashboard />

                        </PositionBasedRoute>

                    }
                />


                {/* =================================================
                    DIGITAL MARKETING

                    ADMIN
                    MARKETING
                ================================================= */}

                <Route
                    path="/digital/marketing"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "MARKETING"
                            ]}
                        >

                            <DigitalMarketing />

                        </PositionBasedRoute>

                    }
                />


                {/* =================================================
                    DIGITAL DASHBOARD

                    ADMIN
                    MARKETING
                ================================================= */}

                <Route
                    path="/digital/dashboard"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "MARKETING"
                            ]}
                        >

                            <DigitalDashboard />

                        </PositionBasedRoute>

                    }
                />


                {/* =================================================
                    WEB DEVELOPMENT

                    ADMIN
                    WEB_DEVELOPMENT
                ================================================= */}

                <Route
                    path="/web/development/*"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "WEB_DEVELOPMENT"
                            ]}
                        >

                            <WebDevelopment />

                        </PositionBasedRoute>

                    }
                />


                {/* =================================================
                    WEB DASHBOARD

                    ADMIN
                    WEB_DEVELOPMENT
                ================================================= */}

                <Route
                    path="/web/dashboard"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "WEB_DEVELOPMENT"
                            ]}
                        >

                            <WebDashboard />

                        </PositionBasedRoute>

                    }
                />


                {/* =================================================
                    ADMIN ATTENDANCE
                    ADMIN ONLY

                    Admin can see attendance of all employees.
                ================================================= */}

                <Route
                    path="/attendance/admin"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <AdminAttendance />

                        </RoleBasedRoute>

                    }
                />


                {/* =================================================
                    EMPLOYEE ATTENDANCE

                    ADMIN
                    EMPLOYEE

                    PositionBasedRoute can also be used here
                    if LABOUR / other positions need attendance.
                ================================================= */}

                <Route
                    path="/hr/attendance"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "WEB_DEVELOPMENT",
                                "DESIGN",
                                "MARKETING",
                                "MRP_PRINTING",
                                "LABOUR"
                            ]}
                        >

                            <Attendance />

                        </PositionBasedRoute>

                    }
                />


                {/* =================================================
                    EMPLOYEE MANAGEMENT
                    ADMIN ONLY
                ================================================= */}

                <Route
                    path="/hr/employee/*"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <Employee />

                        </RoleBasedRoute>

                    }
                />


                {/* =================================================
                    MRP MASTER

                    ADMIN
                    MRP_PRINTING
                ================================================= */}

                <Route
                    path="/mrp/*"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "MRP_PRINTING"
                            ]}
                        >

                            <MRP />

                        </PositionBasedRoute>

                    }
                />


                <Route
                    path="/mrp/add"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "MRP_PRINTING"
                            ]}
                        >

                            <MRPForm />

                        </PositionBasedRoute>

                    }
                />


                <Route
                    path="/mrp/:id"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "MRP_PRINTING"
                            ]}
                        >

                            <MRPDetails />

                        </PositionBasedRoute>

                    }
                />


                <Route
                    path="/mrp/edit/:id"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "MRP_PRINTING"
                            ]}
                        >

                            <MRPForm />

                        </PositionBasedRoute>

                    }
                />


                {/* =================================================
                    NOTIFICATIONS
                    ADMIN ONLY
                ================================================= */}

                <Route
                    path="/notifications"
                    element={

                        <RoleBasedRoute role="ADMIN">

                            <Notification />

                        </RoleBasedRoute>

                    }
                />


                {/* =================================================
                    JOB OPENINGS

                    ADMIN
                    WEB_DEVELOPMENT
                    DESIGN
                    MARKETING
                    MRP_PRINTING
                ================================================= */}

                <Route
                    path="/openings"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "WEB_DEVELOPMENT",
                                "DESIGN",
                                "MARKETING",
                                "MRP_PRINTING"
                            ]}
                        >

                            <Opening />

                        </PositionBasedRoute>

                    }
                />


                <Route
                    path="/openings/add"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "WEB_DEVELOPMENT",
                                "DESIGN",
                                "MARKETING",
                                "MRP_PRINTING"
                            ]}
                        >

                            <OpeningForm />

                        </PositionBasedRoute>

                    }
                />


                <Route
                    path="/openings/:id"
                    element={

                        <PositionBasedRoute
                            allowedPositions={[
                                "ADMIN",
                                "WEB_DEVELOPMENT",
                                "DESIGN",
                                "MARKETING",
                                "MRP_PRINTING"
                            ]}
                        >

                            <OpeningDetails />

                        </PositionBasedRoute>

                    }
                />

            </Route>


            {/* =====================================================
                INVALID URL
            ===================================================== */}

            <Route
                path="*"
                element={

                    <Navigate
                        to="/"
                        replace
                    />

                }
            />

        </Routes>

    );

}


export default AppRoutes;