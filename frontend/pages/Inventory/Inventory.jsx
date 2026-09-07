import React from "react";

import {
    Routes,
    Route
} from "react-router-dom";

import InventoryList
    from "./InventoryList";

import InventoryForm
    from "./InventoryForm";

import InventoryDetails
    from "./InventoryDetails";

import InventoryCategoryDetails
    from "./InventoryCategoryDetails";

import "./Inventory.css";

const Inventory = () => {

    return (

        <div className="inventory-module-container">

            <Routes>

                <Route
                    index
                    element={
                        <InventoryList />
                    }
                />


                <Route
                    path="add"
                    element={
                        <InventoryForm />
                    }
                />


                <Route
                    path="category/:categoryId"
                    element={
                        <InventoryCategoryDetails />
                    }
                />


                <Route
                    path="edit/:id"
                    element={
                        <InventoryForm />
                    }
                />


                <Route
                    path=":id"
                    element={
                        <InventoryDetails />
                    }
                />

            </Routes>

        </div>
    );
};

export default Inventory;