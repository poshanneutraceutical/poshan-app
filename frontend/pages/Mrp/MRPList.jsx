import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Plus,
    Search,
    Eye,
    Pencil,
    Trash2,
    PackageCheck,
    RefreshCw
} from "lucide-react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import MRPService from "../../services/MRPService";

import "./MRP.css";


const MRPList = () => {

    const navigate = useNavigate();


    const [mrpList, setMrpList] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");


    // =========================================================
    // LOAD MRP
    // =========================================================

    useEffect(() => {

        loadMrp();

    }, []);


    const loadMrp = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await MRPService.getAllMrp();

            setMrpList(
                Array.isArray(data)
                    ? data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Failed to load MRP details:",
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
    // DELETE
    // =========================================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this MRP record?"
            );

        if (!confirmed) {

            return;

        }


        try {

            setError("");

            await MRPService.deleteMrp(id);

            await loadMrp();

        }
        catch (error) {

            console.error(
                "MRP delete failed:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to delete MRP record."
            );

        }

    };


    // =========================================================
    // SEARCH
    // =========================================================

    const filteredMrp = useMemo(() => {

        const searchValue =
            search
                .trim()
                .toLowerCase();


        if (!searchValue) {

            return mrpList;

        }


        return mrpList.filter((item) => {

            const searchableText = [

                item.mrp,

                item.batchNumber,

                item.companyName,

                item.scopeType,

                item.boxType,

                item.neckSealType,

                item.note

            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            return searchableText.includes(
                searchValue
            );

        });

    }, [mrpList, search]);


    // =========================================================
    // DATE FORMAT
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
                    month: "short",
                    year: "numeric"
                }
            );

        }
        catch {

            return date;

        }

    };


    // =========================================================
    // EMPTY / LOADING
    // =========================================================

    return (

        <div className="mrp-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="mrp-page-header">

                <div className="mrp-title-section">

                    <div className="mrp-title-icon">

                        <PackageCheck size={24} />

                    </div>


                    <div>

                        <h1>

                            MRP Management

                        </h1>


                        <p>

                            Manage product, batch and MRP master information

                        </p>

                    </div>

                </div>


                <div className="mrp-header-actions">

                    <button
                        type="button"
                        className="mrp-refresh-btn"
                        onClick={loadMrp}
                        disabled={loading}
                        title="Refresh"
                    >

                        <RefreshCw
                            size={17}
                            className={
                                loading
                                    ? "mrp-spin"
                                    : ""
                            }
                        />

                    </button>


                    <Link
                        to="/mrp/add"
                        className="mrp-primary-btn"
                    >

                        <Plus size={18} />

                        Create MRP

                    </Link>

                </div>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="mrp-error">

                    <span className="mrp-error-icon">

                        !

                    </span>

                    <span>

                        {error}

                    </span>

                </div>

            )}


            {/* =================================================
                SUMMARY
            ================================================= */}

            <div className="mrp-summary-grid">

                <div className="mrp-summary-card">

                    <div className="mrp-summary-icon">

                        <PackageCheck size={20} />

                    </div>

                    <div>

                        <span>
                            Total Records
                        </span>

                        <strong>
                            {mrpList.length}
                        </strong>

                    </div>

                </div>


                <div className="mrp-summary-card">

                    <div className="mrp-summary-icon">

                        <PackageCheck size={20} />

                    </div>

                    <div>

                        <span>
                            Showing
                        </span>

                        <strong>
                            {filteredMrp.length}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="mrp-search-card">

                <div className="mrp-search-wrapper">

                    <Search
                        size={18}
                        className="mrp-search-icon"
                    />


                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        placeholder="Search by MRP, batch number, company, scope, box type..."
                    />

                </div>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="mrp-table-card">

                <div className="mrp-table-wrapper">

                    <table className="mrp-table">

                        <thead>

                            <tr>

                                <th>
                                    MRP
                                </th>

                                <th>
                                    Batch Number
                                </th>

                                <th>
                                    Company
                                </th>

                                <th>
                                    MFG Date
                                </th>

                                <th>
                                    EXP Date
                                </th>

                                <th>
                                    Scope Type
                                </th>

                                <th>
                                    Box Type
                                </th>

                                <th className="mrp-action-header">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="mrp-state-cell"
                                    >

                                        <RefreshCw
                                            size={22}
                                            className="mrp-spin"
                                        />

                                        <span>
                                            Loading MRP records...
                                        </span>

                                    </td>

                                </tr>

                            ) : filteredMrp.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="mrp-state-cell"
                                    >

                                        <PackageCheck size={38} />

                                        <strong>

                                            {search
                                                ? "No matching MRP records"
                                                : "No MRP records found"
                                            }

                                        </strong>

                                        <span>

                                            {search
                                                ? "Try changing your search."
                                                : "Create your first MRP record to get started."
                                            }

                                        </span>

                                    </td>

                                </tr>

                            ) : (

                                filteredMrp.map((item) => (

                                    <tr
                                        key={item.id}
                                    >

                                        <td>

                                            <div className="mrp-primary-value">

                                                ₹ {item.mrp || "-"}

                                            </div>

                                        </td>


                                        <td>

                                            <span className="mrp-batch-badge">

                                                {item.batchNumber || "-"}

                                            </span>

                                        </td>


                                        <td>

                                            <div className="mrp-company">

                                                {item.companyName || "-"}

                                            </div>

                                        </td>


                                        <td>

                                            {formatDate(
                                                item.mfgDate
                                            )}

                                        </td>


                                        <td>

                                            {formatDate(
                                                item.expDate
                                            )}

                                        </td>


                                        <td>

                                            <span className="mrp-soft-badge">

                                                {item.scopeType || "-"}

                                            </span>

                                        </td>


                                        <td>

                                            <span className="mrp-box-text">

                                                {item.boxType
                                                    ? item.boxType.replaceAll(
                                                        "_",
                                                        " "
                                                    )
                                                    : "-"
                                                }

                                            </span>

                                        </td>


                                        <td className="mrp-action-cell">

                                            <div className="mrp-actions">

                                                <button
                                                    type="button"
                                                    className="mrp-action-btn mrp-view-btn"
                                                    title="View MRP"
                                                    onClick={() =>
                                                        navigate(
                                                            `/mrp/${item.id}`
                                                        )
                                                    }
                                                >

                                                    <Eye size={17} />

                                                </button>


                                                <button
                                                    type="button"
                                                    className="mrp-action-btn mrp-edit-btn"
                                                    title="Edit MRP"
                                                    onClick={() =>
                                                        navigate(
                                                            `/mrp/edit/${item.id}`
                                                        )
                                                    }
                                                >

                                                    <Pencil size={17} />

                                                </button>


                                                <button
                                                    type="button"
                                                    className="mrp-action-btn mrp-delete-btn"
                                                    title="Delete MRP"
                                                    onClick={() =>
                                                        handleDelete(
                                                            item.id
                                                        )
                                                    }
                                                >

                                                    <Trash2 size={17} />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};


export default MRPList;