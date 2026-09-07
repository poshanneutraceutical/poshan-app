import { Routes, Route } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import EmployeeForm from "./EmployeeForm";
import EmployeeDetails from "./EmployeeDetails";

import "./Employee.css";

const Employee = () => {

    return (

        <div className="employee-module">

            <Routes>

                <Route
                    index
                    element={<EmployeeList />}
                />

                <Route
                    path="add"
                    element={<EmployeeForm />}
                />

                <Route
                    path="edit/:id"
                    element={<EmployeeForm />}
                />

                <Route
                    path=":id"
                    element={<EmployeeDetails />}
                />

            </Routes>

        </div>

    );

};

export default Employee;