import React, { useEffect, useState } from "react";
import ApprovalService from "../../services/ApprovalService";
import Loader from "../../components/Common/Loader";
import Table from "../../components/Common/Table";
import Button from "../../components/Common/Button";
import "./Approval.css";
const Approvals = () => {

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);


    // ==========================================
    // GET PENDING APPROVALS
    // ==========================================

    const fetchApprovals = async () => {

        try {

            setLoading(true);

            const data =
                await ApprovalService.getPendingApprovals();

            console.log(
                "Approval Requests:",
                data
            );

            setRequests(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Error loading approvals",
                error
            );

            setRequests([]);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchApprovals();

    }, []);


    // ==========================================
    // APPROVE
    // ==========================================

    const handleApprove = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to approve this Purchase Requisition?"
        );

        if (!confirmed) {
            return;
        }


        try {

            await ApprovalService.approveRequest(
                id,
                "admin"
            );

            alert(
                "Purchase Requisition approved successfully."
            );

            await fetchApprovals();

        } catch (error) {

            console.error(
                "Approval failed",
                error
            );

            console.error(
                "Approval error response:",
                error?.response?.data
            );

            alert(
                error?.response?.data?.message ||
                "Failed to approve Purchase Requisition."
            );

        }

    };


    // ==========================================
    // REJECT
    // ==========================================

    const handleReject = async (id) => {

        const reason = window.prompt(
            "Enter rejection reason:"
        );

        if (reason === null) {
            return;
        }


        try {

            await ApprovalService.rejectRequest(
                id,
                "admin",
                reason
            );

            alert(
                "Purchase Requisition rejected successfully."
            );

            await fetchApprovals();

        } catch (error) {

            console.error(
                "Rejection failed",
                error
            );

            console.error(
                "Rejection error response:",
                error?.response?.data
            );

            alert(
                error?.response?.data?.message ||
                "Failed to reject Purchase Requisition."
            );

        }

    };


    // ==========================================
    // FORMAT BOX TYPES
    // ==========================================

    const getBoxTypes = (request) => {

        if (
            !request.items ||
            !Array.isArray(request.items) ||
            request.items.length === 0
        ) {

            return "-";

        }

        return request.items
            .map(item => item.boxType || "-")
            .join(", ");

    };


    // ==========================================
    // FORMAT QUANTITIES
    // ==========================================

    const getQuantities = (request) => {

        if (
            !request.items ||
            !Array.isArray(request.items) ||
            request.items.length === 0
        ) {

            return "-";

        }

        return request.items
            .map(item => item.quantity ?? "-")
            .join(", ");

    };


    // ==========================================
    // TABLE COLUMNS
    // ==========================================

    const columns = [

        {
            key: "id",
            label: "Request ID"
        },


        {
            key: "prNumber",
            label: "PR Number"
        },


        {
            key: "boxType",
            label: "Box Type",

            render: (request) =>
                getBoxTypes(request)

        },


        {
            key: "quantity",
            label: "Quantity",

            render: (request) =>
                getQuantities(request)

        },


        {
            key: "requestedBy",
            label: "Requested By"
        },


        {
            key: "department",
            label: "Department"
        },


        {
            key: "priority",
            label: "Priority"
        },


        {
            key: "status",
            label: "Status"
        },


        {
            key: "action",
            label: "Action",

            render: (request) => (

                <div className="flex gap-2">

                    <Button
                        variant="success"
                        onClick={() =>
                            handleApprove(request.id)
                        }
                    >

                        Approve

                    </Button>


                    <Button
                        variant="danger"
                        onClick={() =>
                            handleReject(request.id)
                        }
                    >

                        Reject

                    </Button>

                </div>

            )

        }

    ];


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return <Loader />;

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

       <div className="approvals-module">

            <h1 className="text-2xl font-bold mb-6">

                Purchase Approvals

            </h1>


            <Table
                columns={columns}
                data={requests}
                loading={loading}
                emptyMessage="No pending approvals"
            />

        </div>

    );

};

export default Approvals;