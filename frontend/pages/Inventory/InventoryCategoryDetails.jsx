import React, {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    Eye,
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
    from "../../services/inventoryService";

import inventoryCategoryService
    from "../../services/inventoryCategoryService";


const InventoryCategoryDetails = () => {

    const {
        categoryId
    } = useParams();


    const navigate =
        useNavigate();


    const [
        category,
        setCategory
    ] = useState(null);


    const [
        items,
        setItems
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    useEffect(() => {

        loadPage();

    }, [
        categoryId
    ]);


    const loadPage =
        async () => {

            try {

                setLoading(true);


                const [
                    categoryData,
                    inventoryData
                ] =
                    await Promise.all([

                        inventoryCategoryService
                            .getById(
                                categoryId
                            ),

                        inventoryService
                            .getByCategory(
                                categoryId
                            )

                    ]);


                setCategory(
                    categoryData
                );


                setItems(
                    Array.isArray(
                        inventoryData
                    )
                        ? inventoryData
                        : []
                );

            }
            catch (error) {

                console.error(
                    "Failed to load category inventory",
                    error
                );

            }
            finally {

                setLoading(false);
            }
        };


    const handleDelete =
        async (
            id
        ) => {

            if (
                !window.confirm(
                    "Delete this inventory?"
                )
            ) {

                return;
            }


            try {

                await inventoryService.delete(
                    id
                );


                await loadPage();

            }
            catch (error) {

                console.error(
                    "Delete inventory failed",
                    error
                );
            }
        };


    const getItemName =
        (
            item
        ) => {

            if (
                item.boxType
            ) {

                return item.boxType
                    .replaceAll(
                        "_",
                        " "
                    );
            }


            return (
                item.materialName ||
                "-"
            );
        };


    if (loading) {

        return (

            <div className="loading">

                Loading Inventory...

            </div>
        );
    }


    if (!category) {

        return (

            <div className="loading">

                Inventory Category Not Found

            </div>
        );
    }


    return (

        <div className="inventory-category-details">

            <div className="details-header">

                <div>

                    <h2>
                        {
                            category.name
                        } Inventory
                    </h2>

                    <p>
                        All inventory items in this category
                    </p>

                </div>


                <div
                    className="inventory-detail-actions"
                >

                    <Link
                        to="/inventory"
                        className="back-btn"
                    >

                        <ArrowLeft
                            size={18}
                        />

                        Back

                    </Link>


                    <Link
                        to={`/inventory/add`}
                        className="add-btn"
                    >

                        <Package
                            size={18}
                        />

                        Add Inventory

                    </Link>

                </div>

            </div>


            <div className="inventory-category-summary-strip">

                <div>

                    <span>
                        Category
                    </span>

                    <strong>
                        {
                            category.name
                        }
                    </strong>

                </div>


                <div>

                    <span>
                        Total Items
                    </span>

                    <strong>
                        {
                            items.length
                        }
                    </strong>

                </div>


                <div>

                    <span>
                        Low Stock
                    </span>

                    <strong
                        className={
                            items.filter(
                                item =>
                                    item.availableQuantity
                                    <=
                                    item.minimumQuantity
                            ).length > 0
                                ? "text-danger"
                                : "text-success"
                        }
                    >

                        {
                            items.filter(
                                item =>
                                    item.availableQuantity
                                    <=
                                    item.minimumQuantity
                            ).length
                        }

                    </strong>

                </div>

            </div>


            <div className="inventory-table-container">

                <table className="inventory-table">

                    <thead>

                        <tr>

                            <th>
                                ID
                            </th>

                            <th>
                                Item
                            </th>

                            <th>
                                Available
                            </th>

                            <th>
                                Minimum
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Updated
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {items.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="inventory-empty-cell"
                                >

                                    No inventory items in this category.

                                </td>

                            </tr>

                        ) : (

                            items.map(
                                item => {

                                    const lowStock =
                                        item.availableQuantity
                                        <=
                                        item.minimumQuantity;


                                    return (

                                        <tr
                                            key={
                                                item.id
                                            }
                                        >

                                            <td>
                                                {
                                                    item.id
                                                }
                                            </td>


                                            <td>

                                                <div
                                                    className="inventory-item-name"
                                                >

                                                    <Package
                                                        size={
                                                            16
                                                        }
                                                    />

                                                    {
                                                        getItemName(
                                                            item
                                                        )
                                                    }

                                                </div>

                                            </td>


                                            <td>

                                                {
                                                    item.availableQuantity
                                                }

                                            </td>


                                            <td>

                                                {
                                                    item.minimumQuantity
                                                }

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
                                                                        15
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


                                            <td>

                                                {
                                                    item.updatedAt
                                                        ? new Date(
                                                            item.updatedAt
                                                        ).toLocaleString()
                                                        : "-"
                                                }

                                            </td>


                                            <td>

                                                <div
                                                    className="inventory-actions"
                                                >

                                                    <Link
                                                        to={`/inventory/${item.id}`}
                                                        className="action-view"
                                                        title="View"
                                                    >

                                                        <Eye
                                                            size={
                                                                17
                                                            }
                                                        />

                                                    </Link>


                                                    <Link
                                                        to={`/inventory/edit/${item.id}`}
                                                        className="action-edit"
                                                        title="Edit"
                                                    >

                                                        <Pencil
                                                            size={
                                                                17
                                                            }
                                                        />

                                                    </Link>


                                                    <button
                                                        type="button"
                                                        className="action-delete"
                                                        title="Delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                    >

                                                        <Trash2
                                                            size={
                                                                17
                                                            }
                                                        />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    );
                                }
                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};


export default InventoryCategoryDetails;