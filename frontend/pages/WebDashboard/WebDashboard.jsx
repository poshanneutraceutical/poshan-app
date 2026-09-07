import React, { useEffect, useState } from "react";

import {
    RefreshCcw,
    Globe,
    FolderKanban,
    CheckCircle,
    Clock3,
    Activity
} from "lucide-react";

import webDashboardService from "../../services/WebDashboardService";

import "./WebDashboard.css";

const WebDashboard = () => {

    const [dashboardData, setDashboardData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const data =
                await webDashboardService.getDashboardData();

            setDashboardData(data);

        }

        catch (error) {

            console.error(

                "Web Dashboard Error:",

                error

            );

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="web-loading">

                <RefreshCcw />

                <div>

                    Loading Web Dashboard...

                </div>

            </div>

        );

    }

    const cards = [

        {

            title: "Total Projects",

            value: dashboardData?.totalproject || 0,

            icon: FolderKanban

        },

        {

            title: "Delivered",

            value: dashboardData?.delivered || 0,

            icon: CheckCircle

        },

        {

            title: "Completed",

            value: dashboardData?.completed || 0,

            icon: Activity

        },

        {

            title: "Ongoing",

            value: dashboardData?.ongoing || 0,

            icon: Clock3

        }

    ];

    return (

        <div className="web-dashboard">

            {/* =====================================
                HEADER
            ===================================== */}

            <div className="web-header">

                <div className="web-header-left">

                    <h1>

                        Web Development Dashboard

                    </h1>

                    <p>

                        Monitor Website Development Projects

                    </p>

                </div>

                <div className="web-header-right">

                    <button
                        className="web-refresh-btn"
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

            <div className="web-summary-grid">

                {

                    cards.map((card, index) => {

                        const Icon = card.icon;

                        return (

                            <div
                                key={index}
                                className="web-card"
                            >

                                <div className="web-card-info">

                                    <h4>

                                        {card.title}

                                    </h4>

                                    <h2>

                                        {card.value}

                                    </h2>

                                </div>

                                <div className="web-card-icon">

                                    <Icon />

                                </div>

                            </div>

                        );

                    })

                }

            </div>

            <div className="web-content-grid">
                                {/* =====================================
                                    RECENT PROJECTS
                                ===================================== */}

                                <div className="web-section">

                                    <div className="web-section-header">

                                        <div className="web-section-title">

                                            <Globe />

                                            <h2>

                                                Recent Projects

                                            </h2>

                                        </div>

                                    </div>

                                    <div className="project-list">

                                        <div className="project-item">

                                            <div className="project-left">

                                                <h4>

                                                    No Recent Projects

                                                </h4>

                                                <p>

                                                    Newly created website projects will appear here.

                                                </p>

                                            </div>

                                            <span className="project-status">

                                                Pending

                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* =====================================
                                    PROJECT STATUS SUMMARY
                                ===================================== */}

                                <div className="web-section">

                                    <div className="web-section-header">

                                        <div className="web-section-title">

                                            <Activity />

                                            <h2>

                                                Project Status Summary

                                            </h2>

                                        </div>

                                    </div>

                                    <div className="web-summary-box">

                                        <div className="summary-row">

                                            <span className="summary-title">

                                                Total Projects

                                            </span>

                                            <span className="summary-value">

                                                {dashboardData?.totalproject || 0}

                                            </span>

                                        </div>

                                        <div className="summary-row">

                                            <span className="summary-title">

                                                Delivered

                                            </span>

                                            <span className="summary-value">

                                                {dashboardData?.delivered || 0}

                                            </span>

                                        </div>

                                        <div className="summary-row">

                                            <span className="summary-title">

                                                Completed

                                            </span>

                                            <span className="summary-value">

                                                {dashboardData?.completed || 0}

                                            </span>

                                        </div>

                                        <div className="summary-row">

                                            <span className="summary-title">

                                                Ongoing

                                            </span>

                                            <span className="summary-value">

                                                {dashboardData?.ongoing || 0}

                                            </span>

                                        </div>

                                        <div className="web-statistics">

                                            <div className="web-stat">

                                                <h4>

                                                    Total

                                                </h4>

                                                <h2>

                                                    {dashboardData?.totalproject || 0}

                                                </h2>

                                            </div>

                                            <div className="web-stat">

                                                <h4>

                                                    Ongoing

                                                </h4>

                                                <h2>

                                                    {dashboardData?.ongoing || 0}

                                                </h2>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                                    </div>

                                );

                            };

                            export default WebDashboard;