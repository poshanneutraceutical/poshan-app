import React from "react";
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import PurchaseRequisitionList from "./PurchaseRequisitionList";
import PurchaseRequisitionForm from "./PurchaseRequisitionForm";
import PurchaseRequisitionDetails from "./PurchaseRequisitionDetails";

import "./PurchaseRequisition.css";


const PurchaseRequisition = () => {

    return (

        <div className="purchase-requisition-module">

            <Routes>

                {/* Purchase Requisition List */}

                <Route
                    index
                    element={
                        <PurchaseRequisitionList />
                    }
                />


                {/* Create Purchase Requisition */}

                <Route
                    path="add"
                    element={
                        <PurchaseRequisitionForm />
                    }
                />


                {/* Edit Purchase Requisition */}

                <Route
                    path="edit/:id"
                    element={
                        <PurchaseRequisitionForm />
                    }
                />


                {/* Purchase Requisition Details */}

                <Route
                    path=":id"
                    element={
                        <PurchaseRequisitionDetails />
                    }
                />


                {/* Invalid Route */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="."
                            replace
                        />
                    }
                />

            </Routes>

        </div>

    );

};


export default PurchaseRequisition;