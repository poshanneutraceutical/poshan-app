import React from "react";
import "./DashboardCards.css";


const DashboardCards = ({ data }) => {

    const cards = [

        {
            title: "Total Employees",
            value: data?.employees || 0,
            icon: "👨‍💼",
            className: "employee-card"
        },

        {
            title: "Total Vendors",
            value: data?.vendors || 0,
            icon: "🏢",
            className: "vendor-card"
        },

        {
            title: "Total Products",
            value: data?.products || 0,
            icon: "📦",
            className: "product-card"
        },

        {
            title: "Total Orders",
            value: data?.orders || 0,
            icon: "🛒",
            className: "order-card"
        },

        {
            title: "Pending Approvals",
            value: data?.pendingApprovals || 0,
            icon: "⏳",
            className: "approval-card"
        },

        {
            title: "Low Stock Items",
            value: data?.lowStock || 0,
            icon: "⚠️",
            className: "stock-card"
        }

    ];


    return (

        <div className="dashboard-cards">

            {
                cards.map((card, index) => (

                    <div
                        key={index}
                        className={`dashboard-card ${card.className}`}
                    >

                        <div className="dashboard-card-icon">

                            {card.icon}

                        </div>


                        <div className="dashboard-card-content">

                            <h3>
                                {card.title}
                            </h3>

                            <p>
                                {card.value}
                            </p>

                        </div>


                    </div>

                ))
            }

        </div>

    );

};


export default DashboardCards;