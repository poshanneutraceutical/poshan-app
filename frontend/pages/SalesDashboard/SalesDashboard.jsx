import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Building2,
    ShoppingCart,
    Truck,
    PackageCheck,
    PackagePlus,
    Boxes,
    AlertTriangle,
    RefreshCcw,
    ChevronDown,
    ChevronUp,
    Package,
    Factory,
    Droplets
} from "lucide-react";

import salesDashboardService
    from "../../services/SalesDashboardService";

import "./SalesDashboard.css";


const SalesDashboard = () => {

    const [
        dashboard,
        setDashboard
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    /*
     * Stores which inventory category card is open.
     */
    const [
        expandedCategory,
        setExpandedCategory
    ] = useState(null);


    /*
     * Controls Low Stock section.
     */
    const [
        lowStockExpanded,
        setLowStockExpanded
    ] = useState(false);


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard =
        async () => {

            try {

                setLoading(true);

                const data =
                    await salesDashboardService
                        .getDashboard();

                setDashboard(data);

            }
            catch (error) {

                console.error(
                    "Failed to load Sales Dashboard",
                    error
                );

            }
            finally {

                setLoading(false);

            }
        };


    /*
     * =========================================================
     * CATEGORY ICON
     * =========================================================
     */

    const getCategoryIcon =
        (
            categoryName
        ) => {

            const name =
                (
                    categoryName ||
                    ""
                )
                    .toUpperCase();


            if (
                name === "BOX"
            ) {

                return Boxes;
            }


            if (
                name === "FLAVOUR" ||
                name === "FLAVOR"
            ) {

                return Droplets;
            }


            if (
                name === "SMP"
            ) {

                return PackageCheck;
            }


            if (
                name === "DUSTREIN"
            ) {

                return Factory;
            }


            if (
                name === "FAT POWDER"
            ) {

                return Package;
            }


            return Package;
        };


    /*
     * =========================================================
     * CATEGORY DISPLAY NAME
     * =========================================================
     */

    const formatCategoryName =
        (
            categoryName
        ) => {

            if (!categoryName) {

                return "Inventory";
            }


            return categoryName
                .replaceAll(
                    "_",
                    " "
                );
        };


    /*
     * =========================================================
     * EXPAND/COLLAPSE CATEGORY
     * =========================================================
     */

    const toggleCategory =
        (
            categoryId
        ) => {

            setExpandedCategory(
                previous =>
                    previous === categoryId
                        ? null
                        : categoryId
            );

            setLowStockExpanded(
                false
            );
        };


    /*
     * =========================================================
     * LOW STOCK TOGGLE
     * =========================================================
     */

    const toggleLowStock =
        () => {

            setLowStockExpanded(
                previous =>
                    !previous
            );

            setExpandedCategory(
                null
            );
        };


    /*
     * =========================================================
     * SALES SUMMARY CARDS
     * =========================================================
     */

    const salesCards = [

        {
            title:
                "Total Companies",

            value:
                dashboard?.totalCompanies ||
                0,

            icon:
                Building2
        },

        {
            title:
                "Total Sales",

            value:
                dashboard?.totalSales ||
                0,

            icon:
                ShoppingCart
        },

        {
            title:
                "Total Deliveries",

            value:
                dashboard?.totalDeliveries ||
                0,

            icon:
                Truck
        },

        {
            title:
                "Delivered Orders",

            value:
                dashboard?.deliveredOrders ||
                0,

            icon:
                PackageCheck
        },

        {
            title:
                "Pending Deliveries",

            value:
                dashboard?.pendingDeliveries ||
                0,

            icon:
                PackagePlus
        },

        {
            title:
                "Receiving Materials",

            value:
                dashboard?.totalReceivingMaterials ||
                0,

            icon:
                Boxes
        }
    ];


    /*
     * =========================================================
     * INVENTORY CATEGORIES
     * =========================================================
     */

    const inventoryCategories =
        useMemo(
            () =>
                dashboard?.inventoryCategories ||
                [],
            [
                dashboard
            ]
        );


    /*
     * =========================================================
     * LOW STOCK
     * =========================================================
     */

    const lowStockInventory =
        dashboard?.lowStockInventory ||
        [];


    /*
     * =========================================================
     * LOADING
     * =========================================================
     */

    if (loading) {

        return (

            <div className="sales-loading">

                <RefreshCcw />

                <div>
                    Loading Sales Dashboard...
                </div>

            </div>
        );
    }


    return (

        <div className="sales-dashboard">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="sales-header">

                <div className="sales-header-left">

                    <h1>
                        Sales Dashboard
                    </h1>

                    <p>
                        Monitor sales, deliveries and inventory overview.
                    </p>

                </div>


                <div className="sales-header-right">

                    <button
                        className="sales-refresh-btn"
                        onClick={
                            loadDashboard
                        }
                    >

                        <RefreshCcw
                            size={18}
                        />

                        Refresh

                    </button>

                </div>

            </div>


            {/* =================================================
                SALES SUMMARY CARDS
            ================================================= */}

            <div className="sales-summary-grid">

                {
                    salesCards.map(
                        (
                            card,
                            index
                        ) => {

                            const Icon =
                                card.icon;


                            return (

                                <div
                                    key={index}
                                    className="sales-card"
                                >

                                    <div className="sales-card-info">

                                        <h4>
                                            {
                                                card.title
                                            }
                                        </h4>

                                        <h2>
                                            {
                                                card.value
                                            }
                                        </h2>

                                    </div>


                                    <div className="sales-card-icon">

                                        <Icon />

                                    </div>

                                </div>
                            );
                        }
                    )
                }

            </div>


            {/* =================================================
                INVENTORY SUMMARY CARDS
            ================================================= */}

            <div className="sales-inventory-heading">

                <div>

                    <h2>
                        Inventory Overview
                    </h2>

                    <p>
                        Click any category to view individual inventory quantities.
                    </p>

                </div>

            </div>


            <div className="sales-inventory-grid">

                {
                    inventoryCategories.map(
                        (
                            category
                        ) => {

                            const Icon =
                                getCategoryIcon(
                                    category.categoryName
                                );


                            const isExpanded =
                                expandedCategory ===
                                category.categoryId;


                            return (

                                <div
                                    key={
                                        category.categoryId
                                    }
                                    className={
                                        `sales-inventory-card ${
                                            isExpanded
                                                ? "sales-inventory-card-active"
                                                : ""
                                        }`
                                    }
                                >

                                    <button
                                        type="button"
                                        className="sales-inventory-card-button"
                                        onClick={() =>
                                            toggleCategory(
                                                category.categoryId
                                            )
                                        }
                                    >

                                        <div className="sales-inventory-card-icon">

                                            <Icon />

                                        </div>


                                        <div className="sales-inventory-card-info">

                                            <h4>

                                                {
                                                    formatCategoryName(
                                                        category.categoryName
                                                    )
                                                }

                                            </h4>


                                            <h2>

                                                {
                                                    category.totalQuantity ||
                                                    0
                                                }

                                            </h2>


                                            <span>

                                                {
                                                    category.totalItems ||
                                                    0
                                                }
                                                {" "}
                                                inventory items

                                            </span>

                                        </div>


                                        <div className="sales-inventory-card-arrow">

                                            {
                                                isExpanded
                                                    ? (
                                                        <ChevronUp />
                                                    )
                                                    : (
                                                        <ChevronDown />
                                                    )
                                            }

                                        </div>

                                    </button>


                                    {
                                        category.lowStockItems >
                                        0
                                        && (

                                            <div className="inventory-card-low-stock">

                                                <AlertTriangle
                                                    size={14}
                                                />

                                                {
                                                    category.lowStockItems
                                                }
                                                {" "}
                                                Low Stock

                                            </div>
                                        )
                                    }

                                </div>
                            );
                        }
                    )
                }


                {/* =================================================
                    LOW STOCK CARD
                ================================================= */}

                <div
                    className={
                        `sales-inventory-card low-stock-summary-card ${
                            lowStockExpanded
                                ? "sales-inventory-card-active"
                                : ""
                        }`
                    }
                >

                    <button
                        type="button"
                        className="sales-inventory-card-button"
                        onClick={
                            toggleLowStock
                        }
                    >

                        <div className="sales-inventory-card-icon low-stock-card-icon">

                            <AlertTriangle />

                        </div>


                        <div className="sales-inventory-card-info">

                            <h4>
                                Low Stock
                            </h4>


                            <h2>
                                {
                                    dashboard?.lowStockItems ||
                                    0
                                }
                            </h2>


                            <span>
                                items need attention
                            </span>

                        </div>


                        <div className="sales-inventory-card-arrow">

                            {
                                lowStockExpanded
                                    ? (
                                        <ChevronUp />
                                    )
                                    : (
                                        <ChevronDown />
                                    )
                            }

                        </div>

                    </button>

                </div>

            </div>


            {/* =================================================
                EXPANDED CATEGORY DETAIL
            ================================================= */}

            {
                expandedCategory !== null
                && (

                    <div className="sales-inventory-detail-card">

                        {
                            inventoryCategories
                                .filter(
                                    category =>
                                        category.categoryId ===
                                        expandedCategory
                                )
                                .map(
                                    category => (

                                        <React.Fragment
                                            key={
                                                category.categoryId
                                            }
                                        >

                                            <div className="sales-section-header">

                                                <div className="sales-section-title">

                                                    <Boxes />

                                                    <div>

                                                        <h2>

                                                            {
                                                                formatCategoryName(
                                                                    category.categoryName
                                                                )
                                                            }
                                                            {" "}
                                                            Inventory

                                                        </h2>

                                                        <p>

                                                            Total Quantity:
                                                            {" "}
                                                            <strong>
                                                                {
                                                                    category.totalQuantity ||
                                                                    0
                                                                }
                                                            </strong>

                                                        </p>

                                                    </div>

                                                </div>


                                                <button
                                                    type="button"
                                                    className="sales-collapse-btn"
                                                    onClick={() =>
                                                        setExpandedCategory(
                                                            null
                                                        )
                                                    }
                                                >

                                                    <ChevronUp
                                                        size={18}
                                                    />

                                                    Close

                                                </button>

                                            </div>


                                            {
                                                category.items?.length ===
                                                0
                                                ? (

                                                    <div className="sales-empty">

                                                        <Package />

                                                        <h3>
                                                            No Inventory Found
                                                        </h3>

                                                        <p>
                                                            There are no inventory records in this category.
                                                        </p>

                                                    </div>

                                                )
                                                : (

                                                    <div className="sales-table-wrapper">

                                                        <table className="sales-table">

                                                            <thead>

                                                                <tr>

                                                                    <th>
                                                                        Item
                                                                    </th>

                                                                    <th>
                                                                        Available Quantity
                                                                    </th>

                                                                    <th>
                                                                        Minimum Quantity
                                                                    </th>

                                                                    <th>
                                                                        Status
                                                                    </th>

                                                                </tr>

                                                            </thead>


                                                            <tbody>

                                                                {
                                                                    category.items.map(
                                                                        item => (

                                                                            <tr
                                                                                key={
                                                                                    item.id
                                                                                }
                                                                            >

                                                                                <td>

                                                                                    {
                                                                                        item.itemName ||
                                                                                        "-"
                                                                                    }

                                                                                </td>


                                                                                <td>

                                                                                    {
                                                                                        item.availableQuantity ??
                                                                                        0
                                                                                    }

                                                                                </td>


                                                                                <td>

                                                                                    {
                                                                                        item.minimumQuantity ??
                                                                                        0
                                                                                    }

                                                                                </td>


                                                                                <td>

                                                                                    {
                                                                                        item.lowStock
                                                                                            ? (

                                                                                                <span className="status-danger">

                                                                                                    Low Stock

                                                                                                </span>

                                                                                            )
                                                                                            : (

                                                                                                <span className="status-success">

                                                                                                    Available

                                                                                                </span>

                                                                                            )
                                                                                    }

                                                                                </td>

                                                                            </tr>

                                                                        )
                                                                    )
                                                                }

                                                            </tbody>

                                                        </table>

                                                    </div>
                                                )
                                            }

                                        </React.Fragment>
                                    )
                                )
                        }

                    </div>
                )
            }


            {/* =================================================
                LOW STOCK DETAIL
            ================================================= */}

            {
                lowStockExpanded
                && (

                    <div className="low-stock-card">

                        <div className="low-stock-header">

                            <AlertTriangle />

                            <div>

                                <h2>
                                    Low Stock Inventory
                                </h2>

                                <p>
                                    All low-stock items across every inventory category
                                </p>

                            </div>

                        </div>


                        {
                            lowStockInventory.length ===
                            0
                            ? (

                                <div className="sales-empty">

                                    <AlertTriangle />

                                    <h3>
                                        No Low Stock Items
                                    </h3>

                                    <p>
                                        Great! Inventory levels are healthy.
                                    </p>

                                </div>

                            )
                            : (

                                <div className="sales-table-wrapper">

                                    <table className="sales-table">

                                        <thead>

                                            <tr>

                                                <th>
                                                    Inventory Type
                                                </th>

                                                <th>
                                                    Item
                                                </th>

                                                <th>
                                                    Available Quantity
                                                </th>

                                                <th>
                                                    Minimum Quantity
                                                </th>

                                                <th>
                                                    Status
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {
                                                lowStockInventory.map(
                                                    item => (

                                                        <tr
                                                            key={
                                                                item.id
                                                            }
                                                        >

                                                            <td>

                                                                {
                                                                    item.categoryName ||
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    item.materialName ||
                                                                    (
                                                                        item.boxType
                                                                            ? item.boxType
                                                                                .replaceAll(
                                                                                    "_",
                                                                                    " "
                                                                                )
                                                                            : "-"
                                                                    )
                                                                }

                                                            </td>


                                                            <td className="low-stock-value">

                                                                {
                                                                    item.availableQuantity ??
                                                                    0
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    item.minimumQuantity ??
                                                                    0
                                                                }

                                                            </td>


                                                            <td>

                                                                <span className="status-danger">

                                                                    Low Stock

                                                                </span>

                                                            </td>

                                                        </tr>
                                                    )
                                                )
                                            }

                                        </tbody>

                                    </table>

                                </div>
                            )
                        }

                    </div>
                )
            }


            {/* =================================================
                RECENT DELIVERY + RECEIVING MATERIALS
            ================================================= */}

            <div className="sales-content-grid">

                {/* =============================================
                    RECENT DELIVERIES
                ============================================= */}

                <div className="sales-section">

                    <div className="sales-section-header">

                        <div className="sales-section-title">

                            <Truck />

                            <h2>
                                Recent Deliveries
                            </h2>

                        </div>

                    </div>


                    {
                        (
                            dashboard?.recentDeliveries ||
                            []
                        ).length === 0

                        ? (

                            <div className="sales-empty">

                                <Truck />

                                <h3>
                                    No Deliveries Found
                                </h3>

                                <p>
                                    Recent delivery records will appear here.
                                </p>

                            </div>

                        )

                        : (

                            <div className="sales-table-wrapper">

                                <table className="sales-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Company
                                            </th>

                                            <th>
                                                Box Type
                                            </th>

                                            <th>
                                                Quantity
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {
                                            dashboard.recentDeliveries
                                                .map(
                                                    delivery => (

                                                        <tr
                                                            key={
                                                                delivery.id
                                                            }
                                                        >

                                                            <td>

                                                                {
                                                                    delivery.companyName ||
                                                                    delivery.companyId ||
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    delivery.boxType
                                                                        ? delivery.boxType
                                                                            .replaceAll(
                                                                                "_",
                                                                                " "
                                                                            )
                                                                        : "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    delivery.deliveredQuantity ??
                                                                    0
                                                                }

                                                            </td>


                                                            <td>

                                                                <span
                                                                    className={
                                                                        String(
                                                                            delivery.deliveryStatus ||
                                                                            ""
                                                                        )
                                                                            .toUpperCase()
                                                                            ===
                                                                            "DELIVERED"
                                                                            ? "status-success"
                                                                            : "status-pending"
                                                                    }
                                                                >

                                                                    {
                                                                        delivery.deliveryStatus ||
                                                                        "-"
                                                                    }

                                                                </span>

                                                            </td>

                                                        </tr>

                                                    )
                                                )
                                        }

                                    </tbody>

                                </table>

                            </div>
                        )
                    }

                </div>


                {/* =============================================
                    RECEIVING MATERIALS
                ============================================= */}

                <div className="sales-section">

                    <div className="sales-section-header">

                        <div className="sales-section-title">

                            <Boxes />

                            <h2>
                                Recent Receiving Materials
                            </h2>

                        </div>

                    </div>


                    {
                        (
                            dashboard?.recentReceivingMaterials ||
                            []
                        ).length === 0

                        ? (

                            <div className="sales-empty">

                                <Boxes />

                                <h3>
                                    No Receiving Records
                                </h3>

                                <p>
                                    Receiving material history will appear here.
                                </p>

                            </div>

                        )

                        : (

                            <div className="sales-table-wrapper">

                                <table className="sales-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Supplier
                                            </th>

                                            <th>
                                                Bill No.
                                            </th>

                                            <th>
                                                Receiver
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {
                                            dashboard.recentReceivingMaterials
                                                .map(
                                                    material => (

                                                        <tr
                                                            key={
                                                                material.id
                                                            }
                                                        >

                                                            <td>

                                                                {
                                                                    material.supplierName ||
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    material.billNumber ||
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    material.receiverName ||
                                                                    "-"
                                                                }

                                                            </td>

                                                        </tr>

                                                    )
                                                )
                                        }

                                    </tbody>

                                </table>

                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    );
};


export default SalesDashboard;