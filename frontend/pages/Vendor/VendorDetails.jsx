import React, { useEffect, useState } from "react";
import { ArrowLeft, Pencil, Building2, Mail, Phone, MessageCircle, Tag, MapPin, CalendarDays, ClipboardList } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import VendorService from "../../services/VendorService";

import "./Vendor.css";


const VendorDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [vendor, setVendor] = useState(null);

    const [loading, setLoading] = useState(true);


    /* =====================================================
       LOAD VENDOR
    ===================================================== */

    useEffect(() => {

        loadVendor();

    }, [id]);


    const loadVendor = async () => {

        try {

            setLoading(true);

            const data =
                await VendorService.getById(id);

            setVendor(data);

        }
        catch (error) {

            console.error(
                "Failed to load vendor",
                error
            );

        }
        finally {

            setLoading(false);

        }

    };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <div className="vendor-details-container">

                <div className="vendor-details-state">

                    <span className="loading-spinner" />

                    <span>
                        Loading vendor...
                    </span>

                </div>

            </div>

        );

    }


    /* =====================================================
       NOT FOUND
    ===================================================== */

    if (!vendor) {

        return (

            <div className="vendor-details-container">

                <div className="vendor-details-state">

                    <div className="empty-icon">

                        <Building2 size={22} />

                    </div>

                    <strong>
                        Vendor not found
                    </strong>

                    <button
                        type="button"
                        className="back-btn"
                        onClick={() =>
                            navigate("/procurement/vendors")
                        }
                    >

                        <ArrowLeft size={17} />

                        Back to Vendors

                    </button>

                </div>

            </div>

        );

    }


    /* =====================================================
       UI
    ===================================================== */

    return (

        <div className="vendor-details-container">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="vendor-details-header">

                <div className="vendor-details-title">

                    <div className="vendor-details-icon">

                        <Building2 size={23} />

                    </div>

                    <div>

                        <h2>
                            {vendor.vendorName}
                        </h2>

                        <p>
                            {vendor.vendorCompanyName}
                        </p>

                    </div>

                </div>


                <div className="vendor-details-actions">

                    <button
                        type="button"
                        className="back-btn"
                        onClick={() =>
                            navigate("/procurement/vendors")
                        }
                    >

                        <ArrowLeft size={17} />

                        Back

                    </button>


                    <button
                        type="button"
                        className="edit-btn"
                        onClick={() =>
                            navigate(
                                `/procurement/vendors/edit/${vendor.id}`
                            )
                        }
                    >

                        <Pencil size={17} />

                        Edit Vendor

                    </button>

                </div>

            </div>


            {/* =================================================
                DETAILS GRID
            ================================================= */}

            <div className="details-grid">


                {/* =================================================
                    VENDOR INFORMATION
                ================================================= */}

                <div className="detail-card">

                    <div className="detail-card-header">

                        <div className="detail-card-icon">

                            <Building2 size={19} />

                        </div>

                        <div>

                            <h3>
                                Vendor Information
                            </h3>

                            <p>
                                Registered vendor details
                            </p>

                        </div>

                    </div>


                    <div className="vendor-info-list">


                        {/* COMPANY */}

                        <div className="vendor-info-row">

                            <div className="vendor-info-label">

                                <Building2 size={17} />

                                <span>
                                    Company
                                </span>

                            </div>

                            <strong>
                                {vendor.vendorCompanyName || "-"}
                            </strong>

                        </div>


                        {/* EMAIL */}

                        <div className="vendor-info-row">

                            <div className="vendor-info-label">

                                <Mail size={17} />

                                <span>
                                    Email
                                </span>

                            </div>

                            <strong>
                                {vendor.vendorEmail || "-"}
                            </strong>

                        </div>


                        {/* CONTACT */}

                        <div className="vendor-info-row">

                            <div className="vendor-info-label">

                                <Phone size={17} />

                                <span>
                                    Contact
                                </span>

                            </div>

                            <strong>
                                {vendor.contactNumber || "-"}
                            </strong>

                        </div>


                        {/* WHATSAPP */}

                        <div className="vendor-info-row">

                            <div className="vendor-info-label">

                                <MessageCircle size={17} />

                                <span>
                                    WhatsApp
                                </span>

                            </div>

                            <strong>
                                {vendor.whatsappNumber || "-"}
                            </strong>

                        </div>


                        {/* CATEGORY */}

                        <div className="vendor-info-row">

                            <div className="vendor-info-label">

                                <Tag size={17} />

                                <span>
                                    Category
                                </span>

                            </div>

                            <strong>
                                {vendor.category || "-"}
                            </strong>

                        </div>


                        {/* ADDRESS */}

                        <div className="vendor-info-row vendor-info-row-address">

                            <div className="vendor-info-label">

                                <MapPin size={17} />

                                <span>
                                    Address
                                </span>

                            </div>

                            <strong>
                                {vendor.address || "-"}
                            </strong>

                        </div>


                        {/* CREATED */}

                        <div className="vendor-info-row">

                            <div className="vendor-info-label">

                                <CalendarDays size={17} />

                                <span>
                                    Created
                                </span>

                            </div>

                            <strong>

                                {

                                    vendor.createdAt

                                        ?

                                        new Date(
                                            vendor.createdAt
                                        ).toLocaleString()

                                        :

                                        "-"

                                }

                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    PURCHASE SUMMARY
                ================================================= */}

                <div className="detail-card">

                    <div className="detail-card-header">

                        <div className="detail-card-icon">

                            <ClipboardList size={19} />

                        </div>

                        <div>

                            <h3>
                                Purchase Summary
                            </h3>

                            <p>
                                Purchase requisition overview
                            </p>

                        </div>

                    </div>


                    <div className="purchase-summary">


                        {/* TOTAL PR */}

                        <div className="summary-item">

                            <span>
                                Total PR
                            </span>

                            <strong>
                                {vendor.totalPurchaseRequisitions ?? 0}
                            </strong>

                        </div>


                        {/* PENDING PR */}

                        <div className="summary-item">

                            <span>
                                Pending PR
                            </span>

                            <strong>
                                {vendor.pendingPurchaseRequisitions ?? 0}
                            </strong>

                        </div>


                        {/* APPROVED PR */}

                        <div className="summary-item">

                            <span>
                                Approved PR
                            </span>

                            <strong>
                                {vendor.approvedPurchaseRequisitions ?? 0}
                            </strong>

                        </div>


                        {/* LAST PR */}

                        <div className="summary-item">

                            <span>
                                Last PR
                            </span>

                            <strong>

                                {

                                    vendor.lastPurchaseRequisitionDate

                                        ?

                                        new Date(
                                            vendor.lastPurchaseRequisitionDate
                                        ).toLocaleDateString()

                                        :

                                        "-"

                                }

                            </strong>

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                BOTTOM BACK BUTTON
            ================================================= */}

            <div className="vendor-details-footer">

                <button
                    type="button"
                    className="back-btn"
                    onClick={() =>
                        navigate("/procurement/vendors")
                    }
                >

                    <ArrowLeft size={17} />

                    Back to Vendors

                </button>

            </div>

        </div>

    );

};


export default VendorDetails;