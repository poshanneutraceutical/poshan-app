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
    Plus,
    Trash2,
    Save
} from "lucide-react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import CompanyService
    from "../../services/companyService";

import "./Company.css";


const CompanyForm = () => {

    const navigate =
        useNavigate();

    const { id } =
        useParams();

    const isEditMode =
        Boolean(id);


    const [
        loading,
        setLoading
    ] = useState(isEditMode);


    const [
        saving,
        setSaving
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const [
        company,
        setCompany
    ] = useState({

        companyName: "",

        orderName: "",

        orderType: "",

        quantity: "",

        companyLocation: "",

        companyDetailId: null,

        customFields: []

    });


    /* =====================================================
       LOAD COMPANY
    ===================================================== */

    useEffect(() => {

        if (isEditMode) {

            loadCompany();

        }

    }, [
        id,
        isEditMode
    ]);


    const loadCompany =
        async () => {

            try {

                setLoading(true);

                setError("");


                const data =
                    await CompanyService
                        .getCompanyById(
                            id
                        );


                setCompany({

                    companyName:
                        data.companyName ||
                        "",

                    orderName:
                        data.orderName ||
                        "",

                    orderType:
                        data.orderType ||
                        "",

                    quantity:
                        data.quantity ??
                        "",

                    companyLocation:
                        data.companyLocation ||
                        "",

                    companyDetailId:
                        data.companyDetailId ||
                        null,

                    customFields:
                        Array.isArray(
                            data.customFields
                        )

                            ? data.customFields
                                .map(
                                    field => ({

                                        id:
                                            field.id ||
                                            null,

                                        fieldname:
                                            field.fieldname ||
                                            "",

                                        fieldvalue:
                                            field.fieldvalue ||
                                            ""

                                    })
                                )

                            : []

                });

            }

            catch (error) {

                console.error(
                    "Error loading company:",
                    error
                );


                setError(
                    error.response?.data?.message ||
                    "Unable to load company."
                );

            }

            finally {

                setLoading(false);

            }

        };


    /* =====================================================
       COMMON FIELD
    ===================================================== */

    const handleChange =
        event => {

            const {
                name,
                value
            } = event.target;


            setCompany(
                previous => ({

                    ...previous,

                    [name]:
                        value

                })
            );

        };


    /* =====================================================
       CUSTOM FIELD CHANGE
    ===================================================== */

    const handleCustomFieldChange =
        (
            index,
            field,
            value
        ) => {

            setCompany(
                previous => {

                    const updatedFields =
                        [
                            ...previous.customFields
                        ];


                    updatedFields[
                        index
                    ] = {

                        ...updatedFields[
                            index
                        ],

                        [field]:
                            value

                    };


                    return {

                        ...previous,

                        customFields:
                            updatedFields

                    };

                }
            );

        };


    /* =====================================================
       ADD CUSTOM FIELD
    ===================================================== */

    const addCustomField =
        () => {

            setCompany(
                previous => ({

                    ...previous,

                    customFields: [

                        ...previous.customFields,

                        {

                            id: null,

                            fieldname: "",

                            fieldvalue: ""

                        }

                    ]

                })
            );

        };


    /* =====================================================
       REMOVE CUSTOM FIELD
    ===================================================== */

    const removeCustomField =
        index => {

            setCompany(
                previous => ({

                    ...previous,

                    customFields:
                        previous.customFields
                            .filter(
                                (
                                    _,
                                    fieldIndex
                                ) =>
                                    fieldIndex !==
                                    index
                            )

                })
            );

        };


    /* =====================================================
       SAVE
    ===================================================== */

    const handleSubmit =
        async event => {

            event.preventDefault();

            setError("");


            if (saving) {

                return;

            }


            if (
                !company.companyName.trim()
            ) {

                setError(
                    "Company Name is required."
                );

                return;

            }


            try {

                setSaving(true);


                /*
                 * STEP 1
                 * COMPANY
                 */

                let companyId =
                    id;


                const companyData = {

                    companyname:
                        company.companyName.trim()

                };


                if (isEditMode) {

                    await CompanyService
                        .updateCompany(
                            id,
                            companyData
                        );

                }

                else {

                    const createdCompany =
                        await CompanyService
                            .createCompany(
                                companyData
                            );


                    companyId =
                        createdCompany.id;

                }


                /*
                 * STEP 2
                 * COMPANY DETAIL
                 */

                const detailData = {

                    companyid:
                        Number(
                            companyId
                        ),

                    ordername:
                        company.orderName.trim(),

                    ordertype:
                        company.orderType.trim(),

                    quantity:
                        company.quantity === ""

                            ? null

                            : Number(
                                company.quantity
                            ),

                    companylocation:
                        company
                            .companyLocation
                            .trim()

                };


                if (
                    isEditMode &&
                    company.companyDetailId
                ) {

                    await CompanyService
                        .updateCompanyDetail(

                            company.companyDetailId,

                            detailData

                        );

                }

                else {

                    await CompanyService
                        .createCompanyDetail(
                            detailData
                        );

                }


                /*
                 * STEP 3
                 * CUSTOM FIELDS
                 */

                for (
                    const field
                    of company.customFields
                ) {

                    if (
                        !field.fieldname.trim() &&
                        !field.fieldvalue.trim()
                    ) {

                        continue;

                    }


                    const fieldData = {

                        companyid:
                            Number(
                                companyId
                            ),

                        fieldname:
                            field.fieldname.trim(),

                        fieldvalue:
                            field.fieldvalue.trim()

                    };


                    if (
                        field.id
                    ) {

                        await CompanyService
                            .updateCustomField(

                                field.id,

                                fieldData

                            );

                    }

                    else {

                        await CompanyService
                            .createCustomField(
                                fieldData
                            );

                    }

                }


                alert(
                    isEditMode
                        ? "Company updated successfully."
                        : "Company created successfully."
                );


                navigate(
                    `/company/${companyId}`
                );

            }

            catch (error) {

                console.error(
                    "Company save error:",
                    error
                );


                setError(
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Unable to save company."
                );

            }

            finally {

                setSaving(false);

            }

        };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <div className="company-form-container">

                <div className="company-loading">

                    Loading Company...

                </div>

            </div>

        );

    }


    return (

        <div className="company-form-container">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="company-form-page-header">

                <div>

                    <h2>

                        {
                            isEditMode
                                ? "Edit Company"
                                : "Add Company"
                        }

                    </h2>


                    <p>

                        {
                            isEditMode
                                ? "Update company information and custom fields."
                                : "Create a new company and configure its order information."
                        }

                    </p>

                </div>


                <button
                    type="button"
                    className="company-back-btn"
                    onClick={() =>
                        navigate(
                            "/company"
                        )
                    }
                    disabled={saving}
                >

                    <ArrowLeft
                        size={17}
                    />

                    Back

                </button>

            </div>


            {
                error && (

                    <div className="company-error-message">

                        {error}

                    </div>

                )
            }


            <form
                onSubmit={
                    handleSubmit
                }
                className="company-form"
            >


                {/* =================================================
                    COMPANY INFORMATION
                ================================================= */}

                <div className="company-form-section">

                    <h3>
                        Company Information
                    </h3>


                    <p className="company-form-section-description">

                        Basic information used throughout the ERP.

                    </p>


                    <div className="company-form-grid">


                        {/* COMPANY NAME */}

                        <div className="form-group">

                            <label>
                                Company Name
                            </label>


                            <div className="company-input-wrapper">

                                <Building2
                                    size={17}
                                />


                                <input
                                    type="text"
                                    name="companyName"
                                    value={
                                        company.companyName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter company name"
                                    required
                                    disabled={saving}
                                />

                            </div>

                        </div>


                        {/* LOCATION */}

                        <div className="form-group">

                            <label>
                                Company Location
                            </label>


                            <div className="company-input-wrapper">

                                <MapPin
                                    size={17}
                                />


                                <input
                                    type="text"
                                    name="companyLocation"
                                    value={
                                        company.companyLocation
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter company location"
                                    disabled={saving}
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    ORDER INFORMATION
                ================================================= */}

                <div className="company-form-section">

                    <h3>
                        Order Information
                    </h3>


                    <p className="company-form-section-description">

                        Configure the order details associated with this company.

                    </p>


                    <div className="company-form-grid">


                        {/* ORDER NAME */}

                        <div className="form-group">

                            <label>
                                Order Name
                            </label>


                            <div className="company-input-wrapper">

                                <ClipboardList
                                    size={17}
                                />


                                <input
                                    type="text"
                                    name="orderName"
                                    value={
                                        company.orderName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter order name"
                                    disabled={saving}
                                />

                            </div>

                        </div>


                        {/* ORDER TYPE */}

                        <div className="form-group">

                            <label>
                                Order Type
                            </label>


                            <div className="company-input-wrapper">

                                <Tag
                                    size={17}
                                />


                                <input
                                    type="text"
                                    name="orderType"
                                    value={
                                        company.orderType
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter order type"
                                    disabled={saving}
                                />

                            </div>

                        </div>


                        {/* QUANTITY */}

                        <div className="form-group">

                            <label>
                                Quantity
                            </label>


                            <div className="company-input-wrapper">

                                <Hash
                                    size={17}
                                />


                                <input
                                    type="number"
                                    name="quantity"
                                    value={
                                        company.quantity
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter quantity"
                                    min="0"
                                    disabled={saving}
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    CUSTOM FIELDS
                ================================================= */}

                <div className="company-form-section">

                    <div className="custom-fields-header">

                        <div>

                            <h3>
                                Custom Fields
                            </h3>

                            <p className="company-form-section-description">
                                Add additional information specific to this company.
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={
                                addCustomField
                            }
                            disabled={
                                saving
                            }
                        >

                            <Plus
                                size={15}
                            />

                            Add Field

                        </button>

                    </div>


                    {
                        company.customFields.length === 0
                        ? (

                            <p className="custom-fields-empty">

                                No custom fields added yet.

                            </p>

                        )
                        : (

                            company.customFields.map(
                                (
                                    field,
                                    index
                                ) => (

                                    <div
                                        className="custom-field-row"
                                        key={
                                            field.id ||
                                            `new-${index}`
                                        }
                                    >


                                        <div className="form-group">

                                            <label>
                                                Field Name
                                            </label>


                                            <input
                                                type="text"
                                                value={
                                                    field.fieldname
                                                }
                                                onChange={
                                                    event =>
                                                        handleCustomFieldChange(
                                                            index,
                                                            "fieldname",
                                                            event.target.value
                                                        )
                                                }
                                                placeholder="e.g. GST Number"
                                                disabled={saving}
                                            />

                                        </div>


                                        <div className="form-group">

                                            <label>
                                                Field Value
                                            </label>


                                            <input
                                                type="text"
                                                value={
                                                    field.fieldvalue
                                                }
                                                onChange={
                                                    event =>
                                                        handleCustomFieldChange(
                                                            index,
                                                            "fieldvalue",
                                                            event.target.value
                                                        )
                                                }
                                                placeholder="Enter value"
                                                disabled={saving}
                                            />

                                        </div>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeCustomField(
                                                    index
                                                )
                                            }
                                            disabled={saving}
                                        >

                                            <Trash2
                                                size={15}
                                            />

                                            Remove

                                        </button>

                                    </div>

                                )
                            )
                        )
                    }

                </div>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() =>
                            navigate(
                                "/company"
                            )
                        }
                        disabled={saving}
                    >

                        Cancel

                    </button>


                    <button
                        type="submit"
                        className="save-btn"
                        disabled={saving}
                    >

                        <Save
                            size={17}
                        />


                        {
                            saving

                                ? "Saving..."

                                : isEditMode

                                    ? "Update Company"

                                    : "Save Company"
                        }

                    </button>

                </div>

            </form>

        </div>

    );

};


export default CompanyForm;