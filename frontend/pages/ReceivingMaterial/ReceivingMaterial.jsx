import React from "react";
import { Routes, Route } from "react-router-dom";

import ReceivingList from "./ReceivingList";
import ReceivingForm from "./ReceivingForm";
import ReceivingDetails from "./ReceivingDetails";

import "./ReceivingMaterial.css";

const ReceivingMaterial = () => {

    return (

        <div className="receiving-material-module">

            <Routes>

                <Route

                    index

                    element={<ReceivingList />}

                />

                <Route

                    path="add"

                    element={<ReceivingForm />}

                />

                <Route

                    path="edit/:id"

                    element={<ReceivingForm />}

                />

                <Route

                    path=":id"

                    element={<ReceivingDetails />}

                />

            </Routes>

        </div>

    );

};

export default ReceivingMaterial;