import React, {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    Truck,
    Building2,
    Package,
    Calendar,
    ClipboardCheck,
    FileText,
    Layers
} from "lucide-react";

import {
    Link,
    useParams
} from "react-router-dom";

import deliveryService
    from "../../services/deliveryService";


const DeliveryDetails = () => {

    const { id } =
        useParams();


    const [
        delivery,
        setDelivery
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    useEffect(() => {

        loadDelivery();

    }, [id]);


    const loadDelivery =
        async () => {

            try {

                setLoading(true);


                const data =
                    await deliveryService
                        .getById(id);


                setDelivery(data);

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


    const formatText =
        (value) => {

            if (!value) {
                return "-";
            }


            return String(
                value
            )
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


    if (loading) {

        return (

            <div className="loading">
                Loading Delivery...
            </div>

        );

    }


    if (!delivery) {

        return (

            <div className="loading">
                Delivery Not Found
            </div>

        );

    }


    const inventoryItem =
        delivery.materialName ||
        delivery.customBoxType ||
        formatText(
            delivery.boxType
        );


    return (

        <div className="delivery-details-container">

            <div className="details-header">

                <div>

                    <h2>
                        Delivery Details
                    </h2>

                    <p>

                        {
                            delivery.companyName ||
                            `Company #${delivery.companyId}`
                        }

                    </p>

                </div>


                <Link
                    to={
                        `/sales/delivery/company/${delivery.companyId}`
                    }
                    className="back-btn"
                >

                    <ArrowLeft
                        size={18}
                    />

                    Back

                </Link>

            </div>


            <div className="delivery-card">

                <table className="details-table">

                    <tbody>

                        <tr>

                            <td>
                                <Building2
                                    size={16}
                                />

                                Company
                            </td>

                            <td>
                                {
                                    delivery.companyName ||
                                    "-"
                                }
                            </td>

                        </tr>


                        <tr>

                            <td>

                                <Building2
                                    size={16}
                                />

                                Company ID

                            </td>

                            <td>
                                {
                                    delivery.companyId
                                }
                            </td>

                        </tr>


                        <tr>

                            <td>

                                <Layers
                                    size={16}
                                />

                                Inventory Type

                            </td>

                            <td>

                                {
                                    formatText(
                                        delivery.categoryName
                                    )
                                }

                            </td>

                        </tr>


                        <tr>

                            <td>

                                <Package
                                    size={16}
                                />

                                Inventory Item

                            </td>

                            <td>

                                {
                                    inventoryItem
                                }

                            </td>

                        </tr>


                        <tr>

                            <td>

                                <Package
                                    size={16}
                                />

                                Product Name

                            </td>

                            <td>

                                {
                                    delivery.productName ||
                                    "-"
                                }

                            </td>

                        </tr>


                        {
                            delivery.boxType && (

                                <tr>

                                    <td>

                                        <Package
                                            size={16}
                                        />

                                        Box Type

                                    </td>

                                    <td>

                                        {
                                            formatText(
                                                delivery.boxType
                                            )
                                        }

                                    </td>

                                </tr>

                            )
                        }


                        {
                            delivery.customBoxType && (

                                <tr>

                                    <td>

                                        <Package
                                            size={16}
                                        />

                                        Custom Box Type

                                    </td>

                                    <td>

                                        {
                                            delivery.customBoxType
                                        }

                                    </td>

                                </tr>

                            )
                        }


                        <tr>

                            <td>

                                <Truck
                                    size={16}
                                />

                                Delivered Quantity

                            </td>

                            <td>

                                {
                                    delivery.deliveredQuantity ??
                                    "-"
                                }

                            </td>

                        </tr>


                        <tr>

                            <td>

                                <ClipboardCheck
                                    size={16}
                                />

                                Delivery Status

                            </td>

                            <td>

                                <span
                                    className={
                                        `status-badge status-${
                                            (
                                                delivery.deliveryStatus ||
                                                ""
                                            ).toLowerCase()
                                        }`
                                    }
                                >

                                    {
                                        formatText(
                                            delivery.deliveryStatus
                                        )
                                    }

                                </span>

                            </td>

                        </tr>


                        <tr>

                            <td>

                                <Truck
                                    size={16}
                                />

                                Delivery Medium

                            </td>

                            <td>

                                {
                                    delivery.deliveryMedium ||
                                    "-"
                                }

                            </td>

                        </tr>


                        <tr>

                            <td>

                                <Calendar
                                    size={16}
                                />

                                Delivery Date

                            </td>

                            <td>

                                {
                                    delivery.deliveryDate

                                        ? new Date(
                                            delivery.deliveryDate
                                        ).toLocaleString()

                                        : "-"
                                }

                            </td>

                        </tr>


                        <tr>

                            <td>

                                <Calendar
                                    size={16}
                                />

                                Created At

                            </td>

                            <td>

                                {
                                    delivery.createdAt

                                        ? new Date(
                                            delivery.createdAt
                                        ).toLocaleString()

                                        : "-"
                                }

                            </td>

                        </tr>


                        <tr>

                            <td>

                                <FileText
                                    size={16}
                                />

                                Remarks

                            </td>

                            <td>

                                {
                                    delivery.remarks ||
                                    "-"
                                }

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );

};


export default DeliveryDetails;