import { useEffect, useMemo, useState } from "react";

import {
    Plus,
    Search,
    Eye,
    Pencil,
    Trash2
} from "lucide-react";

import {
    Link
} from "react-router-dom";

import purchaseRequisitionService
    from "../../services/purchaseRequisitionService";


const PurchaseRequisitionList = () => {

    const [
        purchaseRequisitions,
        setPurchaseRequisitions
    ] = useState([]);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        search,
        setSearch
    ] = useState("");


    useEffect(() => {

        loadPurchaseRequisitions();

    }, []);


    const loadPurchaseRequisitions = async () => {

        try {

            setLoading(true);

            const data =
                await purchaseRequisitionService.getAll();

            setPurchaseRequisitions(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Unable to load purchase requisitions",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Delete this Purchase Requisition?"
            );

        if (!confirmed) {

            return;

        }


        try {

            await purchaseRequisitionService.delete(
                id
            );

            await loadPurchaseRequisitions();

        } catch (error) {

            console.error(
                "Unable to delete purchase requisition",
                error
            );

        }

    };


    const filtered = useMemo(() => {

        const query =
            search
                .trim()
                .toLowerCase();


        if (!query) {

            return purchaseRequisitions;

        }


        return purchaseRequisitions.filter(
            (purchaseRequisition) => {

                const searchableText = [

                    purchaseRequisition.prNumber,

                    purchaseRequisition.vendorCompanyName,

                    purchaseRequisition.requestedBy,

                    purchaseRequisition.department,

                    purchaseRequisition.priority,

                    purchaseRequisition.status

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                return searchableText.includes(
                    query
                );

            }
        );

    }, [
        purchaseRequisitions,
        search
    ]);


    const getStatusClass = (status) => {

        switch (status) {

            case "Approved":
                return "approved";

            case "Rejected":
                return "rejected";

            case "Pending":
                return "pending";

            case "Completed":
                return "completed";

            case "Cancelled":
                return "cancelled";

            default:
                return "cancelled";

        }

    };


    const getPriorityClass = (priority) => {

        switch (
            String(priority || "")
                .toLowerCase()
        ) {

            case "low":
                return "low";

            case "high":
                return "high";

            case "urgent":
                return "urgent";

            default:
                return "normal";

        }

    };


    const formatDate = (date) => {

        if (!date) {

            return "-";

        }


        return date.replace(
            "T",
            " "
        );

    };


    return (

        <div>

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="page-header">

                <div>

                    <h1 className="page-title">

                        Purchase Requisitions

                    </h1>

                    <p className="page-subtitle">

                        Manage purchase requisitions,
                        approvals and procurement requests

                    </p>

                </div>


                <Link
                    to="/procurement/purchase-requisition/add"
                    className="primary-btn"
                >

                    <Plus size={18} />

                    New Purchase Requisition

                </Link>

            </div>


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="filter-area">

                <div className="search-wrapper">

                    <Search
                        size={18}
                        className="search-icon"
                    />

                    <input
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        placeholder="Search by PR number, vendor, requester or department..."
                        className="search-box"
                    />

                </div>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>
                                PR Number
                            </th>

                            <th>
                                Vendor
                            </th>

                            <th>
                                Requested By
                            </th>

                            <th>
                                Department
                            </th>

                            <th>
                                Priority
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Created At
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="loading"
                                >

                                    Loading Purchase Requisitions...

                                </td>

                            </tr>

                        ) : filtered.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                >

                                    <div className="empty-state">

                                        No Purchase Requisitions Found.

                                    </div>

                                </td>

                            </tr>

                        ) : (

                            filtered.map(
                                (purchaseRequisition) => (

                                    <tr
                                        key={
                                            purchaseRequisition.id
                                        }
                                    >

                                        <td>

                                            <span className="pr-number">

                                                {
                                                    purchaseRequisition.prNumber
                                                }

                                            </span>

                                        </td>


                                        <td>

                                            {
                                                purchaseRequisition.vendorCompanyName ||
                                                "-"
                                            }

                                        </td>


                                        <td>

                                            {
                                                purchaseRequisition.requestedBy ||
                                                "-"
                                            }

                                        </td>


                                        <td>

                                            {
                                                purchaseRequisition.department ||
                                                "-"
                                            }

                                        </td>


                                        <td>

                                            <span
                                                className={`priority-badge ${getPriorityClass(
                                                    purchaseRequisition.priority
                                                )}`}
                                            >

                                                {
                                                    purchaseRequisition.priority ||
                                                    "Normal"
                                                }

                                            </span>

                                        </td>


                                        <td>

                                            <span
                                                className={`status-badge ${getStatusClass(
                                                    purchaseRequisition.status
                                                )}`}
                                            >

                                                {
                                                    purchaseRequisition.status ||
                                                    "Pending"
                                                }

                                            </span>

                                        </td>


                                        <td>

                                            {
                                                formatDate(
                                                    purchaseRequisition.createdAt
                                                )
                                            }

                                        </td>


                                        <td>

                                            <div className="action-buttons">

                                                <Link
                                                    to={`/procurement/purchase-requisition/${purchaseRequisition.id}`}
                                                    className="action-view"
                                                    title="View"
                                                    aria-label="View Purchase Requisition"
                                                >

                                                    <Eye size={18} />

                                                </Link>


                                                <Link
                                                    to={`/procurement/purchase-requisition/edit/${purchaseRequisition.id}`}
                                                    className="action-edit"
                                                    title="Edit"
                                                    aria-label="Edit Purchase Requisition"
                                                >

                                                    <Pencil size={18} />

                                                </Link>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            purchaseRequisition.id
                                                        )
                                                    }
                                                    className="action-delete"
                                                    title="Delete"
                                                    aria-label="Delete Purchase Requisition"
                                                >

                                                    <Trash2 size={18} />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};


export default PurchaseRequisitionList;