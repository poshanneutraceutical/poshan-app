import { useEffect, useState } from "react";

import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    Pencil,
    Trash2,
    User,
    Building2,
    Calendar,
    FileText,
    Package
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import purchaseRequisitionService
    from "../../services/PurchaseRequisitionService";


const PurchaseRequisitionDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();


    const [
        purchaseRequisition,
        setPurchaseRequisition
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    useEffect(() => {

        loadPurchaseRequisition();

    }, [id]);


    const loadPurchaseRequisition =
        async () => {

            try {

                setLoading(true);

                const data =
                    await purchaseRequisitionService.getById(
                        id
                    );

                setPurchaseRequisition(data);

            } catch (error) {

                console.error(
                    "Unable to load purchase requisition",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


    const approvePurchaseRequisition =
        async () => {

            const approvedBy =
                window.prompt(
                    "Approved By"
                );

            if (!approvedBy) {

                return;

            }


            try {

                await purchaseRequisitionService.approve(
                    id,
                    approvedBy
                );

                alert(
                    "Purchase Requisition approved successfully."
                );

                loadPurchaseRequisition();

            } catch (error) {

                console.error(error);

            }

        };


    const rejectPurchaseRequisition =
        async () => {

            const rejectedBy =
                window.prompt(
                    "Rejected By"
                );

            if (!rejectedBy) {

                return;

            }


            const rejectionReason =
                window.prompt(
                    "Reason for rejection"
                );


            try {

                await purchaseRequisitionService.reject(
                    id,
                    rejectedBy,
                    rejectionReason
                );

                alert(
                    "Purchase Requisition rejected successfully."
                );

                loadPurchaseRequisition();

            } catch (error) {

                console.error(error);

            }

        };


    const deletePurchaseRequisition =
        async () => {

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

                navigate(
                    "/procurement/purchase-requisition"
                );

            } catch (error) {

                console.error(error);

            }

        };


    const getStatusClass =
        (status) => {

            switch (status) {

                case "Approved":
                    return "approved";

                case "Rejected":
                    return "rejected";

                case "Pending":
                    return "pending";

                default:
                    return "pending";

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


    if (loading) {

        return (

            <div className="details-loading">

                <div className="loading-spinner" />

                Loading Purchase Requisition...

            </div>

        );

    }


    if (!purchaseRequisition) {

        return (

            <div className="empty-state">

                Purchase Requisition Not Found.

            </div>

        );

    }


    return (

        <div className="purchase-details-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="details-header">

                <div className="details-heading">

                    <div className="details-title-icon">

                        <FileText size={21} />

                    </div>

                    <div>

                        <h1 className="details-title">

                            Purchase Requisition

                        </h1>

                        <p className="details-pr-number">

                            {purchaseRequisition.prNumber}

                        </p>

                    </div>

                </div>


                <div className="details-actions">


                    <Link
                        to="/procurement/purchase-requisition"
                        className="details-action details-action-back"
                    >

                        <ArrowLeft size={16} />

                        Back

                    </Link>


                    <Link
                        to={`/procurement/purchase-requisition/edit/${purchaseRequisition.id}`}
                        className="details-action details-action-edit"
                    >

                        <Pencil size={16} />

                        Edit

                    </Link>


                    {purchaseRequisition.status === "Pending" && (

                        <>

                            <button
                                type="button"
                                onClick={
                                    approvePurchaseRequisition
                                }
                                className="details-action details-action-approve"
                            >

                                <CheckCircle size={16} />

                                Approve

                            </button>


                            <button
                                type="button"
                                onClick={
                                    rejectPurchaseRequisition
                                }
                                className="details-action details-action-reject"
                            >

                                <XCircle size={16} />

                                Reject

                            </button>

                        </>

                    )}


                    <button
                        type="button"
                        onClick={
                            deletePurchaseRequisition
                        }
                        className="details-action details-action-delete"
                    >

                        <Trash2 size={16} />

                        Delete

                    </button>

                </div>

            </div>


            {/* =================================================
                INFORMATION CARDS
            ================================================= */}

            <div className="details-grid">


                {/* REQUISITION INFORMATION */}

                <div className="details-card">

                    <div className="details-card-header">

                        <div className="details-card-icon">

                            <Building2 size={19} />

                        </div>

                        <h2>
                            Purchase Requisition Information
                        </h2>

                    </div>


                    <div className="details-info-list">


                        <DetailsInfoRow
                            icon={
                                <Building2 size={18} />
                            }
                            label="Vendor"
                            value={
                                purchaseRequisition.vendorCompanyName
                            }
                        />


                        <DetailsInfoRow
                            icon={
                                <User size={18} />
                            }
                            label="Requested By"
                            value={
                                purchaseRequisition.requestedBy
                            }
                        />


                        <DetailsInfoRow
                            icon={
                                <Building2 size={18} />
                            }
                            label="Department"
                            value={
                                purchaseRequisition.department
                            }
                        />


                        <DetailsInfoRow
                            icon={
                                <FileText size={18} />
                            }
                            label="Priority"
                            value={
                                purchaseRequisition.priority
                            }
                        />


                        <DetailsInfoRow
                            icon={
                                <Calendar size={18} />
                            }
                            label="Created At"
                            value={
                                formatDate(
                                    purchaseRequisition.createdAt
                                )
                            }
                        />

                    </div>

                </div>


                {/* APPROVAL INFORMATION */}

                <div className="details-card">

                    <div className="details-card-header">

                        <div className="details-card-icon">

                            <CheckCircle size={19} />

                        </div>

                        <h2>
                            Approval Information
                        </h2>

                    </div>


                    <div className="details-info-list">


                        <div>

                            <p className="details-info-label">
                                Status
                            </p>

                            <span
                                className={`details-status ${getStatusClass(
                                    purchaseRequisition.status
                                )}`}
                            >

                                {purchaseRequisition.status}

                            </span>

                        </div>


                        <DetailsInfoRow
                            label="Approved By"
                            value={
                                purchaseRequisition.approvedBy ||
                                "-"
                            }
                        />


                        <DetailsInfoRow
                            label="Approved At"
                            value={
                                formatDate(
                                    purchaseRequisition.approvedAt
                                )
                            }
                        />


                        <DetailsInfoRow
                            label="Rejection Reason"
                            value={
                                purchaseRequisition.rejectionReason ||
                                "-"
                            }
                        />

                    </div>

                </div>

            </div>


            {/* =================================================
                REQUESTED ITEMS
            ================================================= */}

            <div className="details-items-card">

                <div className="details-card-header">

                    <div className="details-card-icon">

                        <Package size={19} />

                    </div>

                    <h2>
                        Requested Items
                    </h2>

                </div>


                <div className="details-table-wrapper">

                    <table className="details-items-table">

                        <thead>

                            <tr>

                                <th>
                                    #
                                </th>

                                <th>
                                    Box Type
                                </th>

                                <th>
                                    Quantity
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {(purchaseRequisition.items || [])
                                .map(
                                    (item, index) => (

                                        <tr
                                            key={index}
                                        >

                                            <td>

                                                <span className="details-item-index">

                                                    {index + 1}

                                                </span>

                                            </td>


                                            <td>

                                                {item.boxType}

                                            </td>


                                            <td>

                                                <span className="details-quantity">

                                                    {item.quantity}

                                                </span>

                                            </td>

                                        </tr>

                                    )
                                )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};


const DetailsInfoRow = ({
    icon,
    label,
    value
}) => {

    return (

        <div className="details-info-row">

            {icon && (

                <div className="details-info-row-icon">

                    {icon}

                </div>

            )}

            <div>

                <p className="details-info-label">

                    {label}

                </p>

                <p className="details-info-value">

                    {value || "-"}

                </p>

            </div>

        </div>

    );

};


export default PurchaseRequisitionDetails;