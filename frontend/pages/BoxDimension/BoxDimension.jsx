import React from "react";
import { Routes, Route } from "react-router-dom";

import BoxDimensionList from "./BoxDimensionList";
import BoxDimensionForm from "./BoxDimensionForm";
import BoxDimensionDetails from "./BoxDimensionDetails";

import "./BoxDimension.css";

const BoxDimension = () => {

    return (

        <div className="box-dimension-module">

            <Routes>

                <Route
                    path="/"
                    element={<BoxDimensionList />}
                />

                <Route
                    path="/add"
                    element={<BoxDimensionForm />}
                />

                <Route
                    path="/edit/:id"
                    element={<BoxDimensionForm />}
                />

                <Route
                    path="/:id"
                    element={<BoxDimensionDetails />}
                />

            </Routes>

        </div>

    );

};

export default BoxDimension;