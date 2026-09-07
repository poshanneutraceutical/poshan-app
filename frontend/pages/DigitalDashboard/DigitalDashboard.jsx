import { useEffect, useState } from "react";

import {
    Activity,
    FileCheck,
    RefreshCcw,
    Users,
    Megaphone,
    BarChart3
} from "lucide-react";

import DigitalDashboardService from "../../services/DigitalDashboardService";

import "./DigitalDashboard.css";

const DigitalDashboard = () => {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const response =
                await DigitalDashboardService.getDashboardData();

            setData(response.data);

        }

        catch (error) {

            console.error(

                "Digital Dashboard Error:",

                error

            );

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="digital-loading">

                <RefreshCcw />

                <div>

                    Loading Digital Dashboard...

                </div>

            </div>

        );

    }

    const cards = [

        {

            title: "Total Leads",

            value: data?.totalleads || 0,

            icon: Users

        },

        {

            title: "Active Campaigns",

            value: data?.totalactivecampaign || 0,

            icon: Activity

        },

        {

            title: "Completed Campaigns",

            value: data?.totalcompletedcampaign || 0,

            icon: FileCheck

        }

    ];

    return (

        <div className="digital-dashboard">

            {/* =====================================
                HEADER
            ===================================== */}

            <div className="digital-header">

                <div className="digital-header-left">

                    <h1>

                        Digital Dashboard

                    </h1>

                    <p>

                        Digital Marketing Department Overview

                    </p>

                </div>

                <div className="digital-header-right">

                    <button
                        className="digital-refresh-btn"
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

            <div className="digital-summary-grid">

                {

                    cards.map((card, index) => {

                        const Icon = card.icon;

                        return (

                            <div
                                key={index}
                                className="digital-card"
                            >

                                <div className="digital-card-info">

                                    <h4>

                                        {card.title}

                                    </h4>

                                    <h2>

                                        {card.value}

                                    </h2>

                                </div>

                                <div className="digital-card-icon">

                                    <Icon />

                                </div>

                            </div>

                        );

                    })

                }

            </div>

            <div className="digital-content-grid">
                                {/* =====================================
                                    CAMPAIGN SUMMARY
                                ===================================== */}

                                <div className="digital-section">

                                    <div className="digital-section-header">

                                        <div className="digital-section-title">

                                            <BarChart3 />

                                            <h2>

                                                Campaign Summary

                                            </h2>

                                        </div>

                                    </div>

                                    <div className="campaign-list">

                                        <div className="campaign-item">

                                            <div className="campaign-left">

                                                <h4>

                                                    Total Leads

                                                </h4>

                                                <p>

                                                    All generated leads

                                                </p>

                                            </div>

                                            <div className="campaign-value">

                                                {data?.totalleads || 0}

                                            </div>

                                        </div>

                                        <div className="campaign-item">

                                            <div className="campaign-left">

                                                <h4>

                                                    Active Campaigns

                                                </h4>

                                                <p>

                                                    Currently running campaigns

                                                </p>

                                            </div>

                                            <div className="campaign-value">

                                                {data?.totalactivecampaign || 0}

                                            </div>

                                        </div>

                                        <div className="campaign-item">

                                            <div className="campaign-left">

                                                <h4>

                                                    Completed Campaigns

                                                </h4>

                                                <p>

                                                    Successfully completed campaigns

                                                </p>

                                            </div>

                                            <div className="campaign-value">

                                                {data?.totalcompletedcampaign || 0}

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* =====================================
                                    MARKETING SERVICES
                                ===================================== */}

                                <div className="digital-section">

                                    <div className="digital-section-header">

                                        <div className="digital-section-title">

                                            <Megaphone />

                                            <h2>

                                                Marketing Services

                                            </h2>

                                        </div>

                                    </div>

                                    <div className="service-list">

                                        <div className="service-item">

                                            <span className="service-name">

                                                Google Ads

                                            </span>

                                            <span className="service-status">

                                                Active

                                            </span>

                                        </div>

                                        <div className="service-item">

                                            <span className="service-name">

                                                Facebook Ads

                                            </span>

                                            <span className="service-status">

                                                Active

                                            </span>

                                        </div>

                                        <div className="service-item">

                                            <span className="service-name">

                                                Instagram Marketing

                                            </span>

                                            <span className="service-status">

                                                Active

                                            </span>

                                        </div>

                                        <div className="service-item">

                                            <span className="service-name">

                                                SEO Campaigns

                                            </span>

                                            <span className="service-status">

                                                Active

                                            </span>

                                        </div>

                                    </div>

                                    <div className="digital-statistics">

                                        <div className="digital-stat">

                                            <h4>

                                                Leads

                                            </h4>

                                            <h2>

                                                {data?.totalleads || 0}

                                            </h2>

                                        </div>

                                        <div className="digital-stat">

                                            <h4>

                                                Active

                                            </h4>

                                            <h2>

                                                {data?.totalactivecampaign || 0}

                                            </h2>

                                        </div>

                                        <div className="digital-stat">

                                            <h4>

                                                Completed

                                            </h4>

                                            <h2>

                                                {data?.totalcompletedcampaign || 0}

                                            </h2>

                                        </div>

                                    </div>

                                </div>

                            </div>
                                    </div>

                                );

                            };

                            export default DigitalDashboard;