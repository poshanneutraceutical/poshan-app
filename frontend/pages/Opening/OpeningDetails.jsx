import React, {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    BriefcaseBusiness,
    Building2,
    UserRound,
    CalendarDays,
    CalendarClock,
    WalletCards,
    FileText,
    Pencil
} from "lucide-react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import {
    getOpeningById
} from "../../services/OpeningService";

import "./Opening.css";


const OpeningDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [opening, setOpening] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    /*
     ==========================================
     LOAD OPENING
     ==========================================
     */

    useEffect(() => {

        loadOpening();

    }, [id]);


    const loadOpening = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getOpeningById(id);

            setOpening(data);

        } catch (error) {

            console.error(
                "Error fetching opening:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to load opening details."
            );

        } finally {

            setLoading(false);

        }

    };


    /*
     ==========================================
     DATE FORMAT
     ==========================================
     */

    const formatDate = (date) => {

        if (!date) {

            return "-";

        }

        return String(date)
            .replace("T", " ");

    };


    /*
     ==========================================
     LOADING
     ==========================================
     */

    if (loading) {

        return (

            <div className="opening-page">

                <div className="opening-loading">

                    <BriefcaseBusiness size={22} />

                    Loading Opening Details...

                </div>

            </div>

        );

    }


    /*
     ==========================================
     ERROR / NOT FOUND
     ==========================================
     */

    if (error || !opening) {

        return (

            <div className="opening-page">

                <div className="opening-details-container">

                    <div className="opening-form-card">

                        <div className="opening-section-header">

                            <div className="opening-section-icon">

                                <BriefcaseBusiness size={20} />

                            </div>

                            <div>

                                <h2>
                                    Opening Details
                                </h2>

                                <p>
                                    Job opening information
                                </p>

                            </div>

                        </div>


                        <div className="opening-error-message">

                            {error ||
                                "Job opening not found."
                            }

                        </div>


                        <button
                            type="button"
                            className="opening-cancel-btn"
                            onClick={() =>
                                navigate("/openings")
                            }
                        >

                            <ArrowLeft size={17} />

                            Back to Openings

                        </button>

                    </div>

                </div>

            </div>

        );

    }


    return (

        <div className="opening-page">

            <div className="opening-details-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="opening-details-header">

                    <div className="opening-details-title-row">

                        <div className="opening-details-title-icon">

                            <BriefcaseBusiness size={23} />

                        </div>


                        <div>

                            <h1 className="opening-details-title">

                                {opening.jobtittle ||
                                    "Job Opening"
                                }

                            </h1>


                            <p className="opening-details-subtitle">

                                Job Opening Details

                            </p>

                        </div>

                    </div>


                    <div className="opening-details-actions">

                        <button
                            type="button"
                            className="opening-details-back-btn"
                            onClick={() =>
                                navigate("/openings")
                            }
                        >

                            <ArrowLeft size={17} />

                            Back

                        </button>


                    </div>

                </div>


                {/* =================================================
                    OVERVIEW CARDS
                ================================================= */}

                <div className="opening-details-grid">


                    {/* DEPARTMENT */}

                    <div className="opening-details-card">

                        <div className="opening-details-card-header">

                            <div className="opening-details-card-icon">

                                <Building2 size={20} />

                            </div>

                            <h2>
                                Department
                            </h2>

                        </div>


                        <div className="opening-detail-value">

                            {opening.department || "-"}

                        </div>

                    </div>


                    {/* POSITION */}

                    <div className="opening-details-card">

                        <div className="opening-details-card-header">

                            <div className="opening-details-card-icon">

                                <UserRound size={20} />

                            </div>

                            <h2>
                                Position
                            </h2>

                        </div>


                        <div className="opening-detail-value">

                            {opening.position || "-"}

                        </div>

                    </div>


                    {/* SALARY */}

                    <div className="opening-details-card">

                        <div className="opening-details-card-header">

                            <div className="opening-details-card-icon">

                                <WalletCards size={20} />

                            </div>

                            <h2>
                                Salary Range
                            </h2>

                        </div>


                        <div className="opening-detail-value opening-salary-large">

                            {opening.salaryrange || "-"}

                        </div>

                    </div>


                    {/* POSTED DATE */}

                    <div className="opening-details-card">

                        <div className="opening-details-card-header">

                            <div className="opening-details-card-icon">

                                <CalendarDays size={20} />

                            </div>

                            <h2>
                                Posted Date
                            </h2>

                        </div>


                        <div className="opening-detail-value">

                            {formatDate(
                                opening.posteddate
                            )}

                        </div>

                    </div>


                    {/* CLOSING DATE */}

                    <div className="opening-details-card">

                        <div className="opening-details-card-header">

                            <div className="opening-details-card-icon opening-closing-icon">

                                <CalendarClock size={20} />

                            </div>

                            <h2>
                                Closing Date
                            </h2>

                        </div>


                        <div className="opening-detail-value">

                            {formatDate(
                                opening.closingdate
                            )}

                        </div>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="opening-details-card opening-details-card-full">

                        <div className="opening-details-card-header">

                            <div className="opening-details-card-icon">

                                <FileText size={20} />

                            </div>

                            <h2>
                                Job Description
                            </h2>

                        </div>


                        <div className="opening-description-box">

                            {opening.description ||
                                "No job description has been provided."
                            }

                        </div>

                    </div>


                </div>


            </div>

        </div>

    );

};


export default OpeningDetails;