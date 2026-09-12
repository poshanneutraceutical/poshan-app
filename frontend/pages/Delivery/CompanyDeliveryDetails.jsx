import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    ArrowLeft,
    Plus,
    Pencil,
    Trash2,
    Package,
    Calendar,
    Truck,
    Building2,
    Layers
} from "lucide-react";

import {
    Link,
    useParams
} from "react-router-dom";

import deliveryService
    from "../../services/DeliveryService";


const CompanyDeliveryDetails = () => {

    const { companyId } =
        useParams();


    const [
        deliveries,
        setDeliveries
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const loadDeliveries =
        async () => {

            try {

                setLoading(true);


                const data =
                    await deliveryService
                        .getByCompany(
                            companyId
                        );


                setDeliveries(
                    Array.isArray(data)
                        ? data
                        : []
                );

            }
            catch (error) {

                console.error(
                    "Failed to load company deliveries",
                    error
                );


                setDeliveries([]);

            }
            finally {

                setLoading(false);

            }

        };


    useEffect(() => {

        loadDeliveries();

    }, [companyId]);


    const companyName =
        useMemo(
            () => {

                return (
                    deliveries[0]?.companyName ||
                    `Company #${companyId}`
                );

            },
            [
                deliveries,
                companyId
            ]
        );


    const latestDelivery =
        deliveries[0];


    const handleDelete =
        async (id) => {

            if (
                !window.confirm(
                    "Delete this delivery?"
                )
            ) {

                return;

            }


            try {

                await deliveryService.delete(
                    id
                );


                await loadDeliveries();

            }
            catch (error) {

                console.error(
                    "Delete delivery failed",
                    error
                );


                alert(
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Unable to delete delivery."
                );

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


    const getInventoryItem =
        (delivery) => {

            if (
                delivery.materialName
            ) {

                return delivery.materialName;
            }


            if (
                delivery.customBoxType
            ) {

                return delivery.customBoxType;
            }


            if (
                delivery.boxType
            ) {

                return formatText(
                    delivery.boxType
                );
            }


            return "-";
        };


    return (

        <div className="delivery-company-container">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="delivery-form-header">

                <div>

                    <h2>
                        {companyName}
                    </h2>

                    <p>
                        Company ID: {companyId}
                    </p>

                </div>


                <div className="company-detail-actions">

                    <Link
                        to="/sales/delivery"
                        className="back-btn"
                    >

                        <ArrowLeft
                            size={18}
                        />

                        Back

                    </Link>


                    <Link
                        to={
                            `/sales/delivery/add?companyId=${companyId}${
                                latestDelivery
                                    ? `&templateId=${latestDelivery.id}`
                                    : ""
                            }`
                        }
                        className="add-btn"
                    >

                        <Plus
                            size={18}
                        />

                        New Delivery

                    </Link>

                </div>

            </div>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <div className="delivery-company-summary">

                <div className="summary-item">

                    <Building2
                        size={19}
                    />

                    <div>

                        <span>
                            Company
                        </span>

                        <strong>
                            {companyName}
                        </strong>

                    </div>

                </div>


                <div className="summary-item">

                    <Package
                        size={19}
                    />

                    <div>

                        <span>
                            Total Deliveries
                        </span>

                        <strong>
                            {deliveries.length}
                        </strong>

                    </div>

                </div>


                <div className="summary-item">

                    <Calendar
                        size={19}
                    />

                    <div>

                        <span>
                            Last Delivery
                        </span>

                        <strong>

                            {
                                latestDelivery?.deliveryDate

                                    ? new Date(
                                        latestDelivery.deliveryDate
                                    ).toLocaleDateString()

                                    : "-"
                            }

                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                HISTORY
            ================================================= */}

            <div className="delivery-company-history">

                <div className="delivery-history-header">

                    <div>

                        <h3>
                            Delivery History
                        </h3>

                        <p>
                            All individual deliveries for this company
                        </p>

                    </div>

                </div>


                <div className="delivery-table-container">

                    <table className="delivery-table">

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Inventory Type
                                </th>

                                <th>
                                    Inventory Item
                                </th>

                                <th>
                                    Product
                                </th>

                                <th>
                                    Quantity
                                </th>

                                <th>
                                    Delivery Date
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Medium
                                </th>

                                <th>
                                    Remarks
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                loading

                                    ? (

                                        <tr>

                                            <td
                                                colSpan="10"
                                                className="delivery-state-cell"
                                            >
                                                Loading deliveries...
                                            </td>

                                        </tr>

                                    )

                                    : deliveries.length === 0

                                        ? (

                                            <tr>

                                                <td
                                                    colSpan="10"
                                                    className="delivery-state-cell"
                                                >
                                                    No deliveries found for this company.
                                                </td>

                                            </tr>

                                        )

                                        : (

                                            deliveries.map(
                                                delivery => (

                                                    <tr
                                                        key={
                                                            delivery.id
                                                        }
                                                    >

                                                        <td>
                                                            {
                                                                delivery.id
                                                            }
                                                        </td>


                                                        <td>

                                                            <span className="inventory-type-cell">

                                                                <Layers
                                                                    size={15}
                                                                />

                                                                {
                                                                    formatText(
                                                                        delivery.categoryName
                                                                    )
                                                                }

                                                            </span>

                                                        </td>


                                                        <td>

                                                            {
                                                                getInventoryItem(
                                                                    delivery
                                                                )
                                                            }

                                                        </td>


                                                        <td>

                                                            <strong className="product-name-cell">

                                                                {
                                                                    delivery.productName ||
                                                                    "-"
                                                                }

                                                            </strong>

                                                        </td>


                                                        <td>

                                                            {
                                                                delivery.deliveredQuantity ??
                                                                "-"
                                                            }

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


                                                        <td>

                                                            <div className="medium-cell">

                                                                <Truck
                                                                    size={16}
                                                                />

                                                                {
                                                                    delivery.deliveryMedium ||
                                                                    "-"
                                                                }

                                                            </div>

                                                        </td>


                                                        <td>

                                                            <span className="remarks-cell">

                                                                {
                                                                    delivery.remarks ||
                                                                    "-"
                                                                }

                                                            </span>

                                                        </td>


                                                        <td>

                                                            <div className="table-action">

                                                                <Link
                                                                    to={
                                                                        `/sales/delivery/${delivery.id}`
                                                                    }
                                                                    className="action-btn action-view"
                                                                    title="View delivery"
                                                                >

                                                                    <Package
                                                                        size={17}
                                                                    />

                                                                </Link>


                                                                <Link
                                                                    to={
                                                                        `/sales/delivery/edit/${delivery.id}`
                                                                    }
                                                                    className="action-btn action-edit"
                                                                    title="Edit delivery"
                                                                >

                                                                    <Pencil
                                                                        size={17}
                                                                    />

                                                                </Link>


                                                                <button
                                                                    type="button"
                                                                    className="action-btn action-delete"
                                                                    title="Delete delivery"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            delivery.id
                                                                        )
                                                                    }
                                                                >

                                                                    <Trash2
                                                                        size={17}
                                                                    />

                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                )
                                            )

                                        )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};


export default CompanyDeliveryDetails;