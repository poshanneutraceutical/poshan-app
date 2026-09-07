import React from "react";

import {
    Routes,
    Route
} from "react-router-dom";

import CompanyList from "./CompanyList";
import CompanyForm from "./CompanyForm";
import CompanyDetails from "./CompanyDetails";

import "./Company.css";


const Company = () => {

    return (

        <div className="company-module-container">

            <Routes>

                <Route
                    path="/"
                    element={
                        <CompanyList />
                    }
                />

                <Route
                    path="/add"
                    element={
                        <CompanyForm />
                    }
                />

                <Route
                    path="/edit/:id"
                    element={
                        <CompanyForm />
                    }
                />

                <Route
                    path="/:id"
                    element={
                        <CompanyDetails />
                    }
                />

            </Routes>

        </div>

    );

};


export default Company;