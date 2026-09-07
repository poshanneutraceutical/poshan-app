import React from "react";
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import PurchaseOrderList from "./PurchaseOrderList";
import PurchaseOrderForm from "./PurchaseOrderForm";
import PurchaseOrderDetails from "./PurchaseOrderDetails";

import "./PurchaseOrder.css";

const PurchaseOrder = () => {

    return (

        <div className="purchase-order-module">

            <Routes>

                <Route
                    index
                    element={<PurchaseOrderList />}
                />

                <Route
                    path="add"
                    element={<PurchaseOrderForm />}
                />

                <Route
                    path=":id"
                    element={<PurchaseOrderDetails />}
                />

                <Route
                    path="*"
                    element={<Navigate to="." replace />}
                />

            </Routes>

        </div>

    );

};

export default PurchaseOrder;