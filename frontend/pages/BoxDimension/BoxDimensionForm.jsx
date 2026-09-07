import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import BoxDimensionService
    from "../../services/BoxDimensionService";

import "./BoxDimension.css";


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
   FORMAT BOX TYPE
========================================================= */

const formatBoxType = (
    value
) => {

    if (!value) {
        return "";
    }

    return value
        .replaceAll(
            "_",
            " "
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim();

};


/* =========================================================
   COMPONENT
========================================================= */

const BoxDimensionForm = () => {

    const navigate =
        useNavigate();

    const { id } =
        useParams();

    const isEdit =
        Boolean(id);


    /* =====================================================
       STATE
    ===================================================== */

    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        preview,
        setPreview
    ] = useState("");


    const [
        imageFile,
        setImageFile
    ] = useState(null);


    const [
        customBoxType,
        setCustomBoxType
    ] = useState(false);


    const [
        box,
        setBox
    ] = useState({

        boxType: "",

        boxImage: "",

        height: "",

        width: "",

        labelHeight: "",

        labelWidth: "",

        necksealHeight: "",

        necksealWidth: "",

        circumference: "",

        capHeight: "",

        capCircumference: "",

        description: ""

    });


    /* =====================================================
       LOAD EXISTING BOX
    ===================================================== */

    useEffect(() => {

        if (isEdit) {

            loadBox();

        }

    }, [id]);


    const loadBox =
        async () => {

            try {

                const data =
                    await BoxDimensionService
                        .getBoxById(id);


                setBox({

                    ...data,

                    labelHeight:
                        data.labelHeight ?? "",

                    labelWidth:
                        data.labelWidth ?? "",

                    necksealHeight:
                        data.necksealHeight ?? "",

                    necksealWidth:
                        data.necksealWidth ?? ""

                });


                if (
                    data.boxType &&
                    !BOX_TYPES.includes(
                        data.boxType
                    )
                ) {

                    setCustomBoxType(
                        true
                    );

                }


                if (
                    data.boxImage
                ) {

                    setPreview(
                        data.boxImage.startsWith(
                            "http"
                        )
                            ? data.boxImage
                            : `http://localhost:8080${data.boxImage}`
                    );

                }

            }

            catch (error) {

                console.error(
                    "Failed to load box:",
                    error
                );

            }

        };


    /* =====================================================
       NORMAL INPUT CHANGE
    ===================================================== */

    const handleChange =
        event => {

            const {
                name,
                value
            } = event.target;


            setBox(
                previous => ({

                    ...previous,

                    [name]:
                        value

                })
            );

        };


    /* =====================================================
       BOX TYPE CHANGE
    ===================================================== */

    const handleBoxTypeChange =
        event => {

            const value =
                event.target.value;


            if (
                value === "__CUSTOM__"
            ) {

                setCustomBoxType(
                    true
                );


                setBox(
                    previous => ({

                        ...previous,

                        boxType: ""

                    })
                );


                return;

            }


            setCustomBoxType(
                false
            );


            setBox(
                previous => ({

                    ...previous,

                    boxType:
                        value

                })
            );

        };


    /* =====================================================
       IMAGE
    ===================================================== */

    const handleImage =
        event => {

            const file =
                event.target.files[0];


            if (!file) {
                return;
            }


            setImageFile(
                file
            );


            setPreview(
                URL.createObjectURL(
                    file
                )
            );

        };


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit =
        async event => {

            event.preventDefault();


            if (loading) {
                return;
            }


            if (
                !box.boxType ||
                !box.boxType.trim()
            ) {

                alert(
                    "Please select or enter Box Type."
                );

                return;

            }


            setLoading(true);


            try {

                const payload = {

                    ...box,

                    boxType:
                        box.boxType.trim(),

                    height:
                        box.height === ""
                            ? null
                            : Number(
                                box.height
                            ),

                    width:
                        box.width === ""
                            ? null
                            : Number(
                                box.width
                            ),

                    labelHeight:
                        box.labelHeight === ""
                            ? null
                            : Number(
                                box.labelHeight
                            ),

                    labelWidth:
                        box.labelWidth === ""
                            ? null
                            : Number(
                                box.labelWidth
                            ),

                    necksealHeight:
                        box.necksealHeight === ""
                            ? null
                            : Number(
                                box.necksealHeight
                            ),

                    necksealWidth:
                        box.necksealWidth === ""
                            ? null
                            : Number(
                                box.necksealWidth
                            ),

                    circumference:
                        box.circumference === ""
                            ? null
                            : Number(
                                box.circumference
                            ),

                    capHeight:
                        box.capHeight === ""
                            ? null
                            : Number(
                                box.capHeight
                            ),

                    capCircumference:
                        box.capCircumference === ""
                            ? null
                            : Number(
                                box.capCircumference
                            )

                };


                if (isEdit) {

                    await BoxDimensionService
                        .updateBox(
                            id,
                            payload,
                            imageFile
                        );

                }

                else {

                    await BoxDimensionService
                        .createBox(
                            payload,
                            imageFile
                        );

                }


                navigate(
                    "/box-dimensions"
                );

            }

            catch (error) {

                console.error(
                    "Box dimension save failed:",
                    error
                );


                alert(
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Unable to save box dimension."
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

        <div className="box-form-container">


            <h2>

                {
                    isEdit
                        ? "Update Box Dimension"
                        : "Add New Box"
                }

            </h2>


            <form
                onSubmit={
                    handleSubmit
                }
            >

                <div className="form-grid">


                    {/* IMAGE */}

                    <div className="image-upload">

                        {
                            preview && (

                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="preview-image"
                                />

                            )
                        }


                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={
                                handleImage
                            }
                            disabled={loading}
                        />

                    </div>


                    {/* BOX TYPE */}

                    <div>

                        <label>
                            Box Type
                        </label>


                        {
                            customBoxType

                                ?

                                (

                                    <>

                                        <select
                                            value="__CUSTOM__"
                                            onChange={
                                                handleBoxTypeChange
                                            }
                                            disabled={loading}
                                        >

                                            <option value="__CUSTOM__">
                                                Other / Custom
                                            </option>


                                            {
                                                BOX_TYPES.map(
                                                    boxType => (

                                                        <option
                                                            key={boxType}
                                                            value={boxType}
                                                        >

                                                            {
                                                                formatBoxType(
                                                                    boxType
                                                                )
                                                            }

                                                        </option>

                                                    )
                                                )
                                            }

                                        </select>


                                        <input
                                            type="text"
                                            name="boxType"
                                            value={
                                                box.boxType
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter custom box type"
                                            required
                                            disabled={loading}
                                            style={{
                                                marginTop:
                                                    "10px"
                                            }}
                                        />

                                    </>

                                )

                                :

                                (

                                    <select
                                        value={
                                            box.boxType
                                        }
                                        onChange={
                                            handleBoxTypeChange
                                        }
                                        required
                                        disabled={loading}
                                    >

                                        <option value="">
                                            Select Box Type
                                        </option>


                                        {
                                            BOX_TYPES.map(
                                                boxType => (

                                                    <option
                                                        key={boxType}
                                                        value={boxType}
                                                    >

                                                        {
                                                            formatBoxType(
                                                                boxType
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

                                )
                        }

                    </div>


                    {/* HEIGHT */}

                    <div>

                        <label>
                            Height
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="height"
                            value={
                                box.height ?? ""
                            }
                            onChange={
                                handleChange
                            }
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* WIDTH */}

                    <div>

                        <label>
                            Width
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="width"
                            value={
                                box.width ?? ""
                            }
                            onChange={
                                handleChange
                            }
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* LABEL HEIGHT */}

                    <div>

                        <label>
                            Label Height
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="labelHeight"
                            value={
                                box.labelHeight ?? ""
                            }
                            onChange={
                                handleChange
                            }
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* LABEL WIDTH */}

                    <div>

                        <label>
                            Label Width
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="labelWidth"
                            value={
                                box.labelWidth ?? ""
                            }
                            onChange={
                                handleChange
                            }
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* NECKSEAL HEIGHT */}

                    <div>

                        <label>
                            Neckseal Height
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="necksealHeight"
                            value={
                                box.necksealHeight ?? ""
                            }
                            onChange={
                                handleChange
                            }
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* NECKSEAL WIDTH */}

                    <div>

                        <label>
                            Neckseal Width
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="necksealWidth"
                            value={
                                box.necksealWidth ?? ""
                            }
                            onChange={
                                handleChange
                            }
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* CIRCUMFERENCE */}

                    <div>

                        <label>
                            Circumference
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="circumference"
                            value={
                                box.circumference ?? ""
                            }
                            onChange={
                                handleChange
                            }
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* CAP HEIGHT */}

                    <div>

                        <label>
                            Cap Height
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="capHeight"
                            value={
                                box.capHeight ?? ""
                            }
                            onChange={
                                handleChange
                            }
                            disabled={loading}
                        />

                    </div>


                    {/* CAP CIRCUMFERENCE */}

                    <div>

                        <label>
                            Cap Circumference
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="capCircumference"
                            value={
                                box.capCircumference ?? ""
                            }
                            onChange={
                                handleChange
                            }
                            disabled={loading}
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="full-width">

                        <label>
                            Description
                        </label>


                        <textarea
                            name="description"
                            rows="4"
                            value={
                                box.description ?? ""
                            }
                            onChange={
                                handleChange
                            }
                            disabled={loading}
                        />

                    </div>

                </div>


                {/* ACTIONS */}

                <div className="form-actions">

                    <button
                        type="submit"
                        className="save-btn"
                        disabled={loading}
                    >

                        {
                            loading

                                ? "Saving..."

                                : isEdit

                                    ? "Update Box"

                                    : "Save Box"
                        }

                    </button>


                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() =>
                            navigate(
                                "/box-dimensions"
                            )
                        }
                        disabled={loading}
                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

};


export default BoxDimensionForm;