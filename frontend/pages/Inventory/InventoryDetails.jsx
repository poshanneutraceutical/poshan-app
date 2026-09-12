import React, {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    Pencil,
    Trash2,
    AlertTriangle,
    Package
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import inventoryService
    from "../../services/InventoryService";


const InventoryDetails = () => {

    const {
        id
    } = useParams();


    const navigate =
        useNavigate();


    const [
        inventory,
        setInventory
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    useEffect(() => {

        loadInventory();

    }, [
        id
    ]);


    const loadInventory =
        async () => {

            try {

                setLoading(true);

                const data =
                    await inventoryService
                        .getById(
                            id
                        );

                setInventory(
                    data
                );

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


    const handleDelete =
        async () => {

            if (
                !window.confirm(
                    "Are you sure you want to delete this inventory?"
                )
            ) {

                return;
            }


            try {

                await inventoryService
                    .delete(
                        id
                    );


                navigate(
                    "/inventory"
                );

            }
            catch (error) {

                console.error(
                    error
                );

                alert(
                    "Unable to delete inventory."
                );
            }
        };


    if (loading) {

        return (

            <div className="loading">
                Loading Inventory...
            </div>
        );
    }


    if (!inventory) {

        return (

            <div className="loading">
                Inventory Not Found
            </div>
        );
    }


    const itemName =
        inventory.boxType
            ? inventory.boxType
                .replaceAll(
                    "_",
                    " "
                )
            : (
                inventory.materialName ||
                "-"
            );


    const lowStock =
        inventory.availableQuantity
        <=
        inventory.minimumQuantity;


    return (

        <div className="inventory-details-container">

            <div className="details-header">

                <div>

                    <h2>
                        Inventory Details
                    </h2>

                    <p>
                        {
                            inventory.categoryName ||
                            "Inventory"
                        }
                    </p>

                </div>


                <div
                    className="inventory-detail-actions"
                >

                    <Link
                        to={
                            inventory.categoryId
                                ? `/inventory/category/${inventory.categoryId}`
                                : "/inventory"
                        }
                        className="back-btn"
                    >

                        <ArrowLeft
                            size={18}
                        />

                        Back

                    </Link>


                    <Link
                        to={`/inventory/edit/${inventory.id}`}
                        className="edit-btn"
                    >

                        <Pencil
                            size={18}
                        />

                        Edit

                    </Link>


                    <button
                        className="delete-btn"
                        onClick={
                            handleDelete
                        }
                    >

                        <Trash2
                            size={18}
                        />

                        Delete

                    </button>

                </div>

            </div>


            <div className="inventory-card">

                <table className="details-table">

                    <tbody>

                        <tr>

                            <td>
                                Inventory ID
                            </td>

                            <td>
                                {
                                    inventory.id
                                }
                            </td>

                        </tr>


                        <tr>

                            <td>
                                Inventory Type
                            </td>

                            <td>
                                {
                                    inventory.categoryName ||
                                    "-"
                                }
                            </td>

                        </tr>


                        <tr>

                            <td>
                                Item
                            </td>

                            <td>

                                <div
                                    className="inventory-detail-item"
                                >

                                    <Package
                                        size={
                                            17
                                        }
                                    />

                                    {
                                        itemName
                                    }

                                </div>

                            </td>

                        </tr>


                        <tr>

                            <td>
                                Available Quantity
                            </td>

                            <td>
                                {
                                    inventory.availableQuantity
                                }
                            </td>

                        </tr>


                        <tr>

                            <td>
                                Minimum Quantity
                            </td>

                            <td>
                                {
                                    inventory.minimumQuantity
                                }
                            </td>

                        </tr>


                        <tr>

                            <td>
                                Status
                            </td>

                            <td>

                                {
                                    lowStock
                                        ? (

                                            <span
                                                className="inventory-status-low"
                                            >

                                                <AlertTriangle
                                                    size={
                                                        16
                                                    }
                                                />

                                                Low Stock

                                            </span>

                                        )
                                        : (

                                            <span
                                                className="inventory-status-ok"
                                            >

                                                In Stock

                                            </span>
                                        )
                                }

                            </td>

                        </tr>


                        <tr>

                            <td>
                                Updated At
                            </td>

                            <td>

                                {
                                    inventory.updatedAt
                                        ? new Date(
                                            inventory.updatedAt
                                        ).toLocaleString()
                                        : "-"
                                }

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
};


export default InventoryDetails;