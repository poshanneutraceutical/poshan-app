import React, { useEffect, useState } from "react";

import {
    ArrowLeft,
    Save,
    Package,
    IndianRupee,
    Hash,
    CalendarDays,
    Building2,
    Box,
    ShieldCheck,
    FileText
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import MRPService from "../../services/MRPService";

import "./MRP.css";


/* =========================================================
   DROPDOWN OPTIONS
========================================================= */

const SCOPE_TYPES = [
    "32g",
        "black" ,
        "10g ",
        "15g"
];


const BOX_TYPES = [
    "BOX_2KG",
    "PET_JAR_5_LBS_R",
    "PET_JAR_5_LBS_BS",
    "PET_JAR_2_LBS_J",
    "PET_1100ML_JAR",
    "PET_88MM_850ML_JAR",
    "PET_JAR_5_LBS_M",
    "PET_JAR_2_LBS_B",
    "PLASTIC_535ML_L_CART_BOTTLE",
    "I_SEAL_372MM_HDPE_ONE",
    "PLASTIC_325ML_CYLINDRICAL_JAR_WO_CAP",
    "PLASTIC_MET_60MM_GOLDEN_CAP",
    "PET_275CC_R_TAB_JAR_WITH_PEAL_CAP",
    "I_SEAL_877MM_PET_ONE",
    "PLASTIC_55_KGS_JAR_300",
    "I_SEAL_118MM_PET_ONE",
    "I_SEAL_118MM_HDPE_ONE",
    "I_SEAL_436MM_PET_ONE",
    "PET_46_240ML_SQ_TAB_JAR_H_LOCK",
    "PLASTIC_6_KG_JAR",
    "PLASTIC_275_KG_JAR",
    "PLASTIC_12_KG_JAR_SQ_520",
    "PLASTIC_6_KG_JAR_WO_CAP",
    "PLASTIC_275_KG_JAR_WO_CAP",
    "PLASTIC_88MM_975ML_JAR_WO_CAP",
    "PLASTIC_88MM_700ML_HDPE_JAR_WO_CAP",
    "PLASTIC_MET_120MM_GOLDEN_CAP",
    "PLASTIC_MET_88MM_GOLDEN_CAP",
    "PLASTIC_88MM_975ML_JAR"
];


const NECK_SEAL_TYPES = [
    "transparent",
    "printed"


];


/* =========================================================
   INITIAL FORM
========================================================= */

const initialForm = {

    mrp: "",

    batchNumber: "",

    mfgDate: "",

    expDate: "",

    companyName: "",

    scopeType: "",

    boxType: "",

    neckSealType: "",

    note: ""

};


/* =========================================================
   HELPER
========================================================= */

const formatOption = (value) => {

    if (!value) {
        return "";
    }

    return value
        .replaceAll("_", " ")
        .replace(/\s+/g, " ")
        .trim();

};


/* =========================================================
   MRP FORM
========================================================= */

const MRPForm = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);


    /* =====================================================
       FORM STATE
    ===================================================== */

    const [form, setForm] =
        useState(initialForm);


    /* =====================================================
       LOADING
    ===================================================== */

    const [loading, setLoading] =
        useState(false);


    const [pageLoading, setPageLoading] =
        useState(isEdit);


    /* =====================================================
       ERROR
    ===================================================== */

    const [error, setError] =
        useState("");


    /* =====================================================
       CUSTOM VALUE STATES
    ===================================================== */

    const [isCustomScopeType, setIsCustomScopeType] =
        useState(false);


    const [isCustomBoxType, setIsCustomBoxType] =
        useState(false);


    const [isCustomNeckSealType, setIsCustomNeckSealType] =
        useState(false);


    /* =====================================================
       LOAD EXISTING MRP
    ===================================================== */

    useEffect(() => {

        if (isEdit) {

            loadMRP();

        }

    }, [id]);


    const loadMRP = async () => {

        try {

            setPageLoading(true);

            setError("");


            const data =
                await MRPService.getMRPById(id);


            if (!data) {

                setError(
                    "MRP details could not be found."
                );

                return;

            }


            /* =================================================
               SET FORM
            ================================================= */

            setForm({

                mrp:
                    data.mrp || "",

                batchNumber:
                    data.batchNumber || "",

                mfgDate:
                    data.mfgDate || "",

                expDate:
                    data.expDate || "",

                companyName:
                    data.companyName || "",

                scopeType:
                    data.scopeType || "",

                boxType:
                    data.boxType || "",

                neckSealType:
                    data.neckSealType || "",

                note:
                    data.note || ""

            });


            /* =================================================
               DETECT CUSTOM SCOPE TYPE
            ================================================= */

            setIsCustomScopeType(

                Boolean(
                    data.scopeType &&
                    !SCOPE_TYPES.includes(
                        data.scopeType
                    )
                )

            );


            /* =================================================
               DETECT CUSTOM BOX TYPE
            ================================================= */

            setIsCustomBoxType(

                Boolean(
                    data.boxType &&
                    !BOX_TYPES.includes(
                        data.boxType
                    )
                )

            );


            /* =================================================
               DETECT CUSTOM NECK SEAL TYPE
            ================================================= */

            setIsCustomNeckSealType(

                Boolean(
                    data.neckSealType &&
                    !NECK_SEAL_TYPES.includes(
                        data.neckSealType
                    )
                )

            );

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

            setPageLoading(false);

        }

    };


    /* =========================================================
       NORMAL INPUT CHANGE
    ========================================================= */

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setForm(previous => ({

            ...previous,

            [name]: value

        }));

    };


    /* =========================================================
       SCOPE TYPE CHANGE
    ========================================================= */

    const handleScopeTypeChange = (e) => {

        const value =
            e.target.value;


        if (value === "__CUSTOM__") {

            setIsCustomScopeType(true);

            setForm(previous => ({

                ...previous,

                scopeType: ""

            }));

            return;

        }


        setIsCustomScopeType(false);


        setForm(previous => ({

            ...previous,

            scopeType: value

        }));

    };


    /* =========================================================
       BOX TYPE CHANGE
    ========================================================= */

    const handleBoxTypeChange = (e) => {

        const value =
            e.target.value;


        if (value === "__CUSTOM__") {

            setIsCustomBoxType(true);

            setForm(previous => ({

                ...previous,

                boxType: ""

            }));

            return;

        }


        setIsCustomBoxType(false);


        setForm(previous => ({

            ...previous,

            boxType: value

        }));

    };


    /* =========================================================
       NECK SEAL TYPE CHANGE
    ========================================================= */

    const handleNeckSealTypeChange = (e) => {

        const value =
            e.target.value;


        if (value === "__CUSTOM__") {

            setIsCustomNeckSealType(true);

            setForm(previous => ({

                ...previous,

                neckSealType: ""

            }));

            return;

        }


        setIsCustomNeckSealType(false);


        setForm(previous => ({

            ...previous,

            neckSealType: value

        }));

    };


    /* =========================================================
       SUBMIT
    ========================================================= */

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (loading) {

            return;

        }


        setError("");


        /* =====================================================
           VALIDATION
        ===================================================== */

        if (!form.mrp.trim()) {

            setError(
                "MRP is required."
            );

            return;

        }


        if (!form.batchNumber.trim()) {

            setError(
                "Batch Number is required."
            );

            return;

        }


        if (!form.companyName.trim()) {

            setError(
                "Company Name is required."
            );

            return;

        }


        if (!form.scopeType.trim()) {

            setError(
                "Please select or enter Scope Type."
            );

            return;

        }


        if (!form.boxType.trim()) {

            setError(
                "Please select or enter Box Type."
            );

            return;

        }


        if (!form.neckSealType.trim()) {

            setError(
                "Please select or enter Neck Seal Type."
            );

            return;

        }


        try {

            setLoading(true);


            /* =================================================
               FINAL API DATA
            ================================================= */

            const mrpData = {

                mrp:
                    form.mrp.trim(),

                batchNumber:
                    form.batchNumber.trim(),

                mfgDate:
                    form.mfgDate,

                expDate:
                    form.expDate,

                companyName:
                    form.companyName.trim(),

                scopeType:
                    form.scopeType.trim(),

                boxType:
                    form.boxType.trim(),

                neckSealType:
                    form.neckSealType.trim(),

                note:
                    form.note.trim()

            };


            /* =================================================
               CREATE / UPDATE
            ================================================= */

            if (isEdit) {

                await MRPService.updateMRP(
                    id,
                    mrpData
                );

            }
            else {

                await MRPService.createMRP(
                    mrpData
                );

            }


            /* =================================================
               SUCCESS
            ================================================= */

            navigate("/mrp");

        }
        catch (error) {

            console.error(
                "MRP save failed:",
                error
            );


            setError(

                error.response?.data?.message ||
                error.response?.data ||
                error.message ||
                "Unable to save MRP details."

            );

        }
        finally {

            setLoading(false);

        }

    };


    /* =========================================================
       PAGE LOADING
    ========================================================= */

    if (pageLoading) {

        return (

            <div className="mrp-module">

                <div className="mrp-loading">

                    <div className="mrp-loading-spinner" />

                    <p>
                        Loading MRP details...
                    </p>

                </div>

            </div>

        );

    }


    /* =========================================================
       UI
    ========================================================= */

    return (

        <div className="mrp-module">

            <div className="mrp-form-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mrp-form-header">

                    <div className="mrp-form-title-row">

                        <div className="mrp-form-title-icon">

                            <Package size={23} />

                        </div>


                        <div>

                            <h1 className="mrp-form-title">

                                {isEdit
                                    ? "Edit MRP Details"
                                    : "Create MRP Details"
                                }

                            </h1>


                            <p className="mrp-form-subtitle">

                                {isEdit
                                    ? "Update product and batch master information"
                                    : "Create product, batch and MRP master information"
                                }

                            </p>

                        </div>

                    </div>


                    <Link
                        to="/mrp"
                        className="mrp-back-btn"
                    >

                        <ArrowLeft size={17} />

                        Back to MRP

                    </Link>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="mrp-error-message">

                        <span className="mrp-error-icon">
                            !
                        </span>

                        <span>
                            {error}
                        </span>

                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                    className="mrp-form"
                >


                    {/* =================================================
                        PRODUCT INFORMATION
                    ================================================= */}

                    <div className="mrp-form-card">

                        <div className="mrp-section-header">

                            <div className="mrp-section-icon">

                                <Package size={20} />

                            </div>


                            <div>

                                <h2>
                                    Product Information
                                </h2>

                                <p>
                                    Enter the product and MRP details
                                </p>

                            </div>

                        </div>


                        <div className="mrp-form-grid">


                            {/* =================================================
                                MRP
                            ================================================= */}

                            <div className="mrp-field">

                                <label htmlFor="mrp">

                                    MRP

                                    <span className="mrp-required">
                                        *
                                    </span>

                                </label>


                                <div className="mrp-input-wrapper">

                                    <IndianRupee
                                        size={17}
                                        className="mrp-input-icon"
                                    />


                                    <input
                                        id="mrp"
                                        type="text"
                                        name="mrp"
                                        value={form.mrp}
                                        onChange={handleChange}
                                        placeholder="Enter MRP"
                                        required
                                        disabled={loading}
                                    />

                                </div>

                            </div>


                            {/* =================================================
                                COMPANY NAME
                            ================================================= */}

                            <div className="mrp-field">

                                <label htmlFor="companyName">

                                    Company Name

                                    <span className="mrp-required">
                                        *
                                    </span>

                                </label>


                                <div className="mrp-input-wrapper">

                                    <Building2
                                        size={17}
                                        className="mrp-input-icon"
                                    />


                                    <input
                                        id="companyName"
                                        type="text"
                                        name="companyName"
                                        value={form.companyName}
                                        onChange={handleChange}
                                        placeholder="Enter company name"
                                        required
                                        disabled={loading}
                                    />

                                </div>

                            </div>


                            {/* =================================================
                                BATCH NUMBER
                            ================================================= */}

                            <div className="mrp-field">

                                <label htmlFor="batchNumber">

                                    Batch Number

                                    <span className="mrp-required">
                                        *
                                    </span>

                                </label>


                                <div className="mrp-input-wrapper">

                                    <Hash
                                        size={17}
                                        className="mrp-input-icon"
                                    />


                                    <input
                                        id="batchNumber"
                                        type="text"
                                        name="batchNumber"
                                        value={form.batchNumber}
                                        onChange={handleChange}
                                        placeholder="Enter batch number"
                                        required
                                        disabled={loading}
                                    />

                                </div>

                            </div>


                            {/* =================================================
                                SCOPE TYPE
                            ================================================= */}

                            <div className="mrp-field">

                                <label htmlFor="scopeType">

                                    Scope Type

                                    <span className="mrp-required">
                                        *
                                    </span>

                                </label>


                                <div className="mrp-input-wrapper">

                                    <ShieldCheck
                                        size={17}
                                        className="mrp-input-icon"
                                    />


                                    <select
                                        id="scopeType"
                                        value={
                                            isCustomScopeType
                                                ? "__CUSTOM__"
                                                : form.scopeType
                                        }
                                        onChange={
                                            handleScopeTypeChange
                                        }
                                        disabled={loading}
                                        required={!isCustomScopeType}
                                    >

                                        <option value="">
                                            Select Scope Type
                                        </option>


                                        {SCOPE_TYPES.map(
                                            type => (

                                                <option
                                                    key={type}
                                                    value={type}
                                                >

                                                    {formatOption(type)}

                                                </option>

                                            )
                                        )}


                                        <option value="__CUSTOM__">

                                            Other / Custom

                                        </option>

                                    </select>

                                </div>


                                {isCustomScopeType && (

                                    <input
                                        type="text"
                                        className="mrp-custom-input"
                                        value={form.scopeType}
                                        onChange={(e) =>
                                            setForm(previous => ({

                                                ...previous,

                                                scopeType:
                                                    e.target.value

                                            }))
                                        }
                                        placeholder="Enter custom scope type"
                                        disabled={loading}
                                        required
                                    />

                                )}

                            </div>


                            {/* =================================================
                                BOX TYPE
                            ================================================= */}

                            <div className="mrp-field">

                                <label htmlFor="boxType">

                                    Box Type

                                    <span className="mrp-required">
                                        *
                                    </span>

                                </label>


                                <div className="mrp-input-wrapper">

                                    <Box
                                        size={17}
                                        className="mrp-input-icon"
                                    />


                                    <select
                                        id="boxType"
                                        value={
                                            isCustomBoxType
                                                ? "__CUSTOM__"
                                                : form.boxType
                                        }
                                        onChange={
                                            handleBoxTypeChange
                                        }
                                        disabled={loading}
                                        required={!isCustomBoxType}
                                    >

                                        <option value="">
                                            Select Box Type
                                        </option>


                                        {BOX_TYPES.map(
                                            type => (

                                                <option
                                                    key={type}
                                                    value={type}
                                                >

                                                    {formatOption(type)}

                                                </option>

                                            )
                                        )}


                                        <option value="__CUSTOM__">

                                            Other / Custom

                                        </option>

                                    </select>

                                </div>


                                {isCustomBoxType && (

                                    <input
                                        type="text"
                                        className="mrp-custom-input"
                                        value={form.boxType}
                                        onChange={(e) =>
                                            setForm(previous => ({

                                                ...previous,

                                                boxType:
                                                    e.target.value

                                            }))
                                        }
                                        placeholder="Enter custom box type"
                                        disabled={loading}
                                        required
                                    />

                                )}

                            </div>


                            {/* =================================================
                                NECK SEAL TYPE
                            ================================================= */}

                            <div className="mrp-field">

                                <label htmlFor="neckSealType">

                                    Neck Seal Type

                                    <span className="mrp-required">
                                        *
                                    </span>

                                </label>


                                <div className="mrp-input-wrapper">

                                    <ShieldCheck
                                        size={17}
                                        className="mrp-input-icon"
                                    />


                                    <select
                                        id="neckSealType"
                                        value={
                                            isCustomNeckSealType
                                                ? "__CUSTOM__"
                                                : form.neckSealType
                                        }
                                        onChange={
                                            handleNeckSealTypeChange
                                        }
                                        disabled={loading}
                                        required={!isCustomNeckSealType}
                                    >

                                        <option value="">
                                            Select Neck Seal Type
                                        </option>


                                        {NECK_SEAL_TYPES.map(
                                            type => (

                                                <option
                                                    key={type}
                                                    value={type}
                                                >

                                                    {formatOption(type)}

                                                </option>

                                            )
                                        )}


                                        <option value="__CUSTOM__">

                                            Other / Custom

                                        </option>

                                    </select>

                                </div>


                                {isCustomNeckSealType && (

                                    <input
                                        type="text"
                                        className="mrp-custom-input"
                                        value={
                                            form.neckSealType
                                        }
                                        onChange={(e) =>
                                            setForm(previous => ({

                                                ...previous,

                                                neckSealType:
                                                    e.target.value

                                            }))
                                        }
                                        placeholder="Enter custom neck seal type"
                                        disabled={loading}
                                        required
                                    />

                                )}

                            </div>


                        </div>

                    </div>


                    {/* =================================================
                        DATES
                    ================================================= */}

                    <div className="mrp-form-card">

                        <div className="mrp-section-header">

                            <div className="mrp-section-icon">

                                <CalendarDays size={20} />

                            </div>


                            <div>

                                <h2>
                                    Manufacturing & Expiry
                                </h2>

                                <p>
                                    Enter product manufacturing and expiry dates
                                </p>

                            </div>

                        </div>


                        <div className="mrp-form-grid">


                            {/* =================================================
                                MANUFACTURING DATE
                            ================================================= */}

                            <div className="mrp-field">

                                <label htmlFor="mfgDate">

                                    Manufacturing Date

                                </label>


                                <div className="mrp-input-wrapper">

                                    <CalendarDays
                                        size={17}
                                        className="mrp-input-icon"
                                    />


                                    <input
                                        id="mfgDate"
                                        type="date"
                                        name="mfgDate"
                                        value={form.mfgDate}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />

                                </div>

                            </div>


                            {/* =================================================
                                EXPIRY DATE
                            ================================================= */}

                            <div className="mrp-field">

                                <label htmlFor="expDate">

                                    Expiry Date

                                </label>


                                <div className="mrp-input-wrapper">

                                    <CalendarDays
                                        size={17}
                                        className="mrp-input-icon"
                                    />


                                    <input
                                        id="expDate"
                                        type="date"
                                        name="expDate"
                                        value={form.expDate}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />

                                </div>

                            </div>


                        </div>

                    </div>


                    {/* =================================================
                        ADDITIONAL INFORMATION
                    ================================================= */}

                    <div className="mrp-form-card">

                        <div className="mrp-section-header">

                            <div className="mrp-section-icon">

                                <FileText size={20} />

                            </div>


                            <div>

                                <h2>
                                    Additional Information
                                </h2>

                                <p>
                                    Add notes or special instructions
                                </p>

                            </div>

                        </div>


                        <div className="mrp-field">

                            <label htmlFor="note">

                                Notes

                            </label>


                            <textarea
                                id="note"
                                name="note"
                                value={form.note}
                                onChange={handleChange}
                                placeholder="Enter notes or additional information..."
                                rows="5"
                                disabled={loading}
                            />

                        </div>

                    </div>


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="mrp-form-actions">

                        <Link
                            to="/mrp"
                            className="mrp-cancel-btn"
                        >

                            <ArrowLeft size={17} />

                            Cancel

                        </Link>


                        <button
                            type="submit"
                            className="mrp-save-btn"
                            disabled={loading}
                        >

                            <Save size={17} />

                            {loading
                                ? "Saving..."
                                : isEdit
                                    ? "Update MRP"
                                    : "Save MRP"
                            }

                        </button>

                    </div>


                </form>

            </div>

        </div>

    );

};


export default MRPForm;