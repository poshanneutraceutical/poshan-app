import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    User,
    FileText,
    Calendar,
    Image,
    Package
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import ReceivingMaterialService from "../../services/ReceivingMaterialService";

const ReceivingDetails = () => {

    const { id } = useParams();

    const [receiving, setReceiving] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadReceiving();

    }, [id]);

    const loadReceiving = async () => {

        try {

            setLoading(true);

            const data =
                await ReceivingMaterialService.getMaterialById(id);

            setReceiving(data);

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

    if (loading) {

        return (

            <div className="loading">

                Loading Receiving Material...

            </div>

        );

    }

    if (!receiving) {

        return (

            <div className="loading">

                Receiving Material Not Found

            </div>

        );

    }

    return (

        <div className="receiving-details-container">

            <div className="details-header">

                <div>

                    <h2>

                        Receiving Material Details

                    </h2>

                    <p>

                        Bill Number : {receiving.billNumber}

                    </p>

                </div>

                <Link
                    to="/procurement/receiving-material"
                    className="back-btn"
                >

                    <ArrowLeft size={18} />

                    Back

                </Link>

            </div>

            <div className="details-card">

                <table className="details-table">

                    <tbody>

                        <tr>

                            <td>

                                <User size={16} />

                                Supplier Name

                            </td>

                            <td>

                                {receiving.supplierName}

                            </td>

                        </tr>

                        <tr>

                            <td>

                                <User size={16} />

                                Receiver Name

                            </td>

                            <td>

                                {receiving.receiverName}

                            </td>

                        </tr>

                        <tr>

                            <td>

                                <FileText size={16} />

                                Bill Number

                            </td>

                            <td>

                                {receiving.billNumber}

                            </td>

                        </tr>

                        <tr>

                            <td>

                                <Calendar size={16} />

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

                        <tr>

                            <td>

                                Remarks

                            </td>

                            <td>

                                {receiving.remarks || "-"}

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            <div className="details-card">

                <h3>

                    Bill Image

                </h3>

                {

                    receiving.billImage

                        ?

                        (

                            <img
                                src={receiving.billImage}
                                alt="Bill"
                                className="bill-image"
                            />

                        )

                        :

                        (

                            <div className="no-image">

                                <Image size={60} />

                                <p>

                                    No Bill Image

                                </p>

                            </div>

                        )

                }

            </div>

            <div className="details-card">

                <h3>

                    Received Items

                </h3>

                <table className="receiving-table">

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

                            receiving.receivingMaterialItems.length > 0

                                ?

                                (

                                    receiving.receivingMaterialItems.map(item => (

                                        <tr key={item.id}>

                                            <td>

                                                <Package
                                                    size={16}
                                                />

                                                {" "}

                                                {item.boxType}

                                            </td>

                                            <td>

                                                {item.materialQuantity}

                                            </td>

                                        </tr>

                                    ))

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