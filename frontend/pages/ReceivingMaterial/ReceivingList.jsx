import React, { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    Eye,
    Pencil,
    Trash2,
    PackagePlus
} from "lucide-react";
import { Link } from "react-router-dom";

import ReceivingMaterialService from "../../services/ReceivingMaterialService";

const ReceivingList = () => {

    const [receivings, setReceivings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadReceivings();
    }, []);

    const loadReceivings = async () => {
        try {
            setLoading(true);

            const data =
                await ReceivingMaterialService.getAllMaterials();

            setReceivings(data);
        } catch (error) {
            console.error(
                "Failed to load receiving materials",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const deleteReceiving = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this receiving material?"
        );

        if (!confirmDelete) return;

        try {
            await ReceivingMaterialService.deleteMaterial(id);
            loadReceivings();
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const filteredReceivings = useMemo(() => {

        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return receivings;
        }

        return receivings.filter((item) =>
            (
                `${item.billNumber || ""} ${
                    item.supplierName || ""
                } ${
                    item.receiverName || ""
                }`
            )
                .toLowerCase()
                .includes(keyword)
        );

    }, [receivings, search]);

    return (
        <div className="receiving-list-container">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="receiving-header">

                <div className="receiving-title-group">

                    <div className="receiving-title-icon">
                        <PackagePlus size={22} />
                    </div>

                    <div>
                        <h2>
                            Receiving Materials
                        </h2>

                        <p>
                            Manage all received materials
                        </p>
                    </div>

                </div>

                <Link
                    to="/procurement/receiving-material/add"
                    className="add-btn"
                >
                    <Plus size={18} />
                    Create Receiving
                </Link>

            </div>


            {/* =====================================================
                SEARCH
            ===================================================== */}

            <div className="receiving-toolbar">

                <div className="search-box">

                    <Search
                        size={18}
                        className="search-icon"
                    />

                    <input
                        type="text"
                        placeholder="Search bill number, supplier or receiver..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    {search && (
                        <button
                            type="button"
                            className="search-clear"
                            onClick={() => setSearch("")}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}

                </div>

                <div className="receiving-count">

                    {filteredReceivings.length}

                    <span>
                        {filteredReceivings.length === 1
                            ? " Record"
                            : " Records"}
                    </span>

                </div>

            </div>


            {/* =====================================================
                TABLE CARD
            ===================================================== */}

            <div className="receiving-table-container">

                <div className="receiving-table-scroll">

                    <table className="receiving-table">

                        <thead>
                            <tr>
                                <th>Bill No</th>
                                <th>Supplier</th>
                                <th>Receiver</th>
                                <th>Received Date</th>
                                <th>Items</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {/* LOADING */}

                            {loading && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="receiving-state-cell"
                                    >
                                        <div className="receiving-loading">
                                            <span className="loading-spinner" />
                                            <span>
                                                Loading receiving materials...
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )}


                            {/* EMPTY */}

                            {!loading &&
                                filteredReceivings.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="receiving-state-cell"
                                        >
                                            <div className="receiving-empty">

                                                <div className="empty-icon">
                                                    <PackagePlus size={24} />
                                                </div>

                                                <strong>
                                                    No Receiving Materials Found
                                                </strong>

                                                <span>
                                                    {search
                                                        ? "Try changing your search."
                                                        : "No receiving records are available yet."}
                                                </span>

                                            </div>
                                        </td>
                                    </tr>
                                )}


                            {/* DATA */}

                            {!loading &&
                                filteredReceivings.map((item) => (

                                    <tr key={item.id}>

                                        {/* BILL NUMBER */}

                                        <td>
                                            <div className="bill-cell">

                                                <div className="bill-icon">
                                                    <PackagePlus size={17} />
                                                </div>

                                                <span>
                                                    {item.billNumber || "-"}
                                                </span>

                                            </div>
                                        </td>


                                        {/* SUPPLIER */}

                                        <td>
                                            <span className="primary-cell">
                                                {item.supplierName || "-"}
                                            </span>
                                        </td>


                                        {/* RECEIVER */}

                                        <td>
                                            <span className="secondary-cell">
                                                {item.receiverName || "-"}
                                            </span>
                                        </td>


                                        {/* DATE */}

                                        <td>
                                            <span className="date-cell">
                                                {item.receivedDate
                                                    ? new Date(
                                                        item.receivedDate
                                                    ).toLocaleString()
                                                    : "-"}
                                            </span>
                                        </td>


                                        {/* ITEMS */}

                                        <td>
                                            <span className="items-badge">
                                                {item.receivingMaterialItems
                                                    ? item.receivingMaterialItems.length
                                                    : 0}
                                            </span>
                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div className="table-action">

                                                <Link
                                                    to={`/procurement/receiving-material/${item.id}`}
                                                    className="action-btn action-view"
                                                    title="View"
                                                    aria-label="View receiving material"
                                                >
                                                    <Eye size={17} />
                                                </Link>

                                                <Link
                                                    to={`/procurement/receiving-material/edit/${item.id}`}
                                                    className="action-btn action-edit"
                                                    title="Edit"
                                                    aria-label="Edit receiving material"
                                                >
                                                    <Pencil size={17} />
                                                </Link>

                                                <button
                                                    type="button"
                                                    className="action-btn action-delete"
                                                    onClick={() =>
                                                        deleteReceiving(item.id)
                                                    }
                                                    title="Delete"
                                                    aria-label="Delete receiving material"
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default ReceivingList;