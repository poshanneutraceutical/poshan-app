import React, {
    useState
} from "react";

import {
    createOpening
} from "../../services/OpeningService";

import {
    ArrowLeft,
    Save,
    BriefcaseBusiness,
    FileText,
    Building2,
    UserRound,
    CalendarDays,
    CalendarClock,
    WalletCards
} from "lucide-react";

import {
    useNavigate,
    Link
} from "react-router-dom";

import "./Opening.css";


const OpeningForm = () => {

    const navigate = useNavigate();


    const [opening, setOpening] = useState({

        jobtittle: "",

        department: "",

        position: "",

        posteddate: "",

        closingdate: "",

        salaryrange: "",

        description: ""

    });


    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    /*
     ==========================================
     HANDLE CHANGE
     ==========================================
     */

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setOpening((previousOpening) => ({

            ...previousOpening,

            [name]: value

        }));

    };


    /*
     ==========================================
     SUBMIT
     ==========================================
     */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) {

            return;

        }

        try {

            setLoading(true);

            setError("");


            await createOpening({

                ...opening,

                jobtittle:
                    opening.jobtittle.trim(),

                department:
                    opening.department.trim(),

                position:
                    opening.position.trim(),

                salaryrange:
                    opening.salaryrange.trim(),

                description:
                    opening.description.trim()

            });


            navigate("/openings");


        } catch (error) {

            console.error(
                "Opening creation failed:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                error.message ||
                "Unable to create job opening."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="opening-page">

            <div className="opening-form-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="opening-form-header">

                    <div className="opening-form-title-row">

                        <div className="opening-form-title-icon">

                            <BriefcaseBusiness
                                size={23}
                            />

                        </div>


                        <div>

                            <h1 className="opening-form-title">

                                Create Job Opening

                            </h1>

                            <p className="opening-form-subtitle">

                                Create and publish a new organizational position

                            </p>

                        </div>

                    </div>


                    <Link
                        to="/openings"
                        className="opening-back-btn"
                    >

                        <ArrowLeft size={17} />

                        Back to Openings

                    </Link>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="opening-error-message">

                        <span className="opening-error-icon">

                            !

                        </span>

                        <span>

                            {error}

                        </span>

                    </div>

                )}


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="opening-form"
                >


                    {/* =================================================
                        BASIC INFORMATION
                    ================================================= */}

                    <div className="opening-form-card">


                        <div className="opening-section-header">

                            <div className="opening-section-icon">

                                <FileText size={20} />

                            </div>


                            <div>

                                <h2>
                                    Opening Information
                                </h2>

                                <p>
                                    Enter the basic details of the job opening
                                </p>

                            </div>

                        </div>


                        <div className="opening-form-grid">


                            {/* JOB TITLE */}

                            <div className="opening-field opening-field-full">

                                <label htmlFor="jobtittle">

                                    Job Title

                                    <span className="opening-required">
                                        *
                                    </span>

                                </label>


                                <div className="opening-input-wrapper">

                                    <BriefcaseBusiness
                                        size={17}
                                        className="opening-input-icon"
                                    />

                                    <input
                                        id="jobtittle"
                                        type="text"
                                        name="jobtittle"
                                        placeholder="Enter job title"
                                        value={opening.jobtittle}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />

                                </div>

                            </div>


                            {/* DEPARTMENT */}

                            <div className="opening-field">

                                <label htmlFor="department">

                                    Department

                                </label>


                                <div className="opening-input-wrapper">

                                    <Building2
                                        size={17}
                                        className="opening-input-icon"
                                    />

                                    <input
                                        id="department"
                                        type="text"
                                        name="department"
                                        placeholder="Enter department"
                                        value={opening.department}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />

                                </div>

                            </div>


                            {/* POSITION */}

                            <div className="opening-field">

                                <label htmlFor="position">

                                    Position

                                </label>


                                <div className="opening-input-wrapper">

                                    <UserRound
                                        size={17}
                                        className="opening-input-icon"
                                    />

                                    <input
                                        id="position"
                                        type="text"
                                        name="position"
                                        placeholder="Enter position"
                                        value={opening.position}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />

                                </div>

                            </div>


                            {/* SALARY RANGE */}

                            <div className="opening-field">

                                <label htmlFor="salaryrange">

                                    Salary Range

                                </label>


                                <div className="opening-input-wrapper">

                                    <WalletCards
                                        size={17}
                                        className="opening-input-icon"
                                    />

                                    <input
                                        id="salaryrange"
                                        type="text"
                                        name="salaryrange"
                                        placeholder="e.g. ₹20,000 - ₹35,000"
                                        value={opening.salaryrange}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />

                                </div>

                            </div>


                            {/* POSTED DATE */}

                            <div className="opening-field">

                                <label htmlFor="posteddate">

                                    Posted Date

                                </label>


                                <div className="opening-input-wrapper">

                                    <CalendarDays
                                        size={17}
                                        className="opening-input-icon"
                                    />

                                    <input
                                        id="posteddate"
                                        type="datetime-local"
                                        name="posteddate"
                                        value={opening.posteddate}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />

                                </div>

                            </div>


                            {/* CLOSING DATE */}

                            <div className="opening-field">

                                <label htmlFor="closingdate">

                                    Closing Date

                                </label>


                                <div className="opening-input-wrapper">

                                    <CalendarClock
                                        size={17}
                                        className="opening-input-icon"
                                    />

                                    <input
                                        id="closingdate"
                                        type="datetime-local"
                                        name="closingdate"
                                        value={opening.closingdate}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />

                                </div>

                            </div>


                            {/* DESCRIPTION */}

                            <div className="opening-field opening-field-full">

                                <label htmlFor="description">

                                    Job Description

                                </label>


                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Enter job description, responsibilities and requirements..."
                                    value={opening.description}
                                    onChange={handleChange}
                                    rows="7"
                                    disabled={loading}
                                />

                            </div>


                        </div>

                    </div>


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="opening-form-actions">

                        <button
                            type="button"
                            className="opening-cancel-btn"
                            onClick={() =>
                                navigate("/openings")
                            }
                            disabled={loading}
                        >

                            <ArrowLeft size={17} />

                            Cancel

                        </button>


                        <button
                            type="submit"
                            className="opening-submit-btn"
                            disabled={loading}
                        >

                            <Save size={17} />

                            {loading
                                ? "Saving..."
                                : "Save Opening"
                            }

                        </button>

                    </div>


                </form>

            </div>

        </div>

    );

};


export default OpeningForm;