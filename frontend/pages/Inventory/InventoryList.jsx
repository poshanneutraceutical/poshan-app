import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Search,
    Eye,
    Plus,
    Package,
    AlertTriangle
} from "lucide-react";

import {
    Link
} from "react-router-dom";

import inventoryService
    from "../../services/inventoryService";


const InventoryList = () => {

    const [
        categories,
        setCategories
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        search,
        setSearch
    ] = useState("");


    useEffect(() => {

        loadCategories();

    }, []);


    const loadCategories =
        async () => {

            try {

                setLoading(true);

                const data =
                    await inventoryService
                        .getCategorySummary();

                setCategories(
                    Array.isArray(data)
                        ? data
                        : []
                );

            }
            catch (error) {

                console.error(
                    "Failed to load inventory categories",
                    error
                );

            }
            finally {

                setLoading(false);
            }
        };


    const filteredCategories =
        useMemo(
            () => {

                const query =
                    search
                        .trim()
                        .toLowerCase();


                if (!query) {

                    return categories;
                }


                return categories.filter(
                    category =>

                        category.name
                            .toLowerCase()
                            .includes(query)
                );
            },
            [
                categories,
                search
            ]
        );


    return (

        <div className="inventory-list-container">

            <div className="inventory-header">

                <div>

                    <h2>
                        Inventory Management
                    </h2>

                    <p>
                        Manage inventory category-wise
                    </p>

                </div>


                <Link
                    to="/inventory/add"
                    className="add-btn"
                >

                    <Plus
                        size={18}
                    />

                    Create Inventory

                </Link>

            </div>


            <div className="inventory-search">

                <Search
                    size={18}
                />

                <input
                    type="text"
                    placeholder="Search inventory type..."
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

            </div>


            <div className="inventory-category-grid">

                {loading ? (

                    <div className="inventory-state-card">

                        Loading inventory...

                    </div>

                ) : filteredCategories.length === 0 ? (

                    <div className="inventory-state-card">

                        No inventory categories found.

                    </div>

                ) : (

                    filteredCategories.map(
                        category => (

                            <div
                                className="inventory-category-card"
                                key={
                                    category.id
                                }
                            >

                                <div
                                    className="inventory-category-icon"
                                >

                                    <Package
                                        size={22}
                                    />

                                </div>


                                <div
                                    className="inventory-category-content"
                                >

                                    <h3>
                                        {
                                            category.name
                                        }
                                    </h3>


                                    <div
                                        className="inventory-category-meta"
                                    >

                                        <span>
                                            {
                                                category.totalItems
                                            } Items
                                        </span>


                                        {
                                            category.lowStockItems >
                                            0
                                            ? (

                                                <span
                                                    className="category-low-stock"
                                                >

                                                    <AlertTriangle
                                                        size={
                                                            14
                                                        }
                                                    />

                                                    {
                                                        category.lowStockItems
                                                    }
                                                    {" "}
                                                    Low Stock

                                                </span>

                                            )
                                            : (

                                                <span
                                                    className="category-good-stock"
                                                >

                                                    Stock Healthy

                                                </span>
                                            )
                                        }

                                    </div>

                                </div>


                                <Link
                                    to={`/inventory/category/${category.id}`}
                                    className="category-view-btn"
                                >

                                    <Eye
                                        size={17}
                                    />

                                    View

                                </Link>

                            </div>
                        )
                    )
                )}

            </div>

        </div>
    );
};


export default InventoryList;