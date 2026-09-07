import { useEffect, useState } from "react";

import {
    Package,
    ShoppingCart,
    Users,
    FileText,
    TrendingUp,
    AlertTriangle
} from "lucide-react";

import dashboardService from "../../services/dashboardService";

import "./Dashboard.css";

const Dashboard = () => {

    const [summary, setSummary] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const [

                dashboard,

                inventory,

                sales,

                design,

                digital,

                web

            ] = await Promise.all([

                dashboardService.getDashboard(),

                dashboardService.getInventoryDashboard(),

                dashboardService.getSalesDashboard(),

                dashboardService.getDesignDashboard(),

                dashboardService.getDigitalDashboard(),

                dashboardService.getWebDashboard()

            ]);

            setSummary({

                ...dashboard,

                inventory,

                sales,

                design,

                digital,

                web

            });

            console.log("ERP Dashboard:", dashboard);

            console.log("Inventory Dashboard:", inventory);

            console.log("Sales Dashboard:", sales);

            console.log("Design Dashboard:", design);

            console.log("Digital Dashboard:", digital);

            console.log("Web Dashboard:", web);

        }

        catch (error) {

            console.error(

                "Dashboard Error:",

                error

            );

        }

        finally {

            setLoading(false);

        }

    };

    const cards = [

        {

            title: "Total Employees",

            value: summary.totalEmployees ?? 0,

            icon: Users

        },

        {

            title: "Total Vendors",

            value: summary.totalVendors ?? 0,

            icon: Users

        },

        {

            title: "Purchase Orders",

            value: summary.totalPurchaseOrders ?? 0,

            icon: ShoppingCart

        },

        {

            title: "Pending PRs",

            value: summary.pendingPRs ?? 0,

            icon: FileText

        },

        {

            title: "Low Stock Items",

            value: summary.lowStockItems ?? 0,

            icon: Package

        }

    ];

    if (loading) {

        return (

            <div className="dashboard-loading">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <div className="dashboard-page">

            <div className="dashboard-header">

                <div className="dashboard-header-left">

                    <h1>

                        Dashboard

                    </h1>

                    <p>

                        Welcome back to Poshan ERP 👋

                    </p>

                </div>

                <div className="dashboard-header-right">

                    <span>

                        Today's Overview

                    </span>

                    <h3>

                        {new Date().toLocaleDateString()}

                    </h3>

                </div>

            </div>

            <div className="dashboard-cards">

                {

                    cards.map((card) => {

                        const Icon = card.icon;

                        return (

                            <div
                                key={card.title}
                                className="dashboard-card"
                            >

                                <div className="dashboard-card-content">

                                    <h3>

                                        {card.title}

                                    </h3>

                                    <p>

                                        {card.value}

                                    </p>

                                </div>

                                <div className="dashboard-card-icon">

                                    <Icon />

                                </div>

                            </div>

                        );

                    })

                }

            </div>

            <div className="dashboard-grid">
                                {/* =========================
                                    RECENT ACTIVITY
                                ========================== */}

                                <div className="dashboard-section">

                                    <div className="dashboard-section-header">

                                        <div className="dashboard-section-title">

                                            <TrendingUp />

                                            <h2>

                                                Recent Activity

                                            </h2>

                                        </div>

                                    </div>

                                    <div className="dashboard-empty">

                                        <TrendingUp />

                                        <h3>

                                            No Recent Activity

                                        </h3>

                                        <p>

                                            Activities from all ERP modules will appear here.

                                        </p>

                                    </div>

                                </div>

                                {/* =========================
                                    ALERTS
                                ========================== */}

                                <div className="dashboard-section">

                                    <div className="dashboard-section-header">

                                        <div className="dashboard-section-title">

                                            <AlertTriangle />

                                            <h2>

                                                Alerts

                                            </h2>

                                        </div>

                                    </div>

                                    <div className="alert-list">

                                        <div className="alert-card">

                                            <div className="alert-info">

                                                <h4>

                                                    Pending Purchase Requests

                                                </h4>

                                                <p>

                                                    Waiting for approval

                                                </p>

                                            </div>

                                            <div className="alert-value">

                                                {summary.pendingPRs ?? 0}

                                            </div>

                                        </div>

                                        <div className="alert-card low">

                                            <div className="alert-info">

                                                <h4>

                                                    Low Stock Items

                                                </h4>

                                                <p>

                                                    Inventory needs attention

                                                </p>

                                            </div>

                                            <div className="alert-value">

                                                {summary.lowStockItems ?? 0}

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                                    </div>

                                );

                            };

                            export default Dashboard;