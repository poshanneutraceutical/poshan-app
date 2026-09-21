import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductionList from "./ProductionList";
import ProductionForm from "./ProductionForm";
import "./Production.css";


const Production = () => {


    const [searchParams, setSearchParams] = useSearchParams();

    const openCreateForm =
        searchParams.get("create") === "true";

    const [showForm, setShowForm] =
        useState(openCreateForm);

    const [selectedPlan, setSelectedPlan] =
        useState(null);


    useEffect(() => {

        if (openCreateForm) {

            setSelectedPlan(null);

            setShowForm(true);

        }

    }, [openCreateForm]);




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

        if (openCreateForm) {
            setSearchParams({});
        }

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
