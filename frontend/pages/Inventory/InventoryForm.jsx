import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    ArrowLeft,
    Save,
    Plus,
    X
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import inventoryService
    from "../../services/inventoryService";

import inventoryCategoryService
    from "../../services/inventoryCategoryService";

import materialService
    from "../../services/materialService";


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


const formatBoxType = (
    value
) => {

    return value
        ? value
            .replaceAll(
                "_",
                " "
            )
            .replace(
                /\s+/g,
                " "
            )
            .trim()
        : "";
};


const InventoryForm = () => {

    const navigate =
        useNavigate();

    const { id } =
        useParams();


    const isEdit =
        Boolean(id);


    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        categories,
        setCategories
    ] = useState([]);


    const [
        materials,
        setMaterials
    ] = useState([]);


    const [
        showCustomCategory,
        setShowCustomCategory
    ] = useState(false);


    const [
        showCustomMaterial,
        setShowCustomMaterial
    ] = useState(false);


    const [
        newCategoryName,
        setNewCategoryName
    ] = useState("");


    const [
        newMaterialName,
        setNewMaterialName
    ] = useState("");


    const [
        inventory,
        setInventory
    ] = useState({

        categoryId: "",

        categoryName: "",

        boxType: "",

        materialId: "",

        materialName: "",

        availableQuantity: "",

        minimumQuantity: ""
    });


    // =========================================================
    // LOAD
    // =========================================================

    useEffect(() => {

        loadCategories();

        if (isEdit) {

            loadInventory();

        }

    }, [id]);


    const loadCategories =
        async () => {

            try {

                const data =
                    await inventoryCategoryService
                        .getAll();

                setCategories(
                    Array.isArray(data)
                        ? data
                        : []
                );

            }
            catch (error) {

                console.error(
                    "Failed to load categories",
                    error
                );
            }
        };


    const loadMaterials =
        async (
            categoryId
        ) => {

            if (!categoryId) {

                setMaterials([]);

                return;
            }


            try {

                const data =
                    await materialService
                        .getByCategory(
                            categoryId
                        );

                setMaterials(
                    Array.isArray(data)
                        ? data
                        : []
                );

            }
            catch (error) {

                console.error(
                    "Failed to load materials",
                    error
                );

                setMaterials([]);
            }
        };


    const loadInventory =
        async () => {

            try {

                setLoading(true);

                const data =
                    await inventoryService
                        .getById(id);


                setInventory({

                    categoryId:
                        data.categoryId || "",

                    categoryName:
                        data.categoryName || "",

                    boxType:
                        data.boxType || "",

                    materialId:
                        data.materialId || "",

                    materialName:
                        data.materialName || "",

                    availableQuantity:
                        data.availableQuantity ?? "",

                    minimumQuantity:
                        data.minimumQuantity ?? ""
                });


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
                    "Failed to load inventory",
                    error
                );

            }
            finally {

                setLoading(false);
            }
        };


    // =========================================================
    // CATEGORY CHANGE
    // =========================================================

    const handleCategoryChange =
        async (
            event
        ) => {

            const value =
                event.target.value;


            if (
                value === "__CUSTOM_CATEGORY__"
            ) {

                setShowCustomCategory(true);

                setShowCustomMaterial(false);

                setMaterials([]);


                setInventory(
                    previous => ({

                        ...previous,

                        categoryId: "",

                        categoryName: "",

                        boxType: "",

                        materialId: "",

                        materialName: ""
                    })
                );


                return;
            }


            const category =
                categories.find(
                    item =>
                        String(
                            item.id
                        ) ===
                        String(value)
                );


            setShowCustomCategory(false);

            setShowCustomMaterial(false);


            setNewCategoryName("");

            setNewMaterialName("");


            setInventory(
                previous => ({

                    ...previous,

                    categoryId:
                        category?.id || "",

                    categoryName:
                        category?.name || "",

                    boxType: "",

                    materialId: "",

                    materialName: ""
                })
            );


            if (
                category?.id
            ) {

                await loadMaterials(
                    category.id
                );
            }

        };


    // =========================================================
    // MATERIAL CHANGE
    // =========================================================

    const handleMaterialChange =
        (
            event
        ) => {

            const value =
                event.target.value;


            if (
                value === "__CUSTOM_MATERIAL__"
            ) {

                setShowCustomMaterial(
                    true
                );


                setInventory(
                    previous => ({

                        ...previous,

                        materialId: "",

                        materialName: ""
                    })
                );


                return;
            }


            const material =
                materials.find(
                    item =>
                        String(
                            item.id
                        ) ===
                        String(value)
                );


            setShowCustomMaterial(
                false
            );


            setInventory(
                previous => ({

                    ...previous,

                    materialId:
                        material?.id || "",

                    materialName:
                        material?.name || ""
                })
            );
        };


    // =========================================================
    // NORMAL CHANGE
    // =========================================================

    const handleChange =
        (
            event
        ) => {

            const {
                name,
                value
            } =
                event.target;


            setInventory(
                previous => ({

                    ...previous,

                    [name]: value
                })
            );
        };


    // =========================================================
    // CREATE CUSTOM CATEGORY
    // =========================================================

    const createCustomCategory =
        async () => {

            if (
                !newCategoryName.trim()
            ) {

                alert(
                    "Please enter a custom inventory type."
                );

                return null;
            }


            const created =
                await inventoryCategoryService
                    .create({

                        name:
                            newCategoryName
                                .trim(),

                        active:
                            true
                    });


            await loadCategories();


            setShowCustomCategory(
                false
            );


            setNewCategoryName("");


            setInventory(
                previous => ({

                    ...previous,

                    categoryId:
                        created.id,

                    categoryName:
                        created.name,

                    boxType: "",

                    materialId: "",

                    materialName: ""
                })
            );


            await loadMaterials(
                created.id
            );


            return created;
        };


    // =========================================================
    // CREATE CUSTOM MATERIAL
    // =========================================================

    const createCustomMaterial =
        async () => {

            if (
                !newMaterialName.trim()
            ) {

                alert(
                    "Please enter a custom material name."
                );

                return null;
            }


            if (
                !inventory.categoryId
            ) {

                alert(
                    "Please select an Inventory Type first."
                );

                return null;
            }


            const created =
                await materialService
                    .create({

                        name:
                            newMaterialName
                                .trim(),

                        categoryId:
                            Number(
                                inventory.categoryId
                            ),

                        active:
                            true
                    });


            await loadMaterials(
                inventory.categoryId
            );


            setShowCustomMaterial(
                false
            );


            setNewMaterialName("");


            setInventory(
                previous => ({

                    ...previous,

                    materialId:
                        created.id,

                    materialName:
                        created.name
                })
            );


            return created;
        };


    // =========================================================
    // SUBMIT
    // =========================================================

    const handleSubmit =
        async (
            event
        ) => {

            event.preventDefault();


            if (
                loading
            ) {

                return;
            }


            try {

                setLoading(true);


                let categoryId =
                    inventory.categoryId;


                /*
                 * CUSTOM CATEGORY
                 */

                if (
                    showCustomCategory &&
                    !categoryId
                ) {

                    const created =
                        await createCustomCategory();


                    if (!created) {

                        return;
                    }


                    categoryId =
                        created.id;
                }


                if (
                    !categoryId
                ) {

                    throw new Error(
                        "Please select Inventory Type."
                    );
                }


                /*
                 * Find category
                 */

                const category =
                    categories.find(
                        item =>
                            String(
                                item.id
                            ) ===
                            String(
                                categoryId
                            )
                    );


                const categoryName =
                    category?.name ||
                    inventory.categoryName;


                /*
                 * BOX
                 */

                const isBox =
                    categoryName
                        .trim()
                        .toUpperCase()
                        ===
                        "BOX";


                if (
                    isBox &&
                    !inventory.boxType
                ) {

                    throw new Error(
                        "Please select Box Type."
                    );
                }


                /*
                 * MATERIAL
                 */

                let materialId =
                    inventory.materialId;


                if (
                    !isBox
                ) {

                    if (
                        showCustomMaterial &&
                        !materialId
                    ) {

                        const created =
                            await createCustomMaterial();


                        if (
                            !created
                        ) {

                            return;
                        }


                        materialId =
                            created.id;
                    }


                    if (
                        !materialId
                    ) {

                        throw new Error(
                            "Please select Material."
                        );
                    }
                }


                /*
                 * PAYLOAD
                 */

                const payload = {

                    categoryId:
                        Number(
                            categoryId
                        ),

                    boxType:
                        isBox
                            ? inventory.boxType
                            : null,

                    materialId:
                        !isBox
                            ? Number(
                                materialId
                            )
                            : null,

                    availableQuantity:
                        Number(
                            inventory.availableQuantity
                        ),

                    minimumQuantity:
                        Number(
                            inventory.minimumQuantity
                        )
                };


                if (
                    Number.isNaN(
                        payload.availableQuantity
                    )
                ) {

                    throw new Error(
                        "Please enter a valid Available Quantity."
                    );
                }


                if (
                    Number.isNaN(
                        payload.minimumQuantity
                    )
                ) {

                    throw new Error(
                        "Please enter a valid Minimum Quantity."
                    );
                }


                /*
                 * SAVE
                 */

                if (
                    isEdit
                ) {

                    await inventoryService.update(
                        id,
                        payload
                    );


                    alert(
                        "Inventory Updated Successfully"
                    );

                }
                else {

                    await inventoryService.create(
                        payload
                    );


                    alert(
                        "Inventory Added Successfully"
                    );
                }


                navigate(
                    "/inventory"
                );

            }
            catch (
                error
            ) {

                console.error(
                    "Inventory save failed",
                    error
                );


                alert(
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message ||
                    "Operation Failed"
                );

            }
            finally {

                setLoading(false);
            }
        };


    const selectedCategoryName =
        inventory.categoryName
            ? inventory.categoryName
                .trim()
                .toUpperCase()
            : "";


    const isBox =
        selectedCategoryName ===
        "BOX";


    const formattedCategories =
        useMemo(
            () =>
                categories.filter(
                    item =>
                        item.active
                ),
            [categories]
        );


    return (

        <div className="inventory-form-container">

            <div className="inventory-form-header">

                <div>

                    <h2>

                        {
                            isEdit
                                ? "Edit Inventory"
                                : "Create Inventory"
                        }

                    </h2>

                    <p>

                        {
                            isEdit
                                ? "Update inventory quantities"
                                : "Create inventory for boxes or raw materials"
                        }

                    </p>

                </div>


                <Link
                    to="/inventory"
                    className="back-btn"
                >

                    <ArrowLeft
                        size={18}
                    />

                    Back

                </Link>

            </div>


            <form
                className="inventory-form"
                onSubmit={
                    handleSubmit
                }
            >


                {/* =================================================
                    INVENTORY TYPE
                ================================================= */}

                <div
                    className="form-group"
                >

                    <label>
                        Inventory Type
                    </label>


                    {!showCustomCategory ? (

                        <select
                            value={
                                inventory.categoryId
                            }
                            onChange={
                                handleCategoryChange
                            }
                            disabled={
                                loading ||
                                isEdit
                            }
                            required
                        >

                            <option value="">
                                Select Inventory Type
                            </option>


                            {
                                formattedCategories.map(
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
                                                category.name
                                            }

                                        </option>

                                    )
                                )
                            }


                            <option
                                value={
                                    "__CUSTOM_CATEGORY__"
                                }
                            >

                                + Add Custom Type

                            </option>

                        </select>

                    ) : (

                        <div
                            className="custom-entry-box"
                        >

                            <div
                                className="custom-entry-header"
                            >

                                <strong>
                                    New Inventory Type
                                </strong>


                                <button
                                    type="button"
                                    className="custom-close-btn"
                                    onClick={() => {

                                        setShowCustomCategory(
                                            false
                                        );

                                        setNewCategoryName(
                                            ""
                                        );

                                    }}
                                >

                                    <X size={16} />

                                </button>

                            </div>


                            <input
                                type="text"
                                value={
                                    newCategoryName
                                }
                                onChange={
                                    event =>
                                        setNewCategoryName(
                                            event.target.value
                                        )
                                }
                                placeholder="Example: EMULSIFIER"
                                disabled={
                                    loading
                                }
                            />


                            <button
                                type="button"
                                className="custom-add-btn"
                                onClick={
                                    createCustomCategory
                                }
                                disabled={
                                    loading
                                }
                            >

                                <Plus
                                    size={16}
                                />

                                Add Inventory Type

                            </button>

                        </div>
                    )}

                </div>


                {/* =================================================
                    BOX TYPE
                ================================================= */}

                {
                    isBox &&
                    (

                        <div
                            className="form-group"
                        >

                            <label>
                                Box Type
                            </label>


                            <select
                                value={
                                    inventory.boxType
                                }
                                onChange={
                                    event =>
                                        setInventory(
                                            previous => ({

                                                ...previous,

                                                boxType:
                                                    event
                                                        .target
                                                        .value
                                            })
                                        )
                                }
                                disabled={
                                    loading ||
                                    isEdit
                                }
                                required
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
                                                    formatBoxType(
                                                        box
                                                    )
                                                }

                                            </option>

                                        )
                                    )
                                }

                            </select>

                        </div>
                    )
                }


                {/* =================================================
                    MATERIAL
                ================================================= */}

                {
                    inventory.categoryId &&
                    !isBox &&
                    (

                        <div
                            className="form-group"
                        >

                            <label>
                                Material
                            </label>


                            {!showCustomMaterial ? (

                                <select
                                    value={
                                        inventory.materialId
                                    }
                                    onChange={
                                        handleMaterialChange
                                    }
                                    disabled={
                                        loading ||
                                        isEdit
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Material
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


                                    <option
                                        value={
                                            "__CUSTOM_MATERIAL__"
                                        }
                                    >

                                        + Add Custom Material

                                    </option>

                                </select>

                            ) : (

                                <div
                                    className="custom-entry-box"
                                >

                                    <div
                                        className="custom-entry-header"
                                    >

                                        <strong>
                                            New Material
                                        </strong>


                                        <button
                                            type="button"
                                            className="custom-close-btn"
                                            onClick={() => {

                                                setShowCustomMaterial(
                                                    false
                                                );

                                                setNewMaterialName(
                                                    ""
                                                );

                                            }}
                                        >

                                            <X
                                                size={16}
                                            />

                                        </button>

                                    </div>


                                    <input
                                        type="text"
                                        value={
                                            newMaterialName
                                        }
                                        onChange={
                                            event =>
                                                setNewMaterialName(
                                                    event.target.value
                                                )
                                        }
                                        placeholder="Enter material name"
                                        disabled={
                                            loading
                                        }
                                    />


                                    <button
                                        type="button"
                                        className="custom-add-btn"
                                        onClick={
                                            createCustomMaterial
                                        }
                                        disabled={
                                            loading
                                        }
                                    >

                                        <Plus
                                            size={16}
                                        />

                                        Add Material

                                    </button>

                                </div>
                            )}

                        </div>
                    )
                }


                {/* =================================================
                    AVAILABLE
                ================================================= */}

                <div
                    className="form-group"
                >

                    <label>
                        Available Quantity
                    </label>


                    <input
                        type="number"
                        min="0"
                        name="availableQuantity"
                        value={
                            inventory.availableQuantity
                        }
                        onChange={
                            handleChange
                        }
                        required
                        disabled={
                            loading
                        }
                    />

                </div>


                {/* =================================================
                    MINIMUM
                ================================================= */}

                <div
                    className="form-group"
                >

                    <label>
                        Minimum Quantity
                    </label>


                    <input
                        type="number"
                        min="0"
                        name="minimumQuantity"
                        value={
                            inventory.minimumQuantity
                        }
                        onChange={
                            handleChange
                        }
                        required
                        disabled={
                            loading
                        }
                    />


                    <small className="field-help">

                        If Available Quantity falls to or below this
                        value, the inventory will be marked Low Stock.

                    </small>

                </div>


                {/* =================================================
                    SAVE
                ================================================= */}

                <button
                    type="submit"
                    className="save-btn"
                    disabled={
                        loading
                    }
                >

                    <Save size={18} />

                    {
                        loading
                            ? "Saving..."
                            : isEdit
                                ? "Update Inventory"
                                : "Save Inventory"
                    }

                </button>

            </form>

        </div>
    );
};


export default InventoryForm;