import React, {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    Save,
    Plus,
    Trash2,
    Building2,
    Package,
    Truck,
    CalendarDays,
    FileText,
    Layers,
    RefreshCcw
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams,
    useSearchParams
} from "react-router-dom";

import deliveryService
    from "../../services/DeliveryService";


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
   STATUS
========================================================= */

const DELIVERY_STATUS = [
    "HOLD",
    "INPROCESS",
    "DELIVERED",
    "NOTDELIVERED"
];


/* =========================================================
   MEDIUM
========================================================= */

const DELIVERY_MEDIUMS = [
    "TRUCK",
    "COURIER",
    "TRANSPORT",
    "PICKUP",
    "OTHER"
];


/* =========================================================
   FORMAT TEXT
========================================================= */

const formatText = (value) => {

    if (!value) {
        return "";
    }

    return String(value)
        .replaceAll("_", " ")
        .replace(/\s+/g, " ")
        .trim();
};


/* =========================================================
   EMPTY ITEM
========================================================= */

const createEmptyItem = () => ({

    inventoryTypeId: "",

    inventoryTypeName: "",

    materialId: "",

    materialName: "",

    productName: "",

    boxType: "",

    customBoxType: "",

    deliveredQuantity: ""

});


/* =========================================================
   COMPONENT
========================================================= */

const DeliveryForm = () => {

    const navigate =
        useNavigate();


    const { id } =
        useParams();


    const [searchParams] =
        useSearchParams();


    const isEdit =
        Boolean(id);


    const templateId =
        searchParams.get(
            "templateId"
        );


    const companyIdFromQuery =
        searchParams.get(
            "companyId"
        );


    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        loadingCategories,
        setLoadingCategories
    ] = useState(true);


    const [
        inventoryCategories,
        setInventoryCategories
    ] = useState([]);


    const [
        materialsByCategory,
        setMaterialsByCategory
    ] = useState({});


    const [
        prefilled,
        setPrefilled
    ] = useState(false);


    const [
        delivery,
        setDelivery
    ] = useState({

        companyId:
            companyIdFromQuery || "",

        companyName: "",

        deliveryDate: "",

        deliveryStatus:
            "HOLD",

        deliveryMedium: "",

        remarks: ""

    });


    const [
        items,
        setItems
    ] = useState([
        createEmptyItem()
    ]);


    /* =====================================================
       LOAD CATEGORIES
    ===================================================== */

    useEffect(() => {

        loadInventoryCategories();

    }, []);


    const loadInventoryCategories =
        async () => {

            try {

                setLoadingCategories(
                    true
                );


                const data =
                    await deliveryService
                        .getInventoryCategories();


                setInventoryCategories(
                    Array.isArray(data)
                        ? data
                        : []
                );

            }
            catch (error) {

                console.error(
                    "Failed to load inventory categories",
                    error
                );

                setInventoryCategories([]);

            }
            finally {

                setLoadingCategories(
                    false
                );

            }

        };


    /* =====================================================
       LOAD EDIT / TEMPLATE
    ===================================================== */

    useEffect(() => {

        if (isEdit) {

            loadEditDelivery(id);

            return;
        }


        if (templateId) {

            loadTemplateDelivery(
                templateId
            );

        }

    }, [
        id,
        templateId
    ]);


    /* =====================================================
       LOAD EDIT
    ===================================================== */

    const loadEditDelivery =
        async (
            deliveryId
        ) => {

            try {

                setLoading(true);


                const data =
                    await deliveryService
                        .getById(
                            deliveryId
                        );


                setDelivery({

                    companyId:
                        data.companyId || "",

                    companyName:
                        data.companyName || "",

                    deliveryDate:
                        data.deliveryDate
                            ? data.deliveryDate.substring(
                                0,
                                16
                            )
                            : "",

                    deliveryStatus:
                        data.deliveryStatus ||
                        "HOLD",

                    deliveryMedium:
                        data.deliveryMedium ||
                        "",

                    remarks:
                        data.remarks ||
                        ""

                });


                setItems([

                    {

                        inventoryTypeId:
                            data.categoryId ||
                            "",

                        inventoryTypeName:
                            data.categoryName ||
                            "",

                        materialId:
                            data.materialId ||
                            "",

                        materialName:
                            data.materialName ||
                            "",

                        productName:
                            data.productName ||
                            "",

                        boxType:
                            data.boxType ||
                            "",

                        customBoxType:
                            data.customBoxType ||
                            "",

                        deliveredQuantity:
                            data.deliveredQuantity ??
                            ""

                    }

                ]);


                /*
                 * Load material options for
                 * existing material-based item.
                 */

                if (
                    data.categoryId
                ) {

                    await loadMaterials(
                        data.categoryId
                    );
                }

            }
            catch (error) {

                console.error(
                    "Failed to load delivery",
                    error
                );

            }
            finally {

                setLoading(false);

            }

        };


    /* =====================================================
       LOAD TEMPLATE
    ===================================================== */

    const loadTemplateDelivery =
        async (
            deliveryId
        ) => {

            try {

                setLoading(true);


                const data =
                    await deliveryService
                        .getById(
                            deliveryId
                        );


                setDelivery({

                    companyId:
                        data.companyId || "",

                    companyName:
                        data.companyName || "",

                    deliveryDate:
                        data.deliveryDate
                            ? data.deliveryDate.substring(
                                0,
                                16
                            )
                            : "",

                    deliveryStatus:
                        data.deliveryStatus ||
                        "HOLD",

                    deliveryMedium:
                        data.deliveryMedium ||
                        "",

                    remarks:
                        data.remarks ||
                        ""

                });


                setItems([

                    {

                        inventoryTypeId:
                            data.categoryId ||
                            "",

                        inventoryTypeName:
                            data.categoryName ||
                            "",

                        materialId:
                            data.materialId ||
                            "",

                        materialName:
                            data.materialName ||
                            "",

                        productName:
                            data.productName ||
                            "",

                        boxType:
                            data.boxType ||
                            "",

                        customBoxType:
                            data.customBoxType ||
                            "",

                        deliveredQuantity:
                            data.deliveredQuantity ??
                            ""

                    }

                ]);


                if (
                    data.categoryId
                ) {

                    await loadMaterials(
                        data.categoryId
                    );
                }


                setPrefilled(
                    true
                );

            }
            catch (error) {

                console.error(
                    "Failed to load delivery template",
                    error
                );

            }
            finally {

                setLoading(false);

            }

        };


    /* =====================================================
       LOAD MATERIALS
    ===================================================== */

    const loadMaterials =
        async (
            categoryId
        ) => {

            if (!categoryId) {
                return [];
            }


            /*
             * Already loaded.
             */

            if (
                materialsByCategory[
                    categoryId
                ]
            ) {

                return materialsByCategory[
                    categoryId
                ];

            }


            try {

                const data =
                    await deliveryService
                        .getMaterialsByCategory(
                            categoryId
                        );


                const list =
                    Array.isArray(data)
                        ? data
                        : [];


                setMaterialsByCategory(
                    previous => ({

                        ...previous,

                        [categoryId]:
                            list

                    })
                );


                return list;

            }
            catch (error) {

                console.error(
                    "Failed to load materials",
                    error
                );

                return [];

            }

        };


    /* =====================================================
       COMMON CHANGE
    ===================================================== */

    const handleCommonChange =
        (event) => {

            const {
                name,
                value
            } = event.target;


            setDelivery(
                previous => ({

                    ...previous,

                    [name]: value

                })
            );

        };


    /* =====================================================
       CATEGORY CHANGE
    ===================================================== */

    const handleInventoryTypeChange =
        async (
            index,
            value
        ) => {

            const category =
                inventoryCategories.find(
                    item =>
                        String(
                            item.id
                        ) ===
                        String(
                            value
                        )
                );


            /*
             * Clear item-specific fields
             * when category changes.
             */

            setItems(
                previous =>
                    previous.map(
                        (
                            item,
                            itemIndex
                        ) => {

                            if (
                                itemIndex !==
                                index
                            ) {

                                return item;

                            }


                            return {

                                ...item,

                                inventoryTypeId:
                                    value,

                                inventoryTypeName:
                                    category?.name ||
                                    "",

                                materialId:
                                    "",

                                materialName:
                                    "",

                                boxType:
                                    "",

                                customBoxType:
                                    ""

                            };

                        }
                    )
            );


            /*
             * BOX does not need material loading.
             */

            if (
                category?.name
                    ?.toUpperCase()
                    === "BOX"
            ) {

                return;
            }


            /*
             * Load materials for raw
             * material category.
             */

            await loadMaterials(
                value
            );

        };


    /* =====================================================
       ITEM CHANGE
    ===================================================== */

    const handleItemChange =
        (
            index,
            event
        ) => {

            const {
                name,
                value
            } = event.target;


            setItems(
                previous =>
                    previous.map(
                        (
                            item,
                            itemIndex
                        ) => {

                            if (
                                itemIndex !==
                                index
                            ) {

                                return item;

                            }


                            return {

                                ...item,

                                [name]:
                                    value

                            };

                        }
                    )
            );

        };


    /* =====================================================
       MATERIAL CHANGE
    ===================================================== */

    const handleMaterialChange =
        (
            index,
            value
        ) => {

            const categoryId =
                items[index]
                    ?.inventoryTypeId;


            const materials =
                materialsByCategory[
                    categoryId
                ] || [];


            const material =
                materials.find(
                    item =>
                        String(
                            item.id
                        ) ===
                        String(
                            value
                        )
                );


            setItems(
                previous =>
                    previous.map(
                        (
                            item,
                            itemIndex
                        ) => {

                            if (
                                itemIndex !==
                                index
                            ) {

                                return item;

                            }


                            return {

                                ...item,

                                materialId:
                                    value,

                                materialName:
                                    material?.name ||
                                    ""

                            };

                        }
                    )
            );

        };


    /* =====================================================
       ADD ITEM
    ===================================================== */

    const addItem =
        () => {

            setItems(
                previous => [

                    ...previous,

                    createEmptyItem()

                ]
            );

        };


    /* =====================================================
       REMOVE ITEM
    ===================================================== */

    const removeItem =
        (
            index
        ) => {

            if (
                items.length === 1
            ) {

                return;

            }


            setItems(
                previous =>
                    previous.filter(
                        (
                            _,
                            itemIndex
                        ) =>
                            itemIndex !==
                            index
                    )
            );

        };


    /* =====================================================
       IS BOX CATEGORY
    ===================================================== */

    const isBoxCategory =
        (
            item
        ) => {

            return (
                item
                    ?.inventoryTypeName ||
                ""
            )
                .toUpperCase() ===
                "BOX";
        };


    /* =====================================================
       VALIDATE
    ===================================================== */

    const validateForm =
        () => {

            if (
                !delivery.companyId
            ) {

                alert(
                    "Please enter Company ID."
                );

                return false;

            }


            if (
                !delivery.companyName.trim()
            ) {

                alert(
                    "Please enter Company Name."
                );

                return false;

            }


            if (
                !delivery.deliveryMedium
            ) {

                alert(
                    "Please select Delivery Medium."
                );

                return false;

            }


            if (
                items.length === 0
            ) {

                alert(
                    "Please add at least one delivery item."
                );

                return false;

            }


            for (
                let index = 0;
                index < items.length;
                index++
            ) {

                const item =
                    items[index];


                if (
                    !item.inventoryTypeId
                ) {

                    alert(
                        `Please select Inventory Type for item ${index + 1}.`
                    );

                    return false;
                }


                if (
                    !item.productName.trim()
                ) {

                    alert(
                        `Please enter Product Name for item ${index + 1}.`
                    );

                    return false;

                }


                if (
                    !item.deliveredQuantity ||
                    Number(
                        item.deliveredQuantity
                    ) <= 0
                ) {

                    alert(
                        `Please enter a valid quantity for item ${index + 1}.`
                    );

                    return false;

                }


                /*
                 * BOX
                 */

                if (
                    isBoxCategory(
                        item
                    )
                ) {

                    if (
                        !item.boxType &&
                        !item.customBoxType.trim()
                    ) {

                        alert(
                            `Please select Box Type or enter Custom Box Type for item ${index + 1}.`
                        );

                        return false;

                    }

                }


                /*
                 * RAW MATERIAL
                 */

                else {

                    if (
                        !item.materialId
                    ) {

                        alert(
                            `Please select Material for item ${index + 1}.`
                        );

                        return false;

                    }

                }

            }


            return true;

        };


    /* =====================================================
       BUILD PAYLOAD
    ===================================================== */

    const buildPayload =
        (
            item
        ) => {

            const boxCategory =
                isBoxCategory(
                    item
                );


            return {

                companyId:
                    Number(
                        delivery.companyId
                    ),

                companyName:
                    delivery.companyName,


                categoryId:
                    Number(
                        item.inventoryTypeId
                    ),


                categoryName:
                    item.inventoryTypeName,


                materialId:
                    boxCategory
                        ? null
                        : Number(
                            item.materialId
                        ),


                materialName:
                    boxCategory
                        ? null
                        : item.materialName,


                productName:
                    item.productName.trim(),


                boxType:
                    boxCategory
                        ? (
                            item.boxType ||
                            null
                        )
                        : null,


                customBoxType:
                    boxCategory
                        ? (
                            item.customBoxType.trim() ||
                            null
                        )
                        : null,


                deliveredQuantity:
                    Number(
                        item.deliveredQuantity
                    ),


                deliveryDate:
                    delivery.deliveryDate,


                deliveryStatus:
                    delivery.deliveryStatus,


                deliveryMedium:
                    delivery.deliveryMedium,


                remarks:
                    delivery.remarks

            };

        };


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit =
        async (
            event
        ) => {

            event.preventDefault();


            if (
                !validateForm()
            ) {

                return;

            }


            try {

                setLoading(
                    true
                );


                /*
                 * EDIT = one record
                 */

                if (
                    isEdit
                ) {

                    const payload =
                        buildPayload(
                            items[0]
                        );


                    await deliveryService
                        .update(
                            id,
                            payload
                        );


                    alert(
                        "Delivery Updated Successfully"
                    );

                }


                /*
                 * CREATE = multiple records
                 */

                else {

                    const payloads =
                        items.map(
                            buildPayload
                        );


                    await deliveryService
                        .createBulk(
                            payloads
                        );


                    alert(
                        `${items.length} delivery ${
                            items.length === 1
                                ? "record"
                                : "records"
                        } created successfully.`
                    );

                }


                navigate(
                    delivery.companyId
                        ? `/sales/delivery/company/${delivery.companyId}`
                        : "/sales/delivery"
                );

            }
            catch (error) {

                console.error(
                    "Delivery save failed",
                    error
                );


                alert(
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Operation Failed"
                );

            }
            finally {

                setLoading(
                    false
                );

            }

        };


    /* =====================================================
       LOADING
    ===================================================== */

    if (
        loading &&
        isEdit &&
        !items[0]?.inventoryTypeId
    ) {

        return (

            <div className="loading">

                <RefreshCcw
                    size={22}
                />

                Loading Delivery...

            </div>

        );

    }


    /* =====================================================
       UI
    ===================================================== */

    return (

        <div className="delivery-form-container">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="delivery-form-header">

                <div>

                    <h2>

                        {
                            isEdit

                                ? "Edit Delivery"

                                : prefilled

                                    ? "Create New Deliveries"

                                    : "Create Delivery"
                        }

                    </h2>


                    <p>

                        {
                            isEdit

                                ? "Update delivery information."

                                : prefilled

                                    ? "Company information is pre-filled. Add as many products as required."

                                    : "Create one or multiple deliveries for the same company."
                        }

                    </p>

                </div>


                <Link
                    to={
                        delivery.companyId

                            ? `/sales/delivery/company/${delivery.companyId}`

                            : "/sales/delivery"
                    }
                    className="back-btn"
                >

                    <ArrowLeft
                        size={18}
                    />

                    Back

                </Link>

            </div>


            <form
                onSubmit={
                    handleSubmit
                }
                className="delivery-form"
            >


                {/* =================================================
                    COMPANY
                ================================================= */}

                <div className="delivery-form-section-title">

                    <Building2
                        size={18}
                    />

                    <div>

                        <strong>
                            Company Information
                        </strong>

                        <span>
                            Common information for all delivery items
                        </span>

                    </div>

                </div>


                <div className="form-group">

                    <label>
                        Company ID
                    </label>

                    <div className="input-with-icon">

                        <Building2
                            size={17}
                        />

                        <input
                            type="number"
                            name="companyId"
                            value={
                                delivery.companyId
                            }
                            onChange={
                                handleCommonChange
                            }
                            required
                            disabled={
                                loading
                            }
                        />

                    </div>

                </div>


                <div className="form-group">

                    <label>
                        Company Name
                    </label>

                    <div className="input-with-icon">

                        <Building2
                            size={17}
                        />

                        <input
                            type="text"
                            name="companyName"
                            value={
                                delivery.companyName
                            }
                            onChange={
                                handleCommonChange
                            }
                            placeholder="Company name"
                            required
                            disabled={
                                loading
                            }
                        />

                    </div>

                </div>


                <div className="form-group">

                    <label>
                        Delivery Date
                    </label>

                    <div className="input-with-icon">

                        <CalendarDays
                            size={17}
                        />

                        <input
                            type="datetime-local"
                            name="deliveryDate"
                            value={
                                delivery.deliveryDate
                            }
                            onChange={
                                handleCommonChange
                            }
                            disabled={
                                loading
                            }
                        />

                    </div>

                </div>


                <div className="form-group">

                    <label>
                        Delivery Status
                    </label>

                    <div className="input-with-icon">

                        <Truck
                            size={17}
                        />

                        <select
                            name="deliveryStatus"
                            value={
                                delivery.deliveryStatus
                            }
                            onChange={
                                handleCommonChange
                            }
                            disabled={
                                loading
                            }
                        >

                            {
                                DELIVERY_STATUS.map(
                                    status => (

                                        <option
                                            key={
                                                status
                                            }
                                            value={
                                                status
                                            }
                                        >

                                            {
                                                formatText(
                                                    status
                                                )
                                            }

                                        </option>
                                    )
                                )
                            }

                        </select>

                    </div>

                </div>


                <div className="form-group">

                    <label>
                        Delivery Medium
                    </label>

                    <div className="input-with-icon">

                        <Truck
                            size={17}
                        />

                        <select
                            name="deliveryMedium"
                            value={
                                delivery.deliveryMedium
                            }
                            onChange={
                                handleCommonChange
                            }
                            required
                            disabled={
                                loading
                            }
                        >

                            <option value="">
                                Select Delivery Medium
                            </option>

                            {
                                DELIVERY_MEDIUMS.map(
                                    medium => (

                                        <option
                                            key={
                                                medium
                                            }
                                            value={
                                                medium
                                            }
                                        >

                                            {
                                                medium
                                            }

                                        </option>
                                    )
                                )
                            }

                        </select>

                    </div>

                </div>


                {/* =================================================
                    DELIVERY ITEMS
                ================================================= */}

                <div className="delivery-form-section-title full-width">

                    <Layers
                        size={18}
                    />

                    <div>

                        <strong>
                            Delivery Items
                        </strong>

                        <span>
                            Select inventory type and the exact inventory item.
                        </span>

                    </div>

                </div>


                <div className="delivery-items full-width">

                    {
                        items.map(
                            (
                                item,
                                index
                            ) => {

                                const boxCategory =
                                    isBoxCategory(
                                        item
                                    );


                                const materials =
                                    materialsByCategory[
                                        item.inventoryTypeId
                                    ] || [];


                                return (

                                    <div
                                        className="delivery-item-card"
                                        key={
                                            index
                                        }
                                    >

                                        <div className="delivery-item-header">

                                            <div className="delivery-item-number">

                                                {
                                                    index +
                                                    1
                                                }

                                            </div>

                                            <strong>

                                                Delivery Item{" "}
                                                {
                                                    index +
                                                    1
                                                }

                                            </strong>


                                            {
                                                items.length >
                                                1 && (

                                                    <button
                                                        type="button"
                                                        className="remove-item-btn"
                                                        onClick={() =>
                                                            removeItem(
                                                                index
                                                            )
                                                        }
                                                        title="Remove item"
                                                    >

                                                        <Trash2
                                                            size={17}
                                                        />

                                                    </button>

                                                )
                                            }

                                        </div>


                                        <div className="delivery-item-grid">


                                            {/* =================================
                                                INVENTORY TYPE
                                            ================================= */}

                                            <div className="form-group">

                                                <label>
                                                    Inventory Type
                                                </label>

                                                <div className="input-with-icon">

                                                    <Layers
                                                        size={17}
                                                    />

                                                    <select
                                                        value={
                                                            item.inventoryTypeId
                                                        }
                                                        onChange={
                                                            e =>
                                                                handleInventoryTypeChange(
                                                                    index,
                                                                    e.target.value
                                                                )
                                                        }
                                                        required
                                                        disabled={
                                                            loading ||
                                                            loadingCategories
                                                        }
                                                    >

                                                        <option value="">
                                                            {
                                                                loadingCategories
                                                                    ? "Loading..."
                                                                    : "Select Inventory Type"
                                                            }
                                                        </option>


                                                        {
                                                            inventoryCategories.map(
                                                                category => (

                                                                    <option
                                                                        key={
                                                                            category.id
                                                                        }
                                                                        value={
                                                                            category.id
                                                                        }
                                                                    >

                                                                        {
                                                                            formatText(
                                                                                category.name
                                                                            )
                                                                        }

                                                                    </option>
                                                                )
                                                            )
                                                        }

                                                    </select>

                                                </div>

                                            </div>


                                            {/* =================================
                                                BOX TYPE
                                            ================================= */}

                                            {
                                                boxCategory

                                                ? (

                                                    <div className="form-group">

                                                        <label>
                                                            Box Type
                                                        </label>

                                                        <div className="input-with-icon">

                                                            <Package
                                                                size={17}
                                                            />

                                                            <select
                                                                value={
                                                                    item.boxType ||
                                                                    (
                                                                        item.customBoxType
                                                                            ? "__CUSTOM__"
                                                                            : ""
                                                                    )
                                                                }
                                                                onChange={
                                                                    e => {

                                                                        const value =
                                                                            e.target.value;

                                                                        setItems(
                                                                            previous =>
                                                                                previous.map(
                                                                                    (
                                                                                        current,
                                                                                        itemIndex
                                                                                    ) => {

                                                                                        if (
                                                                                            itemIndex !==
                                                                                            index
                                                                                        ) {

                                                                                            return current;
                                                                                        }


                                                                                        if (
                                                                                            value ===
                                                                                            "__CUSTOM__"
                                                                                        ) {

                                                                                            return {

                                                                                                ...current,

                                                                                                boxType:
                                                                                                    "",

                                                                                                customBoxType:
                                                                                                    ""

                                                                                            };

                                                                                        }


                                                                                        return {

                                                                                            ...current,

                                                                                            boxType:
                                                                                                value,

                                                                                            customBoxType:
                                                                                                ""

                                                                                        };

                                                                                    }
                                                                                )
                                                                        );

                                                                    }
                                                                }
                                                                required
                                                                disabled={
                                                                    loading
                                                                }
                                                            >

                                                                <option value="">
                                                                    Select Box Type
                                                                </option>


                                                                {
                                                                    BOX_TYPES.map(
                                                                        box => (

                                                                            <option
                                                                                key={
                                                                                    box
                                                                                }
                                                                                value={
                                                                                    box
                                                                                }
                                                                            >

                                                                                {
                                                                                    formatText(
                                                                                        box
                                                                                    )
                                                                                }

                                                                            </option>
                                                                        )
                                                                    )
                                                                }


                                                                <option value="__CUSTOM__">
                                                                    Other / Custom
                                                                </option>

                                                            </select>

                                                        </div>


                                                        {
                                                            item.customBoxType !==
                                                            "" && (

                                                                <input
                                                                    type="text"
                                                                    className="custom-box-input"
                                                                    value={
                                                                        item.customBoxType
                                                                    }
                                                                    onChange={
                                                                        e =>
                                                                            handleItemChange(
                                                                                index,
                                                                                {
                                                                                    target: {
                                                                                        name: "customBoxType",
                                                                                        value: e.target.value
                                                                                    }
                                                                                }
                                                                            )
                                                                    }
                                                                    placeholder="Enter custom box name"
                                                                    required
                                                                    disabled={
                                                                        loading
                                                                    }
                                                                />

                                                            )
                                                        }

                                                    </div>

                                                )

                                                : (

                                                    /* =================================
                                                       MATERIAL
                                                    ================================= */

                                                    <div className="form-group">

                                                        <label>
                                                            Material
                                                        </label>

                                                        <div className="input-with-icon">

                                                            <Package
                                                                size={17}
                                                            />

                                                            <select
                                                                value={
                                                                    item.materialId
                                                                }
                                                                onChange={
                                                                    e =>
                                                                        handleMaterialChange(
                                                                            index,
                                                                            e.target.value
                                                                        )
                                                                }
                                                                required
                                                                disabled={
                                                                    loading ||
                                                                    !item.inventoryTypeId
                                                                }
                                                            >

                                                                <option value="">
                                                                    {
                                                                        !item.inventoryTypeId
                                                                            ? "Select Inventory Type First"
                                                                            : "Select Material"
                                                                    }
                                                                </option>


                                                                {
                                                                    materials.map(
                                                                        material => (

                                                                            <option
                                                                                key={
                                                                                    material.id
                                                                                }
                                                                                value={
                                                                                    material.id
                                                                                }
                                                                            >

                                                                                {
                                                                                    material.name
                                                                                }

                                                                            </option>
                                                                        )
                                                                    )
                                                                }

                                                            </select>

                                                        </div>

                                                        {
                                                            item.inventoryTypeId &&
                                                            materials.length ===
                                                            0 && (

                                                                <small className="delivery-form-hint">

                                                                    No materials found for this inventory type.

                                                                </small>

                                                            )
                                                        }

                                                    </div>

                                                )
                                            }


                                            {/* =================================
                                                PRODUCT NAME
                                            ================================= */}

                                            <div className="form-group">

                                                <label>
                                                    Product Name
                                                </label>

                                                <div className="input-with-icon">

                                                    <Package
                                                        size={17}
                                                    />

                                                    <input
                                                        type="text"
                                                        name="productName"
                                                        value={
                                                            item.productName
                                                        }
                                                        onChange={
                                                            e =>
                                                                handleItemChange(
                                                                    index,
                                                                    e
                                                                )
                                                        }
                                                        placeholder="Enter product name"
                                                        required
                                                        disabled={
                                                            loading
                                                        }
                                                    />

                                                </div>

                                            </div>


                                            {/* =================================
                                                QUANTITY
                                            ================================= */}

                                            <div className="form-group">

                                                <label>
                                                    Delivered Quantity
                                                </label>

                                                <div className="input-with-icon">

                                                    <Package
                                                        size={17}
                                                    />

                                                    <input
                                                        type="number"
                                                        min="1"
                                                        name="deliveredQuantity"
                                                        value={
                                                            item.deliveredQuantity
                                                        }
                                                        onChange={
                                                            e =>
                                                                handleItemChange(
                                                                    index,
                                                                    e
                                                                )
                                                        }
                                                        placeholder="Quantity"
                                                        required
                                                        disabled={
                                                            loading
                                                        }
                                                    />

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                );
                            }
                        )
                    }


                    {
                        !isEdit && (

                            <button
                                type="button"
                                className="add-item-btn"
                                onClick={
                                    addItem
                                }
                                disabled={
                                    loading
                                }
                            >

                                <Plus
                                    size={17}
                                />

                                Add Another Product

                            </button>

                        )
                    }

                </div>


                {/* =================================================
                    REMARKS
                ================================================= */}

                <div className="form-group full-width">

                    <label>
                        Remarks
                    </label>

                    <div className="textarea-with-icon">

                        <FileText
                            size={17}
                        />

                        <textarea
                            name="remarks"
                            rows="4"
                            value={
                                delivery.remarks
                            }
                            onChange={
                                handleCommonChange
                            }
                            placeholder="Enter remarks..."
                            disabled={
                                loading
                            }
                        />

                    </div>

                </div>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="delivery-form-actions">

                    <Link
                        to={
                            delivery.companyId
                                ? `/sales/delivery/company/${delivery.companyId}`
                                : "/sales/delivery"
                        }
                        className="form-cancel-btn"
                    >

                        Cancel

                    </Link>


                    <button
                        type="submit"
                        disabled={
                            loading
                        }
                        className="save-btn"
                    >

                        <Save
                            size={18}
                        />

                        {
                            loading

                                ? "Saving..."

                                : isEdit

                                    ? "Update Delivery"

                                    : `Create ${
                                        items.length
                                    } ${
                                        items.length === 1
                                            ? "Delivery"
                                            : "Deliveries"
                                    }`
                        }

                    </button>

                </div>

            </form>

        </div>

    );

};


export default DeliveryForm;