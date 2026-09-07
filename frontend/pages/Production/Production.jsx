import React, { useState } from "react";
import ProductionList from "./ProductionList";
import ProductionForm from "./ProductionForm";
import "./Production.css";


const Production = () => {


    const [showForm, setShowForm] = useState(false);

    const [selectedPlan, setSelectedPlan] = useState(null);




    const handleAddPlan = () => {

        setSelectedPlan(null);

        setShowForm(true);

    };





    const handleEditPlan = (plan) => {

        setSelectedPlan(plan);

        setShowForm(true);

    };





    const handleCloseForm = () => {

        setSelectedPlan(null);

        setShowForm(false);

    };






    return (

        <div className="production-container">


            <div className="production-header">


                <h2>
                    Production Plan Management
                </h2>



                <button

                    className="add-production-btn"

                    onClick={handleAddPlan}

                >

                    + Create Production Plan

                </button>



            </div>





            {
                showForm ?


                (

                    <ProductionForm

                        plan={selectedPlan}

                        onClose={handleCloseForm}

                    />

                )


                :


                (

                    <ProductionList

                        onEdit={handleEditPlan}

                    />

                )

            }




        </div>

    );

};


export default Production;