import React from "react";

import MRPList from "./MRPList";

import DepartmentTasks from "../../components/DepartmentTasks";

import "./MRP.css";


const MRP = () => {

    return (

        <div className="mrp-module">

            <MRPList />


            {/* =================================================
                ASSIGNED TASKS
            =================================================

                The logged-in user's position controls access
                to this module.

                For MRP_PRINTING employees, this component
                loads ALL tasks whose department is:

                    MRP_PRINTING

                The assignedTo field only shows who the task
                was assigned to. It does not control visibility.
            ================================================= */}

            <DepartmentTasks

                department="MRP_PRINTING"

                title="Assigned MRP Printing Tasks"

            />

        </div>

    );

};


export default MRP;