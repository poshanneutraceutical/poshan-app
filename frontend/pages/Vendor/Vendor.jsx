import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import VendorList from "./VendorList";
import VendorForm from "./VendorForm";
import VendorDetails from "./VendorDetails";

import "./Vendor.css";

const Vendor = () => {

    return (

        <div className="vendor-module">

            <Routes>

                {/* Vendor List */}
                <Route
                    index
                    element={<VendorList />}
                />

                {/* Create Vendor */}
                <Route
                    path="add"
                    element={<VendorForm />}
                />

                {/* Edit Vendor */}
                <Route
                    path="edit/:id"
                    element={<VendorForm />}
                />

                {/* Vendor Details */}
                <Route
                    path=":id"
                    element={<VendorDetails />}
                />

                {/* Invalid Route */}
                <Route
                    path="*"
                    element={<Navigate to="." replace />}
                />

            </Routes>

        </div>

    );

};

export default Vendor;