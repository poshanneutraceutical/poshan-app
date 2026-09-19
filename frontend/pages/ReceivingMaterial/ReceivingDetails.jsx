import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    ArrowLeft,
    User,
    FileText,
    Calendar,
    Image,
    Package
} from "lucide-react";

import {
    Link,
    useParams
} from "react-router-dom";

import ReceivingMaterialService
    from "../../services/ReceivingMaterialService";


const ReceivingDetails = () => {


    const {
        id
    } = useParams();


    const [
        receiving,
        setReceiving
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    /*
     =========================================================
     LOAD RECEIVING MATERIAL
     =========================================================
     */

    useEffect(() => {

        loadReceiving();

    }, [id]);


    const loadReceiving = async () => {

        try {

            setLoading(true);


            const data =
                await ReceivingMaterialService
                    .getMaterialById(id);


            setReceiving(
                data
            );

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


    /*
     =========================================================
     IMAGE URL
     =========================================================

     Stored backend image examples:

         /uploads/receiving-material/abc.jpg

     Production:
         https://erp.nutriposhannutraceutical.com/uploads/...

     Local:
         http://localhost:8086/uploads/...
     =========================================================
     */

    const getImageUrl = (
        imagePath
    ) => {

        if (!imagePath) {

            return "";

        }


        const path =
            String(
                imagePath
            ).trim();


        if (!path) {

            return "";

        }


        /*
         * Already a complete URL.
         */

        if (
            path.startsWith("http://") ||
            path.startsWith("https://") ||
            path.startsWith("data:")
        ) {

            return path;

        }


        /*
         * Make sure the stored path starts
         * with a slash.
         */

        const normalizedPath =
            path.startsWith("/")
                ? path
                : `/${path}`;


        /*
         * Local development.
         */

        const isLocal =
            window.location.hostname ===
                "localhost"
            ||
            window.location.hostname ===
                "127.0.0.1";


        if (
            isLocal
        ) {

            return `http://localhost:8086${normalizedPath}`;

        }


        /*
         * Production.

         * Nginx serves /uploads directly from
         * the production server.
         */

        return normalizedPath;

    };


    /*
     =========================================================
     BUILD IMAGE LIST
     =========================================================

     Current backend:
         materialPhotos = []

     Old records / old backend:
         billImage = "..."

     Support both.
     =========================================================
     */

    const imageList =
        useMemo(() => {

            const photos =
                Array.isArray(
                    receiving?.materialPhotos
                )
                    ? receiving.materialPhotos
                    : [];


            const normalizedPhotos =
                photos
                    .filter(
                        photo =>
                            photo !== null &&
                            photo !== undefined &&
                            String(photo).trim() !== ""
                    )
                    .map(
                        photo =>
                            String(photo)
                    );


            /*
             * Legacy billImage compatibility.
             */

            if (
                receiving?.billImage
                    &&
                normalizedPhotos.length === 0
            ) {

                return [
                    String(
                        receiving.billImage
                    )
                ];

            }


            return normalizedPhotos;

        }, [
            receiving
        ]);


    /*
     =========================================================
     LOADING
     =========================================================
     */

    if (
        loading
    ) {

        return (

            <div className="loading">

                Loading Receiving Material...

            </div>

        );

    }


    /*
     =========================================================
     NOT FOUND
     =========================================================
     */

    if (
        !receiving
    ) {

        return (

            <div className="loading">

                Receiving Material Not Found

            </div>

        );

    }


    /*
     =========================================================
     PAGE
     =========================================================
     */

    return (

        <div className="receiving-details-container">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="details-header">

                <div>

                    <h2>

                        Receiving Material Details

                    </h2>


                    <p>

                        Bill Number :{" "}

                        {
                            receiving.billNumber ||
                            "-"
                        }

                    </p>

                </div>


                <Link
                    to="/procurement/receiving-material"
                    className="back-btn"
                >

                    <ArrowLeft
                        size={18}
                    />

                    Back

                </Link>

            </div>


            {/* =================================================
                BASIC DETAILS
            ================================================= */}

            <div className="details-card">

                <table
                    className="details-table"
                >

                    <tbody>


                        {/* SUPPLIER */}

                        <tr>

                            <td>

                                <User
                                    size={16}
                                />

                                Supplier Name

                            </td>

                            <td>

                                {
                                    receiving.supplierName ||
                                    "-"
                                }

                            </td>

                        </tr>


                        {/* RECEIVER */}

                        <tr>

                            <td>

                                <User
                                    size={16}
                                />

                                Receiver Name

                            </td>

                            <td>

                                {
                                    receiving.receiverName ||
                                    "-"
                                }

                            </td>

                        </tr>


                        {/* BILL NUMBER */}

                        <tr>

                            <td>

                                <FileText
                                    size={16}
                                />

                                Bill Number

                            </td>

                            <td>

                                {
                                    receiving.billNumber ||
                                    "-"
                                }

                            </td>

                        </tr>


                        {/* RECEIVED DATE */}

                        <tr>

                            <td>

                                <Calendar
                                    size={16}
                                />

                                Received Date

                            </td>

                            <td>

                                {

                                    receiving.receivedDate

                                        ?

                                        new Date(
                                            receiving.receivedDate
                                        ).toLocaleString()

                                        :

                                        "-"

                                }

                            </td>

                        </tr>


                        {/* REMARKS */}

                        <tr>

                            <td>

                                Remarks

                            </td>

                            <td>

                                {
                                    receiving.remarks ||
                                    "-"
                                }

                            </td>

                        </tr>


                    </tbody>

                </table>

            </div>


            {/* =================================================
                BILL / MATERIAL IMAGES
            ================================================= */}

            <div className="details-card">

                <h3>

                    Bill Image

                </h3>


                {

                    imageList.length > 0

                        ?

                        (

                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "16px",
                                    marginTop: "15px"
                                }}
                            >

                                {

                                    imageList.map(
                                        (
                                            imagePath,
                                            index
                                        ) => (

                                            <div
                                                key={
                                                    `${imagePath}-${index}`
                                                }
                                                style={{
                                                    width: "220px",
                                                    maxWidth: "100%"
                                                }}
                                            >

                                                <a
                                                    href={
                                                        getImageUrl(
                                                            imagePath
                                                        )
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >

                                                    <img
                                                        src={
                                                            getImageUrl(
                                                                imagePath
                                                            )
                                                        }
                                                        alt={
                                                            `Receiving material ${index + 1}`
                                                        }
                                                        className="bill-image"
                                                        style={{
                                                            width: "100%",
                                                            height: "220px",
                                                            objectFit: "contain",
                                                            borderRadius: "10px",
                                                            border: "1px solid #ddd",
                                                            background: "#f7f7f7",
                                                            display: "block"
                                                        }}
                                                        onError={
                                                            event => {

                                                                console.error(
                                                                    "Failed to load receiving material image:",
                                                                    imagePath
                                                                );

                                                                event.currentTarget.style.display =
                                                                    "none";

                                                            }
                                                        }
                                                    />

                                                </a>


                                                <div
                                                    style={{
                                                        marginTop: "8px",
                                                        fontSize: "12px",
                                                        color: "#666",
                                                        wordBreak: "break-word"
                                                    }}
                                                >

                                                    {
                                                        `Image ${index + 1}`
                                                    }

                                                </div>

                                            </div>

                                        )
                                    )

                                }

                            </div>

                        )

                        :

                        (

                            <div className="no-image">

                                <Image
                                    size={60}
                                />


                                <p>

                                    No Bill Image

                                </p>

                            </div>

                        )

                }

            </div>


            {/* =================================================
                RECEIVED ITEMS
            ================================================= */}

            <div className="details-card">

                <h3>

                    Received Items

                </h3>


                <table
                    className="receiving-table"
                >

                    <thead>

                        <tr>

                            <th>

                                Box Type

                            </th>

                            <th>

                                Quantity

                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {

                            Array.isArray(
                                receiving.receivingMaterialItems
                            )
                            &&
                            receiving
                                .receivingMaterialItems
                                .length > 0

                                ?

                                (

                                    receiving
                                        .receivingMaterialItems
                                        .map(
                                            item => (

                                                <tr
                                                    key={
                                                        item.id
                                                    }
                                                >

                                                    <td>

                                                        <Package
                                                            size={16}
                                                        />

                                                        {" "}

                                                        {
                                                            item.boxType ||
                                                            "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            item.materialQuantity ??
                                                            "-"
                                                        }

                                                    </td>

                                                </tr>

                                            )
                                        )

                                )

                                :

                                (

                                    <tr>

                                        <td
                                            colSpan="2"
                                        >

                                            No Items Found

                                        </td>

                                    </tr>

                                )

                        }

                    </tbody>

                </table>

            </div>


        </div>

    );

};


export default ReceivingDetails;