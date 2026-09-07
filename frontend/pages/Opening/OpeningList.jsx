import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    getOpenings,
    deleteOpening
} from "../../services/OpeningService";

import {
    Plus,
    Eye,
    Trash2,
    Search,
    BriefcaseBusiness,
    ListChecks
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./Opening.css";


const OpeningList = () => {

    const [openings, setOpenings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const navigate = useNavigate();


    /*
     ==========================================
     LOAD OPENINGS
     ==========================================
     */

    useEffect(() => {

        loadOpenings();

    }, []);


    const loadOpenings = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getOpenings();

            setOpenings(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Error loading openings:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to load job openings."
            );

        } finally {

            setLoading(false);

        }

    };


    /*
     ==========================================
     DELETE OPENING
     ==========================================
     */

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this job opening?"
            );

        if (!confirmed) {

            return;

        }

        try {

            setError("");

            await deleteOpening(id);

            await loadOpenings();

        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to delete job opening."
            );

        }

    };


    /*
     ==========================================
     SEARCH
     ==========================================
     */

    const filteredOpenings = useMemo(() => {

        const searchValue =
            search.trim().toLowerCase();

        if (!searchValue) {

            return openings;

        }

        return openings.filter((opening) => {

            const searchableText = [

                opening.jobtittle,

                opening.department,

                opening.position,

                opening.salaryrange,

                opening.description

            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableText.includes(
                searchValue
            );

        });

    }, [openings, search]);


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

            <div className="opening-loading">

                <BriefcaseBusiness size={22} />

                Loading Job Openings...

            </div>

        );

    }


    /*
     ==========================================
     MAIN UI
     ==========================================
     */

    return (

        <div className="opening-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="opening-header">


                <div className="opening-title-row">


                    <div className="opening-title-icon">

                        <BriefcaseBusiness
                            size={23}
                        />

                    </div>


                    <div>

                        <h1 className="opening-page-title">

                            Job Openings

                        </h1>


                        <p className="opening-page-subtitle">

                            Create, manage and track organizational job openings

                        </p>

                    </div>


                </div>


                <button
                    type="button"
                    className="opening-primary-btn"
                    onClick={() =>
                        navigate("/openings/add")
                    }
                >

                    <Plus size={18} />

                    Add Opening

                </button>


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
                SEARCH
            ================================================= */}

            <div className="opening-search-container">

                <Search
                    size={18}
                    className="opening-search-icon"
                />

                <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                        setSearch(
                            event.target.value
                        )
                    }
                    placeholder="Search by job title, department, position or salary range..."
                    className="opening-search-input"
                />

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="opening-table-wrapper">

                <table className="opening-table">


                    <thead>

                        <tr>

                            <th>
                                Job Title
                            </th>

                            <th>
                                Department
                            </th>

                            <th>
                                Position
                            </th>

                            <th>
                                Salary Range
                            </th>

                            <th>
                                Closing Date
                            </th>

                            <th className="opening-actions-header">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>


                        {filteredOpenings.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="opening-empty-state"
                                >

                                    <ListChecks
                                        size={38}
                                    />

                                    <div>

                                        {search
                                            ? "No job openings match your search."
                                            : "No job openings found."
                                        }

                                    </div>

                                </td>

                            </tr>

                        ) : (

                            filteredOpenings.map(
                                (opening) => (

                                    <tr
                                        key={opening.id}
                                    >


                                        {/* JOB TITLE */}

                                        <td className="opening-title-cell">

                                            <div className="opening-job-title">

                                                {opening.jobtittle || "-"}

                                            </div>

                                        </td>


                                        {/* DEPARTMENT */}

                                        <td>

                                            <span className="opening-department-badge">

                                                {opening.department || "-"}

                                            </span>

                                        </td>


                                        {/* POSITION */}

                                        <td>

                                            {opening.position || "-"}

                                        </td>


                                        {/* SALARY */}

                                        <td>

                                            <span className="opening-salary">

                                                {opening.salaryrange || "-"}

                                            </span>

                                        </td>


                                        {/* CLOSING DATE */}

                                        <td>

                                            {formatDate(
                                                opening.closingdate
                                            )}

                                        </td>


                                        {/* ACTIONS */}

                                        <td className="opening-actions-cell">

                                            <div className="opening-actions">


                                                {/* VIEW */}

                                                <button
                                                    type="button"
                                                    className="opening-action-btn opening-view-btn"
                                                    title="View Opening"
                                                    onClick={() =>
                                                        navigate(
                                                            `/openings/${opening.id}`
                                                        )
                                                    }
                                                >

                                                    <Eye />

                                                </button>


                                                {/* DELETE */}

                                                <button
                                                    type="button"
                                                    className="opening-action-btn opening-delete-btn"
                                                    title="Delete Opening"
                                                    onClick={() =>
                                                        handleDelete(
                                                            opening.id
                                                        )
                                                    }
                                                >

                                                    <Trash2 />

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


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="opening-table-footer">

                <span>

                    Showing{" "}

                    <strong>
                        {filteredOpenings.length}
                    </strong>

                    {" "}of{" "}

                    <strong>
                        {openings.length}
                    </strong>

                    {" "}
                    {openings.length === 1
                        ? "opening"
                        : "openings"
                    }

                </span>

            </div>


        </div>

    );

};


export default OpeningList;