import React, { useEffect, useState } from "react";

import {
    ArrowLeft,
    Plus,
    Trash2,
    Save
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import ReceivingMaterialService
    from "../../services/ReceivingMaterialService";


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

    materialQuantity: ""

};


/* =========================================================
   INITIAL FORM
========================================================= */

const initialForm = {

    supplierName: "",

    receiverName: "",

    billNumber: "",

    materialPhotos: [],

    receivedDate: "",

    remarks: "",

    receivingMaterialItems: []

};


/* =========================================================
   FORMAT BOX TYPE
========================================================= */

const formatBoxType = (value) => {

    if (!value) {
        return "";
    }

    return value
        .replaceAll("_", " ")
        .replace(/\s+/g, " ")
        .trim();

};


/* =========================================================
   RECEIVING FORM
========================================================= */

const ReceivingForm = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);


    /* =====================================================
       STATE
    ===================================================== */

    const [loading, setLoading] =
        useState(false);


    const [form, setForm] =
        useState(initialForm);


    const [selectedImages, setSelectedImages] =
        useState([]);


    /*
     * Stores which item indexes are using
     * Other / Custom.
     *
     * Example:
     *
     * {
     *     0: true,
     *     2: true
     * }
     *
     * means item 0 and item 2 are custom.
     */

    const [customBoxTypes, setCustomBoxTypes] =
        useState({});


    /* =====================================================
       LOAD EXISTING RECEIVING
    ===================================================== */

    useEffect(() => {

        if (isEdit) {

            loadReceiving();

        }

    }, [id]);


    const loadReceiving = async () => {

        try {

            setLoading(true);


            const data =
                await ReceivingMaterialService
                    .getMaterialById(id);


            const items =
                Array.isArray(
                    data.receivingMaterialItems
                )
                    ? data.receivingMaterialItems
                    : [];


            /*
             * Detect existing custom Box Types.
             *
             * If the database contains a Box Type
             * which is not inside BOX_TYPES,
             * mark that item as custom.
             */

            const customItems = {};


            items.forEach((item, index) => {

                if (
                    item.boxType &&
                    !BOX_TYPES.includes(item.boxType)
                ) {

                    customItems[index] = true;

                }

            });


            setCustomBoxTypes(customItems);


            setForm({

                supplierName:
                    data.supplierName || "",

                receiverName:
                    data.receiverName || "",

                billNumber:
                    data.billNumber || "",

                materialPhotos:
                    data.materialPhotos || [],

                receivedDate:
                    data.receivedDate
                        ?
                        data.receivedDate.substring(0, 16)
                        :
                        "",

                remarks:
                    data.remarks || "",

                receivingMaterialItems:
                    items

            });

        }

        catch (error) {

            console.error(
                "Failed to load receiving material",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };


    /* =====================================================
       NORMAL FORM CHANGE
    ===================================================== */

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setForm(prev => ({

            ...prev,

            [name]: value

        }));

    };


    /* =====================================================
       IMAGE CHANGE
    ===================================================== */

    const handleImageChange = (e) => {

        const files =
            Array.from(e.target.files || []);


        setSelectedImages(files);

    };


    /* =====================================================
       ADD ITEM
    ===================================================== */

    const addItem = () => {

        setForm(prev => ({

            ...prev,

            receivingMaterialItems: [

                ...prev.receivingMaterialItems,

                {
                    ...emptyItem
                }

            ]

        }));

    };


    /* =====================================================
       UPDATE ITEM
    ===================================================== */

    const updateItem = (
        index,
        key,
        value
    ) => {

        const updated = [
            ...form.receivingMaterialItems
        ];


        updated[index] = {

            ...updated[index],

            [key]:
                key === "materialQuantity"
                    ? Number(value)
                    : value

        };


        setForm(prev => ({

            ...prev,

            receivingMaterialItems:
                updated

        }));

    };


    /* =====================================================
       BOX TYPE CHANGE
    ===================================================== */

    const handleBoxTypeChange = (
        index,
        value
    ) => {

        /*
         * User selected Other / Custom.
         */

        if (value === "__CUSTOM__") {

            setCustomBoxTypes(prev => ({

                ...prev,

                [index]: true

            }));


            /*
             * Clear the current value so
             * user can enter a custom value.
             */

            updateItem(
                index,
                "boxType",
                ""
            );

            return;

        }


        /*
         * User selected a predefined Box Type.
         */

        setCustomBoxTypes(prev => ({

            ...prev,

            [index]: false

        }));


        updateItem(
            index,
            "boxType",
            value
        );

    };


    /* =====================================================
       CUSTOM BOX TYPE CHANGE
    ===================================================== */

    const handleCustomBoxTypeChange = (
        index,
        value
    ) => {

        updateItem(
            index,
            "boxType",
            value
        );

    };


    /* =====================================================
       REMOVE ITEM
    ===================================================== */

    const removeItem = (index) => {

        const updated =
            form.receivingMaterialItems.filter(
                (_, i) => i !== index
            );


        setForm(prev => ({

            ...prev,

            receivingMaterialItems:
                updated

        }));


        /*
         * Rebuild custom states after
         * removing an item so indexes
         * stay aligned.
         */

        setCustomBoxTypes(prev => {

            const updatedCustom = {};


            Object.keys(prev).forEach(
                key => {

                    const oldIndex =
                        Number(key);


                    if (oldIndex < index) {

                        updatedCustom[oldIndex] =
                            prev[oldIndex];

                    }

                    else if (oldIndex > index) {

                        updatedCustom[
                            oldIndex - 1
                        ] =
                            prev[oldIndex];

                    }

                }
            );


            return updatedCustom;

        });

    };


    /* =====================================================
       SUBMIT FORM
    ===================================================== */

    const submitForm = async (e) => {

        e.preventDefault();


        if (loading) {
            return;
        }


        /*
         * Validate items before submitting.
         */

        if (
            form.receivingMaterialItems.length === 0
        ) {

            alert(
                "Please add at least one receiving material item."
            );

            return;

        }


        /*
         * Make sure every item has
         * a Box Type and quantity.
         */

        for (
            let index = 0;
            index <
            form.receivingMaterialItems.length;
            index++
        ) {

            const item =
                form.receivingMaterialItems[index];


            if (
                !item.boxType ||
                !item.boxType.trim()
            ) {

                alert(
                    `Please select or enter Box Type for item ${index + 1}.`
                );

                return;

            }


            if (
                item.materialQuantity === "" ||
                item.materialQuantity === null ||
                item.materialQuantity === undefined ||
                Number(item.materialQuantity) <= 0
            ) {

                alert(
                    `Please enter a valid quantity for item ${index + 1}.`
                );

                return;

            }

        }


        try {

            setLoading(true);


            /*
             * Prepare payload.
             *
             * Custom Box Types are already stored
             * inside item.boxType, so the backend
             * receives the actual value typed by user.
             */

            const payload = {

                supplierName:
                    form.supplierName,

                receiverName:
                    form.receiverName,

                billNumber:
                    form.billNumber,

                receivedDate:
                    form.receivedDate,

                remarks:
                    form.remarks,

                materialPhotos:
                    [],

                receivingMaterialItems:
                    form.receivingMaterialItems.map(
                        item => ({

                            ...item,

                            boxType:
                                item.boxType
                                    .trim(),

                            materialQuantity:
                                Number(
                                    item.materialQuantity
                                )

                        })
                    )

            };


            /* =================================================
               FORM DATA
            ================================================= */

            const formData =
                new FormData();


            formData.append(

                "data",

                new Blob(

                    [
                        JSON.stringify(payload)
                    ],

                    {
                        type:
                            "application/json"
                    }

                )

            );


            /*
             * Add selected images.
             */

            selectedImages.forEach(file => {

                formData.append(
                    "images",
                    file
                );

            });


            /* =================================================
               UPDATE
            ================================================= */

            if (isEdit) {

                await ReceivingMaterialService
                    .updateMaterial(
                        id,
                        formData
                    );


                alert(
                    "Receiving Material Updated Successfully"
                );

            }


            /* =================================================
               CREATE
            ================================================= */

            else {

                await ReceivingMaterialService
                    .createMaterial(
                        formData
                    );


                alert(
                    "Receiving Material Created Successfully"
                );

            }


            navigate(
                "/procurement/receiving-material"
            );

        }

        catch (error) {

            console.error(
                "Save Failed",
                error
            );


            alert(
                error.response?.data?.message ||
                "Unable to save receiving material"
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

        <div className="receiving-form-container">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="receiving-form-header">

                <h2>

                    {
                        isEdit
                            ?
                            "Edit Receiving Material"
                            :
                            "Create Receiving Material"
                    }

                </h2>


                <Link
                    to="/procurement/receiving-material"
                    className="back-btn"
                >

                    <ArrowLeft size={18} />

                    Back

                </Link>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <form
                onSubmit={submitForm}
                className="receiving-form"
            >


                {/* =================================================
                    SUPPLIER
                ================================================= */}

                <div className="form-group">

                    <label>
                        Supplier Name
                    </label>


                    <input
                        type="text"
                        name="supplierName"
                        value={
                            form.supplierName
                        }
                        onChange={
                            handleChange
                        }
                        required
                        disabled={loading}
                    />

                </div>


                {/* =================================================
                    RECEIVER
                ================================================= */}

                <div className="form-group">

                    <label>
                        Receiver Name
                    </label>


                    <input
                        type="text"
                        name="receiverName"
                        value={
                            form.receiverName
                        }
                        onChange={
                            handleChange
                        }
                        required
                        disabled={loading}
                    />

                </div>


                {/* =================================================
                    BILL NUMBER
                ================================================= */}

                <div className="form-group">

                    <label>
                        Bill Number
                    </label>


                    <input
                        type="text"
                        name="billNumber"
                        value={
                            form.billNumber
                        }
                        onChange={
                            handleChange
                        }
                        disabled={loading}
                    />

                </div>


                {/* =================================================
                    IMAGES
                ================================================= */}

                <div className="form-group">

                    <label>
                        Upload Bill / Material Images
                    </label>


                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        multiple
                        onChange={
                            handleImageChange
                        }
                        disabled={loading}
                    />


                    {
                        selectedImages.length > 0 && (

                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "12px",
                                    marginTop: "15px"
                                }}
                            >

                                {
                                    selectedImages.map(
                                        (
                                            file,
                                            index
                                        ) => (

                                            <div
                                                key={index}
                                                style={{
                                                    width: "130px"
                                                }}
                                            >

                                                <img
                                                    src={
                                                        URL.createObjectURL(
                                                            file
                                                        )
                                                    }
                                                    alt={
                                                        file.name
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        height: "120px",
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                        border: "1px solid #ddd"
                                                    }}
                                                />


                                                <div
                                                    style={{
                                                        fontSize: "12px",
                                                        marginTop: "5px",
                                                        wordBreak: "break-word",
                                                        textAlign: "center"
                                                    }}
                                                >

                                                    {
                                                        file.name
                                                    }

                                                </div>

                                            </div>

                                        )
                                    )
                                }

                            </div>

                        )
                    }

                </div>


                {/* =================================================
                    RECEIVED DATE
                ================================================= */}

                <div className="form-group">

                    <label>
                        Received Date
                    </label>


                    <input
                        type="datetime-local"
                        name="receivedDate"
                        value={
                            form.receivedDate
                        }
                        onChange={
                            handleChange
                        }
                        required
                        disabled={loading}
                    />

                </div>


                {/* =================================================
                    REMARKS
                ================================================= */}

                <div className="form-group">

                    <label>
                        Remarks
                    </label>


                    <textarea
                        name="remarks"
                        value={
                            form.remarks
                        }
                        onChange={
                            handleChange
                        }
                        rows="3"
                        disabled={loading}
                    />

                </div>


                <hr />


                {/* =================================================
                    ITEMS HEADER
                ================================================= */}

                <div className="items-header">

                    <h3>
                        Receiving Material Items
                    </h3>


                    <button
                        type="button"
                        className="add-btn"
                        onClick={addItem}
                        disabled={loading}
                    >

                        <Plus size={18} />

                        Add Item

                    </button>

                </div>


                {/* =================================================
                    ITEMS
                ================================================= */}

                {

                    form.receivingMaterialItems.map(
                        (
                            item,
                            index
                        ) => (

                            <div
                                key={index}
                                className="item-row"
                            >


                                {/* =================================================
                                    BOX TYPE
                                ================================================= */}

                                <div className="form-group">

                                    <label>
                                        Box Type
                                    </label>


                                    <select
                                        value={
                                            customBoxTypes[index]
                                                ?
                                                "__CUSTOM__"
                                                :
                                                item.boxType
                                        }
                                        onChange={
                                            (e) =>
                                                handleBoxTypeChange(
                                                    index,
                                                    e.target.value
                                                )
                                        }
                                        required={
                                            !customBoxTypes[index]
                                        }
                                        disabled={loading}
                                    >

                                        <option value="">
                                            Select Box Type
                                        </option>


                                        {

                                            BOX_TYPES.map(
                                                box => (

                                                    <option
                                                        key={box}
                                                        value={box}
                                                    >

                                                        {
                                                            formatBoxType(
                                                                box
                                                            )
                                                        }

                                                    </option>

                                                )
                                            )

                                        }


                                        {/* =================================================
                                            CUSTOM OPTION
                                        ================================================= */}

                                        <option value="__CUSTOM__">

                                            Other / Custom

                                        </option>

                                    </select>


                                    {/* =================================================
                                        CUSTOM INPUT
                                    ================================================= */}

                                    {
                                        customBoxTypes[index] && (

                                            <input
                                                type="text"
                                                value={
                                                    item.boxType
                                                }
                                                onChange={
                                                    (e) =>
                                                        handleCustomBoxTypeChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                }
                                                placeholder="Enter custom box type"
                                                required
                                                disabled={loading}
                                                style={{
                                                    marginTop: "10px"
                                                }}
                                            />

                                        )
                                    }

                                </div>


                                {/* =================================================
                                    QUANTITY
                                ================================================= */}

                                <div className="form-group">

                                    <label>
                                        Material Quantity
                                    </label>


                                    <input
                                        type="number"
                                        min="1"
                                        value={
                                            item.materialQuantity
                                        }
                                        onChange={
                                            (e) =>
                                                updateItem(
                                                    index,
                                                    "materialQuantity",
                                                    e.target.value
                                                )
                                        }
                                        required
                                        disabled={loading}
                                    />

                                </div>


                                {/* =================================================
                                    DELETE
                                ================================================= */}

                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() =>
                                        removeItem(
                                            index
                                        )
                                    }
                                    disabled={loading}
                                    title="Remove Item"
                                >

                                    <Trash2 size={18} />

                                </button>

                            </div>

                        )
                    )

                }


                {/* =================================================
                    FORM ACTIONS
                ================================================= */}

                <div className="form-actions">


                    <Link
                        to="/procurement/receiving-material"
                        className="cancel-btn"
                    >

                        Cancel

                    </Link>


                    <button
                        type="submit"
                        disabled={loading}
                        className="save-btn"
                    >

                        <Save size={18} />


                        {

                            loading
                                ?
                                "Saving..."
                                :
                                isEdit
                                    ?
                                    "Update Receiving"
                                    :
                                    "Create Receiving"

                        }

                    </button>

                </div>

            </form>

        </div>

    );

};


export default ReceivingForm;