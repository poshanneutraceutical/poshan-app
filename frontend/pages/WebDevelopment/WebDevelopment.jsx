import React from "react";
import { Routes, Route } from "react-router-dom";

import WebDevelopmentList from "./WebDevelopmentList";
import AddWebProject from "./AddWebProject";
import EditWebProject from "./EditWebProject";
import ViewWebProject from "./ViewWebProject";

import "./WebDevelopment.css";


const WebDevelopment = () => {

    return (

        <div className="webdevelopment-module">

            <Routes>

                <Route
                    path="/"
                    element={<WebDevelopmentList />}
                />

                <Route
                    path="/add"
                    element={<AddWebProject />}
                />

                <Route
                    path="/edit/:id"
                    element={<EditWebProject />}
                />

                <Route
                    path="/:id"
                    element={<ViewWebProject />}
                />

            </Routes>

        </div>

    );

};


export default WebDevelopment;