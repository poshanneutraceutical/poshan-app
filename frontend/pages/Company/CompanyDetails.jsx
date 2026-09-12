import React, {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    Building2,
    MapPin,
    ClipboardList,
    Tag,
    Hash,
    Pencil,
    Layers
} from "lucide-react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import CompanyService
    from "../../services/CompanyService";

import "./Company.css";


const CompanyDetails = () => {

    const { id } =
        useParams();


    const navigate =
        useNavigate();


    const [
        company,
        setCompany
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    /* =====================================================
       LOAD
    ===================================================== */

    useEffect(() => {

        fetchCompany();

    }, [id]);


    const fetchCompany =
        async () => {

            try {

                setLoading(true);


                const data =
                    await CompanyService
                        .getCompanyById(
                            id
                        );


                setCompany(
                    data
                );

            }

            catch (error) {

                console.error(
                    "Company Details Error:",
                    error
                );


                alert(
                    "Unable to load company details"
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

            <div className="company-loading">

                Loading Company...

            </div>

        );

    }


    /* =====================================================
       NOT FOUND
    ===================================================== */

    if (!company) {

        return (

            <div className="company-loading">

                Company Not Found

            </div>

        );

    }


    return (

        <div className="company-details-container">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="company-details-header">

                <div>

                    <h2>
                        Company Details
                    </h2>

                    <p>
                        Complete company profile and order information.
                    </p>

                </div>


                <div className="company-details-actions">

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate(
                                "/company"
                            )
                        }
                    >

                        <ArrowLeft
                            size={16}
                        />

                        Back

                    </button>


                    <button
                        className="edit-company-btn"
                        onClick={() =>
                            navigate(
                                `/company/edit/${company.companyId}`
                            )
                        }
                    >

                        <Pencil
                            size={15}
                        />

                        Edit

                    </button>

                </div>

            </div>


            {/* =================================================
                COMPANY INFORMATION
            ================================================= */}

            <div className="company-card">

                <h3>
                    Company Information
                </h3>


                <div className="details-grid">

                    <p>

                        <Building2
                            size={15}
                            style={{
                                verticalAlign:
                                    "middle",
                                marginRight:
                                    "6px"
                            }}
                        />

                        <strong>
                            Company Name:
                        </strong>

                        {" "}

                        {
                            company.companyName ||
                            "-"
                        }

                    </p>


                    <p>

                        <MapPin
                            size={15}
                            style={{
                                verticalAlign:
                                    "middle",
                                marginRight:
                                    "6px"
                            }}
                        />

                        <strong>
                            Company Location:
                        </strong>

                        {" "}

                        {
                            company.companyLocation ||
                            "-"
                        }

                    </p>

                </div>

            </div>


            {/* =================================================
                ORDER INFORMATION
            ================================================= */}

            <div className="company-card">

                <h3>
                    Order Information
                </h3>


                <div className="details-grid">

                    <p>

                        <ClipboardList
                            size={15}
                            style={{
                                verticalAlign:
                                    "middle",
                                marginRight:
                                    "6px"
                            }}
                        />

                        <strong>
                            Order Name:
                        </strong>

                        {" "}

                        {
                            company.orderName ||
                            "-"
                        }

                    </p>


                    <p>

                        <Tag
                            size={15}
                            style={{
                                verticalAlign:
                                    "middle",
                                marginRight:
                                    "6px"
                            }}
                        />

                        <strong>
                            Order Type:
                        </strong>

                        {" "}

                        {
                            company.orderType ||
                            "-"
                        }

                    </p>


                    <p>

                        <Hash
                            size={15}
                            style={{
                                verticalAlign:
                                    "middle",
                                marginRight:
                                    "6px"
                            }}
                        />

                        <strong>
                            Quantity:
                        </strong>

                        {" "}

                        {
                            company.quantity ??
                            "-"
                        }

                    </p>

                </div>

            </div>


            {/* =================================================
                CUSTOM FIELDS
            ================================================= */}

            <div className="company-card">

                <h3>
                    Custom Fields
                </h3>


                {
                    company.customFields &&
                    company.customFields.length > 0

                        ? (

                            <div className="company-table-wrapper">

                                <table className="company-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Field Name
                                            </th>

                                            <th>
                                                Field Value
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {
                                            company.customFields.map(
                                                field => (

                                                    <tr
                                                        key={
                                                            field.id
                                                        }
                                                    >

                                                        <td>

                                                            {
                                                                field.fieldname
                                                            }

                                                        </td>


                                                        <td>

                                                            {
                                                                field.fieldvalue ||
                                                                "-"
                                                            }

                                                        </td>

                                                    </tr>

                                                )
                                            )
                                        }

                                    </tbody>

                                </table>

                            </div>

                        )

                        : (

                            <p className="custom-fields-empty">

                                No Custom Fields Available

                            </p>

                        )
                }

            </div>

        </div>

    );

};


export default CompanyDetails;