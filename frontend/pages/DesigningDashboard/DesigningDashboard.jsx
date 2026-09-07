import React, { useEffect, useState } from "react";

import {
    RefreshCcw,
    ClipboardList,
    CheckCircle,
    Clock3,
    Truck,
    Activity,
    BarChart3
} from "lucide-react";

import DesigningDashboardService from "../../services/DesigningDashboardService";

import "./DesigningDashboard.css";

const DesigningDashboard = () => {

    const [dashboardData, setDashboardData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const response =
                await DesigningDashboardService.getDashboardData();

            setDashboardData(response.data);

        }

        catch (error) {

            console.error(

                "Design Dashboard Error:",

                error

            );

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="designing-loading">

                <RefreshCcw />

                <div>

                    Loading Designing Dashboard...

                </div>

            </div>

        );

    }

    const cards = [

        {

            title: "Total Design Orders",

            value: dashboardData?.totaldesignorder || 0,

            icon: ClipboardList

        },

        {

            title: "Completed",

            value: dashboardData?.totalcompleted || 0,

            icon: CheckCircle

        },

        {

            title: "In Progress",

            value: dashboardData?.totalinprogress || 0,

            icon: Clock3

        },

        {

            title: "Delivered",

            value: dashboardData?.totaldelivered || 0,

            icon: Truck

        }

    ];

    return (

        <div className="designing-dashboard">

            {/* =====================================
                HEADER
            ===================================== */}

            <div className="designing-header">

                <div className="designing-header-left">

                    <h1>

                        Designing Dashboard

                    </h1>

                    <p>

                        Overview of Designing Department

                    </p>

                </div>

                <div className="designing-header-right">

                    <button
                        className="designing-refresh-btn"
                        onClick={loadDashboard}
                    >

                        <RefreshCcw size={18} />

                        Refresh

                    </button>

                </div>

            </div>

            {/* =====================================
                SUMMARY CARDS
            ===================================== */}

            <div className="designing-summary-grid">

                {

                    cards.map((card, index) => {

                        const Icon = card.icon;

                        return (

                            <div
                                key={index}
                                className="designing-card"
                            >

                                <div className="designing-card-info">

                                    <h4>

                                        {card.title}

                                    </h4>

                                    <h2>

                                        {card.value}

                                    </h2>

                                </div>

                                <div className="designing-card-icon">

                                    <Icon />

                                </div>

                            </div>

                        );

                    })

                }

            </div>

            <div className="designing-content-grid">
                                {/* =====================================
                                    RECENT ACTIVITY
                                ===================================== */}

                                <div className="designing-section">

                                    <div className="designing-section-header">

                                        <div className="designing-section-title">

                                            <Activity />

                                            <h2>

                                                Recent Activities

                                            </h2>

                                        </div>

                                    </div>

                                    <div className="activity-list">

                                        <div className="activity-item">

                                            <div className="activity-left">

                                                <div className="activity-icon">

                                                    <ClipboardList />

                                                </div>

                                                <div className="activity-text">

                                                    <h4>

                                                        No Recent Activities

                                                    </h4>

                                                    <p>

                                                        Recent design activities will appear here.

                                                    </p>

                                                </div>

                                            </div>

                                            <div className="activity-time">

                                                --

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* =====================================
                                    REPORTS & ANALYTICS
                                ===================================== */}

                                <div className="designing-section">

                                    <div className="designing-section-header">

                                        <div className="designing-section-title">

                                            <BarChart3 />

                                            <h2>

                                                Reports & Analytics

                                            </h2>

                                        </div>

                                    </div>

                                    <div className="report-card">

                                        <div className="report-placeholder">

                                            <BarChart3 />

                                            <h3>

                                                Analytics Coming Soon

                                            </h3>

                                            <p>

                                                Graphs, reports and department analytics will be available here.

                                            </p>

                                        </div>

                                        <div className="design-statistics">

                                            <div className="stat-box">

                                                <h4>

                                                    Total Orders

                                                </h4>

                                                <h2>

                                                    {dashboardData?.totaldesignorder || 0}

                                                </h2>

                                            </div>

                                            <div className="stat-box">

                                                <h4>

                                                    Completed

                                                </h4>

                                                <h2>

                                                    {dashboardData?.totalcompleted || 0}

                                                </h2>

                                            </div>

                                            <div className="stat-box">

                                                <h4>

                                                    Delivered

                                                </h4>

                                                <h2>

                                                    {dashboardData?.totaldelivered || 0}

                                                </h2>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                                    </div>

                                );

                            };

                            export default DesigningDashboard;