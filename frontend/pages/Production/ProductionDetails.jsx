import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductionService from "../../services/ProductionService";
import "./Production.css";


const ProductionDetails = () => {


    const { id } = useParams();


    const [plan, setPlan] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchPlan();

    }, [id]);


    const fetchPlan = async () => {

        try {

            const data =
                await ProductionService.getPlanById(id);

            setPlan(data);

        }
        catch (error) {

            console.error(
                "Failed to fetch production details",
                error
            );

        }
        finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <div className="loading">

                Loading production details...

            </div>

        );

    }


    if (!plan) {

        return (

            <div className="empty-state">

                Production plan not found

            </div>

        );

    }


    return (

        <div className="production-details-container">


            <h2>

                Production Plan Details

            </h2>


            <div className="production-details-card">


                {/* ==========================================
                    BASIC INFORMATION
                ========================================== */}

                <h3 className="details-section-title">

                    Production Information

                </h3>


                <p>

                    <strong>
                        Plan Date:
                    </strong>

                    {" "}

                    {plan.plandate || "-"}

                </p>


                <p>

                    <strong>
                        Title:
                    </strong>

                    {" "}

                    {plan.tittle || "-"}

                </p>


                <p>

                    <strong>
                        Description:
                    </strong>

                    {" "}

                    {plan.description || "-"}

                </p>


                <p>

                    <strong>
                        Assigned By:
                    </strong>

                    {" "}

                    {plan.assignby || "-"}

                </p>


                {/* ==========================================
                    PRODUCT DETAILS
                ========================================== */}

                <h3 className="details-section-title">

                    Product Details

                </h3>


                <p>

                    <strong>
                        Scope:
                    </strong>

                    {" "}

                    {plan.scoope || "-"}

                </p>


                <p>

                    <strong>
                        Box Type:
                    </strong>

                    {" "}

                    {plan.boxtype || "-"}

                </p>


                <p>

                    <strong>
                        Weight:
                    </strong>

                    {" "}

                    {plan.weight || "-"}

                </p>


                <p>

                    <strong>
                        Neck Seal:
                    </strong>

                    {" "}

                    {plan.neckseal || "-"}

                </p>


                <p>

                    <strong>
                        Company Name:
                    </strong>

                    {" "}

                    {plan.companyname || "-"}

                </p>


                <p>

                    <strong>
                        Neck Seal Type:
                    </strong>

                    {" "}

                    {plan.necksealtype || "-"}

                </p>


                {/* ==========================================
                    EXECUTION DETAILS
                ========================================== */}

                <h3 className="details-section-title">

                    Execution Details

                </h3>


                <p>

                    <strong>
                        Execute Date:
                    </strong>

                    {" "}

                    {

                        plan.executedate

                            ?

                            new Date(
                                plan.executedate
                            ).toLocaleString()

                            :

                            "-"

                    }

                </p>


                <p>

                    <strong>
                        Status:
                    </strong>

                    {" "}

                    <span className="status-badge">

                        {plan.status || "-"}

                    </span>

                </p>


            </div>


        </div>

    );

};


export default ProductionDetails;