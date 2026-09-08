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


const BoxDimensionDetails = () => {

    const {
        id
    } = useParams();


    const navigate =
        useNavigate();


    const [
        box,
        setBox
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    /* =====================================================
       LOAD
    ===================================================== */

    useEffect(() => {

        loadBox();

    }, [id]);


    const loadBox =
        async () => {

            try {

                const data =
                    await BoxDimensionService
                        .getBoxById(id);


                setBox(
                    data
                );

            }

            catch (error) {

                console.error(
                    error
                );

            }

            finally {

                setLoading(false);

            }

        };


    /* =====================================================
       DELETE
    ===================================================== */

    const deleteBox =
        async () => {

            const confirmDelete =
                window.confirm(
                    "Are you sure you want to delete this Box Dimension?"
                );


            if (!confirmDelete) {
                return;
            }


            try {

                await BoxDimensionService
                    .deleteBox(id);


                navigate(
                    "/box-dimensions"
                );

            }

            catch (error) {

                console.error(
                    error
                );

            }

        };


    /* =====================================================
       IMAGE URL
    ===================================================== */

    const getImageUrl =
        imagePath => {

            if (!imagePath) {
                return "";
            }


            if (
                imagePath.startsWith(
                    "http"
                )
            ) {

                return imagePath;

            }


            return imagePath;

        };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (
            <h3>
                Loading...
            </h3>
        );

    }


    if (!box) {

        return (
            <h3>
                Box Dimension Not Found.
            </h3>
        );

    }


    return (

        <div className="box-details-container">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="details-header">

                <h2>
                    Box Dimension Details
                </h2>


                <button
                    className="edit-btn"
                    onClick={() =>
                        navigate(
                            `/box-dimensions/edit/${box.id}`
                        )
                    }
                >

                    Edit

                </button>

            </div>


            <div className="details-card">


                {/* =================================================
                    IMAGE
                ================================================= */}

                {
                    box.boxImage && (

                        <div className="image-section">

                            <img
                                src={
                                    getImageUrl(
                                        box.boxImage
                                    )
                                }
                                alt={
                                    box.boxType
                                }
                                className="details-image"
                            />

                        </div>

                    )
                }


                {/* =================================================
                    BASIC INFORMATION
                ================================================= */}

                <div className="detail-row">

                    <strong>
                        Box Code
                    </strong>

                    <span>
                        {
                            box.boxCode
                        }
                    </span>

                </div>


                <div className="detail-row">

                    <strong>
                        Box Type
                    </strong>

                    <span>
                        {
                            box.boxType
                        }
                    </span>

                </div>


                {/* =================================================
                    MAIN DIMENSIONS
                ================================================= */}

                <div className="detail-row">

                    <strong>
                        Height
                    </strong>

                    <span>
                        {
                            box.height ??
                            "-"
                        }
                    </span>

                </div>


                <div className="detail-row">

                    <strong>
                        Width
                    </strong>

                    <span>
                        {
                            box.width ??
                            "-"
                        }
                    </span>

                </div>


                {/* =================================================
                    LABEL DIMENSIONS
                ================================================= */}

                <div className="detail-row">

                    <strong>
                        Label Height
                    </strong>

                    <span>
                        {
                            box.labelHeight ??
                            "-"
                        }
                    </span>

                </div>


                <div className="detail-row">

                    <strong>
                        Label Width
                    </strong>

                    <span>
                        {
                            box.labelWidth ??
                            "-"
                        }
                    </span>

                </div>


                {/* =================================================
                    NECKSEAL DIMENSIONS
                ================================================= */}

                <div className="detail-row">

                    <strong>
                        Neckseal Height
                    </strong>

                    <span>
                        {
                            box.necksealHeight ??
                            "-"
                        }
                    </span>

                </div>


                <div className="detail-row">

                    <strong>
                        Neckseal Width
                    </strong>

                    <span>
                        {
                            box.necksealWidth ??
                            "-"
                        }
                    </span>

                </div>


                {/* =================================================
                    OTHER DIMENSIONS
                ================================================= */}

                <div className="detail-row">

                    <strong>
                        Circumference
                    </strong>

                    <span>
                        {
                            box.circumference ??
                            "-"
                        }
                    </span>

                </div>


                <div className="detail-row">

                    <strong>
                        Cap Height
                    </strong>

                    <span>
                        {
                            box.capHeight ??
                            "-"
                        }
                    </span>

                </div>


                <div className="detail-row">

                    <strong>
                        Cap Circumference
                    </strong>

                    <span>
                        {
                            box.capCircumference ??
                            "-"
                        }
                    </span>

                </div>


                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <div className="detail-row">

                    <strong>
                        Description
                    </strong>

                    <span>
                        {
                            box.description ||
                            "-"
                        }
                    </span>

                </div>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="details-actions">

                    <button
                        className="delete-btn"
                        onClick={
                            deleteBox
                        }
                    >

                        Delete

                    </button>


                    <button
                        className="cancel-btn"
                        onClick={() =>
                            navigate(
                                "/box-dimensions"
                            )
                        }
                    >

                        Back

                    </button>

                </div>

            </div>

        </div>

    );

};


export default BoxDimensionDetails;