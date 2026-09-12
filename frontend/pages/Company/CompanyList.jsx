import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Building2,
    Search,
    Plus,
    Pencil,
    Eye,
    Trash2
} from "lucide-react";

import {
    useNavigate
} from "react-router-dom";

import CompanyService
    from "../../services/CompanyService";

import "./Company.css";


const CompanyList = () => {

    const navigate =
        useNavigate();


    const [
        companies,
        setCompanies
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        search,
        setSearch
    ] = useState("");


    /* =====================================================
       LOAD
    ===================================================== */

    useEffect(() => {

        fetchCompanies();

    }, []);


    const fetchCompanies =
        async () => {

            try {

                setLoading(true);


                const data =
                    await CompanyService
                        .getAllCompanies();


                setCompanies(
                    Array.isArray(data)
                        ? data
                        : []
                );

            }

            catch (error) {

                console.error(
                    "Error fetching companies:",
                    error
                );


                alert(
                    "Unable to load companies"
                );

            }

            finally {

                setLoading(false);

            }

        };


    /* =====================================================
       DELETE
    ===================================================== */

    const deleteCompany =
        async id => {

            const confirmDelete =
                window.confirm(
                    "Are you sure you want to delete this company?"
                );


            if (!confirmDelete) {
                return;
            }


            try {

                await CompanyService
                    .deleteCompany(
                        id
                    );


                alert(
                    "Company deleted successfully"
                );


                await fetchCompanies();

            }

            catch (error) {

                console.error(
                    "Delete error:",
                    error
                );


                alert(
                    "Unable to delete company"
                );

            }

        };


    /* =====================================================
       FILTER
    ===================================================== */

    const filteredCompanies =
        useMemo(
            () => {

                const query =
                    search
                        .trim()
                        .toLowerCase();


                if (!query) {
                    return companies;
                }


                return companies.filter(
                    company =>

                        company.companyname
                            ?.toLowerCase()
                            .includes(
                                query
                            )
                );

            },
            [
                companies,
                search
            ]
        );


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <div className="company-loading">

                Loading Companies...

            </div>

        );

    }


    return (

        <div className="company-list-container">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="company-header">

                <div>

                    <h2>
                        Company Management
                    </h2>

                    <p>
                        Manage company profiles, orders and custom information.
                    </p>

                </div>


                <button
                    className="add-company-btn"
                    onClick={() =>
                        navigate(
                            "/company/add"
                        )
                    }
                >

                    <Plus
                        size={17}
                    />

                    Add Company

                </button>

            </div>


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="company-search-wrapper">

                <Search
                    size={17}
                />


                <input
                    type="text"
                    placeholder="Search company..."
                    value={search}
                    onChange={
                        event =>
                            setSearch(
                                event.target.value
                            )
                    }
                />

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="company-table-wrapper">

                <table className="company-table">

                    <thead>

                        <tr>

                            <th>
                                ID
                            </th>

                            <th>
                                Company Name
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            filteredCompanies.length === 0

                                ? (

                                    <tr>

                                        <td
                                            colSpan="3"
                                            className="company-empty-state"
                                        >

                                            No Companies Found

                                        </td>

                                    </tr>

                                )

                                : (

                                    filteredCompanies.map(
                                        company => (

                                            <tr
                                                key={
                                                    company.id
                                                }
                                            >

                                                <td>

                                                    {
                                                        company.id
                                                    }

                                                </td>


                                                <td>

                                                    <div className="company-name-cell">

                                                        {
                                                            company.companyname ||
                                                            "-"
                                                        }

                                                    </div>

                                                </td>


                                                <td>

                                                    <div className="company-actions">


                                                        <button
                                                            className="view-btn"
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/company/${company.id}`
                                                                )
                                                            }
                                                        >

                                                            <Eye
                                                                size={14}
                                                            />

                                                            View

                                                        </button>


                                                        <button
                                                            className="edit-btn"
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/company/edit/${company.id}`
                                                                )
                                                            }
                                                        >

                                                            <Pencil
                                                                size={14}
                                                            />

                                                            Edit

                                                        </button>


                                                        <button
                                                            className="delete-btn"
                                                            type="button"
                                                            onClick={() =>
                                                                deleteCompany(
                                                                    company.id
                                                                )
                                                            }
                                                        >

                                                            <Trash2
                                                                size={14}
                                                            />

                                                            Delete

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};


export default CompanyList;