import React, {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    Pencil,
    PackageCheck,
    Hash,
    Building2,
    Calendar,
    Box,
    ShieldCheck,
    FileText,
    IndianRupee
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import MRPService from "../../services/MRPService";

import "./MRP.css";


const MRPDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();


    const [mrp, setMrp] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =========================================================
    // LOAD
    // =========================================================

    useEffect(() => {

        loadMrp();

    }, [id]);


    const loadMrp = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await MRPService.getMrpById(id);

            setMrp(data);

        }
        catch (error) {

            console.error(
                "Failed to load MRP:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to load MRP details."
            );

        }
        finally {

            setLoading(false);

        }

    };


    // =========================================================
    // DATE
    // =========================================================

    const formatDate = (date) => {

        if (!date) {

            return "-";

        }


        try {

            return new Date(date).toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );

        }
        catch {

            return date;

        }

    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="mrp-page">

                <div className="mrp-loading-page">

                    <PackageCheck
                        size={30}
                        className="mrp-spin"
                    />

                    <span>
                        Loading MRP details...
                    </span>

                </div>

            </div>

        );

    }


    // =========================================================
    // NOT FOUND
    // =========================================================

    if (!mrp) {

        return (

            <div className="mrp-page">

                <div className="mrp-not-found">

                    <PackageCheck size={42} />

                    <h2>
                        MRP Record Not Found
                    </h2>

                    <p>
                        {error ||
                            "The requested MRP record could not be found."
                        }
                    </p>


                    <Link
                        to="/mrp"
                        className="mrp-primary-btn"
                    >

                        <ArrowLeft size={17} />

                        Back to MRP

                    </Link>

                </div>

            </div>

        );

    }


    return (

        <div className="mrp-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="mrp-details-header">

                <div className="mrp-title-section">

                    <div className="mrp-title-icon">

                        <PackageCheck size={24} />

                    </div>


                    <div>

                        <h1>

                            MRP Details

                        </h1>


                        <p>

                            Complete product and batch master information

                        </p>

                    </div>

                </div>


                <div className="mrp-details-actions">

                    <Link
                        to="/mrp"
                        className="mrp-back-btn"
                    >

                        <ArrowLeft size={17} />

                        Back

                    </Link>


                    <button
                        type="button"
                        className="mrp-primary-btn"
                        onClick={() =>
                            navigate(
                                `/mrp/edit/${mrp.id}`
                            )
                        }
                    >

                        <Pencil size={17} />

                        Edit MRP

                    </button>

                </div>

            </div>


            {/* =================================================
                HERO
            ================================================= */}

            <div className="mrp-details-hero">

                <div className="mrp-hero-main">

                    <div className="mrp-hero-icon">

                        <IndianRupee size={28} />

                    </div>


                    <div>

                        <span>
                            Maximum Retail Price
                        </span>

                        <strong>

                            ₹ {mrp.mrp || "-"}

                        </strong>

                    </div>

                </div>


                <div className="mrp-hero-batch">

                    <span>
                        Batch Number
                    </span>

                    <strong>
                        {mrp.batchNumber || "-"}
                    </strong>

                </div>

            </div>


            {/* =================================================
                INFORMATION GRID
            ================================================= */}

            <div className="mrp-details-grid">


                {/* PRODUCT */}

                <div className="mrp-details-card">

                    <div className="mrp-details-card-header">

                        <div className="mrp-section-icon">

                            <Building2 size={20} />

                        </div>

                        <div>

                            <h2>
                                Product Information
                            </h2>

                            <p>
                                Product and company details
                            </p>

                        </div>

                    </div>


                    <div className="mrp-info-grid">

                        <div className="mrp-info-item">

                            <span>
                                Company Name
                            </span>

                            <strong>
                                {mrp.companyName || "-"}
                            </strong>

                        </div>


                        <div className="mrp-info-item">

                            <span>
                                Scope Type
                            </span>

                            <strong>
                                {mrp.scopeType || "-"}
                            </strong>

                        </div>


                        <div className="mrp-info-item">

                            <span>
                                Box Type
                            </span>

                            <strong>

                                {mrp.boxType
                                    ? mrp.boxType.replaceAll(
                                        "_",
                                        " "
                                    )
                                    : "-"
                                }

                            </strong>

                        </div>


                        <div className="mrp-info-item">

                            <span>
                                Neck Seal Type
                            </span>

                            <strong>
                                {mrp.neckSealType || "-"}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* DATES */}

                <div className="mrp-details-card">

                    <div className="mrp-details-card-header">

                        <div className="mrp-section-icon">

                            <Calendar size={20} />

                        </div>

                        <div>

                            <h2>
                                Manufacturing Timeline
                            </h2>

                            <p>
                                Manufacturing and expiry information
                            </p>

                        </div>

                    </div>


                    <div className="mrp-date-grid">

                        <div className="mrp-date-item">

                            <div className="mrp-date-icon">

                                <Calendar size={18} />

                            </div>

                            <div>

                                <span>
                                    Manufacturing Date
                                </span>

                                <strong>
                                    {formatDate(
                                        mrp.mfgDate
                                    )}
                                </strong>

                            </div>

                        </div>


                        <div className="mrp-date-item">

                            <div className="mrp-date-icon">

                                <Calendar size={18} />

                            </div>

                            <div>

                                <span>
                                    Expiry Date
                                </span>

                                <strong>
                                    {formatDate(
                                        mrp.expDate
                                    )}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>


                {/* BATCH */}

                <div className="mrp-details-card mrp-card-full">

                    <div className="mrp-details-card-header">

                        <div className="mrp-section-icon">

                            <Hash size={20} />

                        </div>

                        <div>

                            <h2>
                                Batch Information
                            </h2>

                            <p>
                                Identification and packaging information
                            </p>

                        </div>

                    </div>


                    <div className="mrp-batch-details">

                        <div className="mrp-batch-detail">

                            <span>
                                Batch Number
                            </span>

                            <strong>
                                {mrp.batchNumber || "-"}
                            </strong>

                        </div>


                        <div className="mrp-batch-detail">

                            <span>
                                Box Type
                            </span>

                            <strong>

                                {mrp.boxType
                                    ? mrp.boxType.replaceAll(
                                        "_",
                                        " "
                                    )
                                    : "-"
                                }

                            </strong>

                        </div>


                        <div className="mrp-batch-detail">

                            <span>
                                Neck Seal
                            </span>

                            <strong>
                                {mrp.neckSealType || "-"}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* NOTES */}

                <div className="mrp-details-card mrp-card-full">

                    <div className="mrp-details-card-header">

                        <div className="mrp-section-icon">

                            <FileText size={20} />

                        </div>

                        <div>

                            <h2>
                                Notes
                            </h2>

                            <p>
                                Additional information
                            </p>

                        </div>

                    </div>


                    <div className="mrp-note-box">

                        {mrp.note ||
                            "No additional notes have been added to this MRP record."
                        }

                    </div>

                </div>

            </div>

        </div>

    );

};


export default MRPDetails;