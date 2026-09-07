import { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    Eye,
    Pencil,
    Trash2
} from "lucide-react";
import { Link } from "react-router-dom";

import VendorService from "../../services/VendorService";


const VendorList = () => {

    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");


    /* =====================================================
       LOAD VENDORS
    ===================================================== */

    useEffect(() => {

        loadVendors();

    }, []);


    const loadVendors = async () => {

        try {

            setLoading(true);

            const data =
                await VendorService.getAll();

            setVendors(
                Array.isArray(data)
                    ? data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Failed to load vendors",
                error
            );

        }
        finally {

            setLoading(false);

        }

    };


    /* =====================================================
       DELETE VENDOR
    ===================================================== */

    const handleDelete = async (id) => {

        if (
            !window.confirm(
                "Delete this vendor?"
            )
        ) {

            return;

        }

        try {

            await VendorService.delete(id);

            loadVendors();

        }
        catch (error) {

            console.error(
                "Vendor delete failed",
                error
            );

        }

    };


    /* =====================================================
       SEARCH / FILTER
    ===================================================== */

    const filteredVendors = useMemo(() => {

        const query =
            search.trim().toLowerCase();

        if (!query) {

            return vendors;

        }

        return vendors.filter(
            (vendor) =>

                (
                    vendor.vendorName || ""
                )
                    .toLowerCase()
                    .includes(query)

                ||

                (
                    vendor.vendorCompanyName || ""
                )
                    .toLowerCase()
                    .includes(query)

                ||

                (
                    vendor.vendorEmail || ""
                )
                    .toLowerCase()
                    .includes(query)

                ||

                (
                    vendor.contactNumber || ""
                )
                    .toLowerCase()
                    .includes(query)

                ||

                (
                    vendor.category || ""
                )
                    .toLowerCase()
                    .includes(query)

        );

    }, [vendors, search]);


    /* =====================================================
       UI
    ===================================================== */

    return (

        <div className="vendor-list-container">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="vendor-header">

                <div>

                    <h2>
                        Vendors
                    </h2>

                    <p>
                        Manage all registered vendors
                    </p>

                </div>


                <Link
                    to="/procurement/vendors/add"
                    className="add-btn"
                >

                    <Plus size={18} />

                    Add Vendor

                </Link>

            </div>


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="search-box">

                <Search
                    size={18}
                />

                <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    placeholder="Search vendor..."
                />

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="vendor-table-container">

                <table className="vendor-table">


                    {/* =================================================
                        TABLE HEADER
                    ================================================= */}

                    <thead>

                        <tr>

                            <th>
                                Vendor
                            </th>

                            <th>
                                Company
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Contact
                            </th>

                            <th>
                                Category
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    {/* =================================================
                        TABLE BODY
                    ================================================= */}

                    <tbody>


                        {/* =================================================
                            LOADING
                        ================================================= */}

                        {loading && (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="vendor-state-cell"
                                >

                                    <div className="vendor-loading">

                                        <span className="loading-spinner" />

                                        <span>
                                            Loading vendors...
                                        </span>

                                    </div>

                                </td>

                            </tr>

                        )}


                        {/* =================================================
                            EMPTY
                        ================================================= */}

                        {!loading &&
                            filteredVendors.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="vendor-state-cell"
                                    >

                                        <div className="vendor-empty">

                                            <div className="empty-icon">

                                                <Search size={22} />

                                            </div>

                                            <strong>
                                                No vendors found
                                            </strong>

                                            <span>
                                                Try changing your search.
                                            </span>

                                        </div>

                                    </td>

                                </tr>

                            )}


                        {/* =================================================
                            VENDOR ROWS
                        ================================================= */}

                        {!loading &&
                            filteredVendors.length > 0 &&
                            filteredVendors.map(
                                (vendor) => (

                                    <tr
                                        key={vendor.id}
                                    >


                                        {/* VENDOR */}

                                        <td>

                                            {vendor.vendorName || "-"}

                                        </td>


                                        {/* COMPANY */}

                                        <td>

                                            {vendor.vendorCompanyName || "-"}

                                        </td>


                                        {/* EMAIL */}

                                        <td>

                                            {vendor.vendorEmail || "-"}

                                        </td>


                                        {/* CONTACT */}

                                        <td>

                                            {vendor.contactNumber || "-"}

                                        </td>


                                        {/* CATEGORY */}

                                        <td>

                                            {vendor.category || "-"}

                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div className="table-action">


                                                {/* VIEW */}

                                                <Link
                                                    to={`/procurement/vendors/${vendor.id}`}
                                                    title="View Vendor"
                                                    aria-label="View Vendor"
                                                >

                                                    <Eye
                                                        size={17}
                                                    />

                                                </Link>


                                                {/* EDIT */}

                                                <Link
                                                    to={`/procurement/vendors/edit/${vendor.id}`}
                                                    title="Edit Vendor"
                                                    aria-label="Edit Vendor"
                                                >

                                                    <Pencil
                                                        size={17}
                                                    />

                                                </Link>


                                                {/* DELETE */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            vendor.id
                                                        )
                                                    }
                                                    title="Delete Vendor"
                                                    aria-label="Delete Vendor"
                                                >

                                                    <Trash2
                                                        size={17}
                                                    />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};


export default VendorList;