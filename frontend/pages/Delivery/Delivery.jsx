import React from "react";

import {
    Routes,
    Route
} from "react-router-dom";

import DeliveryList
    from "./DeliveryList";

import DeliveryForm
    from "./DeliveryForm";

import DeliveryDetails
    from "./DeliveryDetails";

import CompanyDeliveryDetails
    from "./CompanyDeliveryDetails";

import "./Delivery.css";


const Delivery = () => {

    return (

        <div className="delivery-module">

            <Routes>

                <Route
                    index
                    element={
                        <DeliveryList />
                    }
                />


                <Route
                    path="add"
                    element={
                        <DeliveryForm />
                    }
                />


                <Route
                    path="edit/:id"
                    element={
                        <DeliveryForm />
                    }
                />


                <Route
                    path="company/:companyId"
                    element={
                        <CompanyDeliveryDetails />
                    }
                />


                <Route
                    path=":id"
                    element={
                        <DeliveryDetails />
                    }
                />

            </Routes>

        </div>

    );

};


export default Delivery;