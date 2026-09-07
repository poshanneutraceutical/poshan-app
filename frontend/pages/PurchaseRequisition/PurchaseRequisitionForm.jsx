import { useEffect, useState } from "react";

import {
    Save,
    Plus,
    Trash2,
    ArrowLeft,
    Package,
    User,
    Building2,
    Flag,
    MessageSquare
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import purchaseRequisitionService
    from "../../services/purchaseRequisitionService";

import vendorService
    from "../../services/vendorService";

import "./PurchaseRequisition.css";


/* =========================================================
   BOX TYPES
========================================================= */

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


/* =========================================================
   EMPTY ITEM
========================================================= */

const emptyItem = {

    boxType: "",

    quantity: 1

};


/* =========================================================
   PURCHASE REQUISITION FORM
========================================================= */

const PurchaseRequisitionForm = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);


    const [loading, setLoading] =
        useState(false);


    const [vendors, setVendors] =
        useState([]);


    const [form, setForm] = useState({

        vendorId: "",

        requestedBy: "",

        department: "",

        priority: "Normal",

        remarks: "",

        items: [
            { ...emptyItem }
        ]

    });


    /* =====================================================
       LOAD DATA
    ===================================================== */

    useEffect(() => {

        loadVendors();

        if (isEdit) {

            loadPurchaseRequisition();

        }

    }, [id]);


    /* =====================================================
       LOAD VENDORS
    ===================================================== */

    const loadVendors = async () => {

        try {

            const data =
                await vendorService.getAll();

            setVendors(
                Array.isArray(data)
                    ? data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Unable to load vendors",
                error
            );

        }

    };


    /* =====================================================
       LOAD PURCHASE REQUISITION
    ===================================================== */

    const loadPurchaseRequisition =
        async () => {

            try {

                setLoading(true);

                const data =
                    await purchaseRequisitionService.getById(
                        id
                    );


                setForm({

                    vendorId:
                        data.vendorId ?? "",

                    requestedBy:
                        data.requestedBy ?? "",

                    department:
                        data.department ?? "",

                    priority:
                        data.priority ?? "Normal",

                    remarks:
                        data.remarks ?? "",

                    items:
                        data.items?.length
                            ? data.items
                            : [
                                { ...emptyItem }
                            ]

                });

            }
            catch (error) {

                console.error(
                    "Unable to load purchase requisition",
                    error
                );

            }
            finally {

                setLoading(false);

            }

        };


    /* =====================================================
       GENERAL FORM CHANGE
    ===================================================== */

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setForm((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    /* =====================================================
       ITEM CHANGE
    ===================================================== */

    const handleItemChange = (
        index,
        field,
        value
    ) => {

        setForm((previous) => {

            const updatedItems =
                [...previous.items];


            updatedItems[index] = {

                ...updatedItems[index],

                [field]:
                    field === "quantity"
                        ? Number(value)
                        : value

            };


            return {

                ...previous,

                items: updatedItems

            };

        });

    };


    /* =====================================================
       ADD ITEM
    ===================================================== */

    const addItem = () => {

        setForm((previous) => ({

            ...previous,

            items: [

                ...previous.items,

                {
                    ...emptyItem
                }

            ]

        }));

    };


    /* =====================================================
       REMOVE ITEM
    ===================================================== */

    const removeItem = (index) => {

        if (
            form.items.length === 1
        ) {

            return;

        }


        setForm((previous) => ({

            ...previous,

            items:
                previous.items.filter(
                    (_, itemIndex) =>
                        itemIndex !== index
                )

        }));

    };


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit =
        async (event) => {

            event.preventDefault();


            try {

                setLoading(true);


                if (isEdit) {

                    await purchaseRequisitionService.update(
                        id,
                        form
                    );

                }
                else {

                    await purchaseRequisitionService.create(
                        form
                    );

                }


                navigate(
                    "/procurement/purchase-requisition"
                );

            }
            catch (error) {

                console.error(
                    "Purchase requisition save failed",
                    error
                );

            }
            finally {

                setLoading(false);

            }

        };


    /* =====================================================
       UI
    ===================================================== */

    return (

        <div className="purchase-requisition-form-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="purchase-form-header">

                <div className="purchase-form-title-row">

                    <div className="purchase-form-title-icon">

                        <Package size={22} />

                    </div>


                    <div>

                        <h1 className="purchase-form-title">

                            {
                                isEdit
                                    ? "Edit Purchase Requisition"
                                    : "Create Purchase Requisition"
                            }

                        </h1>


                        <p className="purchase-form-subtitle">

                            Create and manage purchase requisitions

                        </p>

                    </div>

                </div>


                <Link
                    to="/procurement/purchase-requisition"
                    className="purchase-back-btn"
                >

                    <ArrowLeft size={17} />

                    Back

                </Link>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <form
                onSubmit={handleSubmit}
                className="purchase-requisition-form"
            >


                {/* =================================================
                    BASIC INFORMATION
                ================================================= */}

                <div className="purchase-form-card">

                    <div className="purchase-section-header">

                        <div className="purchase-section-icon">

                            <FileSectionIcon />

                        </div>


                        <div>

                            <h2>
                                Requisition Information
                            </h2>

                            <p>
                                Enter the basic purchase requisition details
                            </p>

                        </div>

                    </div>


                    <div className="purchase-form-grid">


                        {/* VENDOR */}

                        <div className="purchase-field">

                            <label>

                                Vendor

                                <span className="required-mark">
                                    *
                                </span>

                            </label>


                            <div className="purchase-input-wrapper">

                                <Building2
                                    size={17}
                                    className="purchase-input-icon"
                                />


                                <select
                                    name="vendorId"
                                    value={form.vendorId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Vendor
                                    </option>


                                    {vendors.map(
                                        (vendor) => (

                                            <option
                                                key={vendor.id}
                                                value={vendor.id}
                                            >

                                                {
                                                    vendor.vendorCompanyName
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                        </div>


                        {/* REQUESTED BY */}

                        <div className="purchase-field">

                            <label>

                                Requested By

                                <span className="required-mark">
                                    *
                                </span>

                            </label>


                            <div className="purchase-input-wrapper">

                                <User
                                    size={17}
                                    className="purchase-input-icon"
                                />


                                <input
                                    name="requestedBy"
                                    value={form.requestedBy}
                                    onChange={handleChange}
                                    placeholder="Enter requester name"
                                    required
                                />

                            </div>

                        </div>


                        {/* DEPARTMENT */}

                        <div className="purchase-field">

                            <label>

                                Department

                                <span className="required-mark">
                                    *
                                </span>

                            </label>


                            <div className="purchase-input-wrapper">

                                <Building2
                                    size={17}
                                    className="purchase-input-icon"
                                />


                                <input
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                    placeholder="Enter department"
                                    required
                                />

                            </div>

                        </div>


                        {/* PRIORITY */}

                        <div className="purchase-field">

                            <label>
                                Priority
                            </label>


                            <div className="purchase-input-wrapper">

                                <Flag
                                    size={17}
                                    className="purchase-input-icon"
                                />


                                <select
                                    name="priority"
                                    value={form.priority}
                                    onChange={handleChange}
                                >

                                    <option value="Low">
                                        Low
                                    </option>

                                    <option value="Normal">
                                        Normal
                                    </option>

                                    <option value="High">
                                        High
                                    </option>

                                    <option value="Urgent">
                                        Urgent
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    ITEMS
                ================================================= */}

                <div className="purchase-form-card">


                    <div className="purchase-section-header purchase-items-header">

                        <div className="purchase-section-title-group">

                            <div className="purchase-section-icon">

                                <Package size={20} />

                            </div>


                            <div>

                                <h2>
                                    Requested Items
                                </h2>

                                <p>
                                    Add the boxes or packaging materials required
                                </p>

                            </div>

                        </div>


                        <button
                            type="button"
                            onClick={addItem}
                            className="purchase-add-item-btn"
                        >

                            <Plus size={17} />

                            Add Item

                        </button>

                    </div>


                    {/* TABLE HEADER */}

                    <div className="purchase-items-table-header">

                        <div>
                            #
                        </div>

                        <div>
                            Box Type
                        </div>

                        <div>
                            Quantity
                        </div>

                        <div>
                            Action
                        </div>

                    </div>


                    {/* ITEMS */}

                    <div className="purchase-items-list">


                        {form.items.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className="purchase-item-row"
                                >


                                    {/* NUMBER */}

                                    <div className="purchase-item-number">

                                        {index + 1}

                                    </div>


                                    {/* BOX TYPE */}

                                    <div className="purchase-field purchase-item-box">

                                        <label className="mobile-item-label">

                                            Box Type

                                        </label>


                                        <select

                                            value={
                                                BOX_TYPES.includes(
                                                    item.boxType
                                                )
                                                    ? item.boxType
                                                    : item.boxType
                                                        ? "__CUSTOM__"
                                                        : ""
                                            }

                                            onChange={(event) => {

                                                const value =
                                                    event.target.value;


                                                if (
                                                    value === "__CUSTOM__"
                                                ) {

                                                    /*
                                                     * Clear the existing
                                                     * value so the custom
                                                     * input starts empty.
                                                     */

                                                    handleItemChange(
                                                        index,
                                                        "boxType",
                                                        ""
                                                    );

                                                }
                                                else {

                                                    handleItemChange(
                                                        index,
                                                        "boxType",
                                                        value
                                                    );

                                                }

                                            }}

                                            required

                                        >

                                            <option value="">

                                                Select Box Type

                                            </option>


                                            {BOX_TYPES.map(
                                                (boxType) => (

                                                    <option
                                                        key={boxType}
                                                        value={boxType}
                                                    >

                                                        {boxType}

                                                    </option>

                                                )
                                            )}


                                            {/* CUSTOM OPTION */}

                                            <option value="__CUSTOM__">

                                                Other / Custom

                                            </option>

                                        </select>


                                        {/* CUSTOM INPUT */}

                                        {

                                            item.boxType &&
                                            !BOX_TYPES.includes(
                                                item.boxType
                                            ) && (

                                                <input

                                                    type="text"

                                                    value={
                                                        item.boxType
                                                    }

                                                    onChange={(event) =>
                                                        handleItemChange(
                                                            index,
                                                            "boxType",
                                                            event.target.value
                                                        )
                                                    }

                                                    placeholder="Enter custom box type"

                                                    className="purchase-custom-box-input"

                                                    required

                                                />

                                            )

                                        }

                                    </div>


                                    {/* QUANTITY */}

                                    <div className="purchase-field purchase-item-quantity">

                                        <label className="mobile-item-label">

                                            Quantity

                                        </label>


                                        <input

                                            type="number"

                                            min="1"

                                            value={item.quantity}

                                            onChange={(event) =>
                                                handleItemChange(
                                                    index,
                                                    "quantity",
                                                    event.target.value
                                                )
                                            }

                                            required

                                        />

                                    </div>


                                    {/* DELETE */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeItem(index)
                                        }
                                        disabled={
                                            form.items.length === 1
                                        }
                                        className="purchase-remove-item-btn"
                                        title={
                                            form.items.length === 1
                                                ? "At least one item is required"
                                                : "Remove item"
                                        }
                                    >

                                        <Trash2 size={17} />

                                    </button>

                                </div>

                            )
                        )}

                    </div>


                    {/* FOOTER */}

                    <div className="purchase-items-footer">

                        {form.items.length}{" "}

                        {
                            form.items.length === 1
                                ? "item"
                                : "items"
                        }

                    </div>

                </div>


                {/* =================================================
                    REMARKS
                ================================================= */}

                <div className="purchase-form-card">

                    <div className="purchase-section-header">

                        <div className="purchase-section-icon">

                            <MessageSquare size={20} />

                        </div>


                        <div>

                            <h2>
                                Additional Information
                            </h2>

                            <p>
                                Add any notes or special instructions
                            </p>

                        </div>

                    </div>


                    <div className="purchase-field">

                        <label>
                            Remarks
                        </label>


                        <textarea
                            rows={5}
                            name="remarks"
                            value={form.remarks}
                            onChange={handleChange}
                            placeholder="Enter remarks or special instructions..."
                        />

                    </div>

                </div>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="purchase-form-actions">

                    <Link
                        to="/procurement/purchase-requisition"
                        className="purchase-cancel-btn"
                    >

                        Cancel

                    </Link>


                    <button
                        type="submit"
                        disabled={loading}
                        className="purchase-submit-btn"
                    >

                        <Save size={17} />

                        {
                            loading
                                ? "Saving..."
                                : isEdit
                                    ? "Update Purchase Requisition"
                                    : "Create Purchase Requisition"
                        }

                    </button>

                </div>


            </form>

        </div>

    );

};


/* =========================================================
   FILE SECTION ICON
========================================================= */

const FileSectionIcon = () => {

    return (

        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >

            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />

            <polyline points="14 2 14 8 20 8" />

            <line x1="16" y1="13" x2="8" y2="13" />

            <line x1="16" y1="17" x2="8" y2="17" />

            <polyline points="10 9 9 9 8 9" />

        </svg>

    );

};


export default PurchaseRequisitionForm;