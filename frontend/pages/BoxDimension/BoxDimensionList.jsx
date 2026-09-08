import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import BoxDimensionService
    from "../../services/BoxDimensionService";

import "./BoxDimension.css";


const BoxDimensionList = () => {

    const navigate =
        useNavigate();


    const [
        boxes,
        setBoxes
    ] = useState([]);


    const [
        filteredBoxes,
        setFilteredBoxes
    ] = useState([]);


    const [
        search,
        setSearch
    ] = useState("");


    const [
        loading,
        setLoading
    ] = useState(true);


    /* =====================================================
       LOAD
    ===================================================== */

    useEffect(() => {

        loadBoxes();

    }, []);


    /* =====================================================
       FILTER
    ===================================================== */

    useEffect(() => {

        const query =
            search
                .trim()
                .toLowerCase();


        const filtered =
            boxes.filter(
                box =>

                    box.boxType
                        ?.toLowerCase()
                        .includes(
                            query
                        )

                    ||

                    box.boxCode
                        ?.toLowerCase()
                        .includes(
                            query
                        )
            );


        setFilteredBoxes(
            filtered
        );

    }, [
        search,
        boxes
    ]);


    /* =====================================================
       GET BOXES
    ===================================================== */

    const loadBoxes =
        async () => {

            try {

                setLoading(true);


                const data =
                    await BoxDimensionService
                        .getAllBoxes();


                const safeData =
                    Array.isArray(data)
                        ? data
                        : [];


                setBoxes(
                    safeData
                );


                setFilteredBoxes(
                    safeData
                );

            }

            catch (error) {

                console.error(
                    "Failed to load box dimensions",
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
        async id => {

            const confirmDelete =
                window.confirm(
                    "Delete this Box Dimension?"
                );


            if (!confirmDelete) {
                return;
            }


            try {

                await BoxDimensionService
                    .deleteBox(id);


                await loadBoxes();

            }

            catch (error) {

                console.error(
                    "Delete failed",
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

            <div className="box-list-container">

                <div className="empty-state">

                    Loading...

                </div>

            </div>

        );

    }


    return (

        <div className="box-list-container">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="box-header">

                <div>

                    <h2>
                        Box Dimensions
                    </h2>

                    <p>
                        Manage box and label dimensions
                    </p>

                </div>


                <button
                    className="add-btn"
                    onClick={() =>
                        navigate(
                            "/box-dimensions/add"
                        )
                    }
                >

                    + Add New Box

                </button>

            </div>


            {/* =================================================
                SEARCH
            ================================================= */}

            <input
                type="text"
                className="search-box"
                placeholder="Search Box..."
                value={
                    search
                }
                onChange={
                    event =>
                        setSearch(
                            event.target.value
                        )
                }
            />


            {/* =================================================
                TABLE
            ================================================= */}

            <table className="box-table">

                <thead>

                    <tr>

                        <th>
                            Image
                        </th>

                        <th>
                            Box Code
                        </th>

                        <th>
                            Box Type
                        </th>

                        <th>
                            Height
                        </th>

                        <th>
                            Width
                        </th>

                        <th>
                            Label Height
                        </th>

                        <th>
                            Label Width
                        </th>

                        <th>
                            Neckseal Height
                        </th>

                        <th>
                            Neckseal Width
                        </th>

                        <th>
                            Circumference
                        </th>

                        <th>
                            Cap Height
                        </th>

                        <th>
                            Cap Circumference
                        </th>

                        <th>
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {
                        filteredBoxes.length > 0

                            ?

                            filteredBoxes.map(
                                box => (

                                    <tr
                                        key={
                                            box.id
                                        }
                                    >

                                        {/* IMAGE */}

                                        <td>

                                            {
                                                box.boxImage

                                                    ?

                                                    <img
                                                        src={
                                                            getImageUrl(
                                                                box.boxImage
                                                            )
                                                        }
                                                        alt={
                                                            box.boxType
                                                        }
                                                        className="box-thumbnail"
                                                    />

                                                    :

                                                    "No Image"
                                            }

                                        </td>


                                        {/* BOX CODE */}

                                        <td>
                                            {
                                                box.boxCode
                                            }
                                        </td>


                                        {/* BOX TYPE */}

                                        <td>
                                            {
                                                box.boxType
                                            }
                                        </td>


                                        {/* HEIGHT */}

                                        <td>
                                            {
                                                box.height ??
                                                "-"
                                            }
                                        </td>


                                        {/* WIDTH */}

                                        <td>
                                            {
                                                box.width ??
                                                "-"
                                            }
                                        </td>


                                        {/* LABEL HEIGHT */}

                                        <td>
                                            {
                                                box.labelHeight ??
                                                "-"
                                            }
                                        </td>


                                        {/* LABEL WIDTH */}

                                        <td>
                                            {
                                                box.labelWidth ??
                                                "-"
                                            }
                                        </td>


                                        {/* NECKSEAL HEIGHT */}

                                        <td>
                                            {
                                                box.necksealHeight ??
                                                "-"
                                            }
                                        </td>


                                        {/* NECKSEAL WIDTH */}

                                        <td>
                                            {
                                                box.necksealWidth ??
                                                "-"
                                            }
                                        </td>


                                        {/* CIRCUMFERENCE */}

                                        <td>
                                            {
                                                box.circumference ??
                                                "-"
                                            }
                                        </td>


                                        {/* CAP HEIGHT */}

                                        <td>
                                            {
                                                box.capHeight ??
                                                "-"
                                            }
                                        </td>


                                        {/* CAP CIRCUMFERENCE */}

                                        <td>
                                            {
                                                box.capCircumference ??
                                                "-"
                                            }
                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <button
                                                className="view-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/box-dimensions/${box.id}`
                                                    )
                                                }
                                            >

                                                View

                                            </button>


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


                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteBox(
                                                        box.id
                                                    )
                                                }
                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                )
                            )

                            :

                            (

                                <tr>

                                    <td
                                        colSpan="13"
                                        className="empty-state"
                                    >

                                        No Box Dimensions Found

                                    </td>

                                </tr>

                            )
                    }

                </tbody>

            </table>

        </div>

    );

};


export default BoxDimensionList;