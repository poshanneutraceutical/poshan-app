import React, { useEffect, useState } from "react";
import ProductionService from "../../services/ProductionService";
import "./Production.css";


const ProductionList = ({ onEdit }) => {


    const [plans, setPlans] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchPlans();

    }, []);


    const fetchPlans = async () => {

        try {

            const data =
                await ProductionService.getAllPlans();

            setPlans(data);

        }
        catch (error) {

            console.error(
                "Failed to load production plans",
                error
            );

        }
        finally {

            setLoading(false);

        }

    };


    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this production plan?"
            );


        if (!confirmDelete)
            return;


        try {

            await ProductionService.deletePlan(id);


            setPlans(

                plans.filter(
                    plan => plan.id !== id
                )

            );

        }
        catch (error) {

            console.error(
                "Delete failed",
                error
            );

        }

    };


    if (loading) {

        return (

            <div className="loading">

                Loading production plans...

            </div>

        );

    }


    return (

        <div className="production-table-container">


            <table className="production-table">


                <thead>

                    <tr>

                        <th>
                            Plan Date
                        </th>

                        <th>
                            Title
                        </th>

                        <th>
                            Scope
                        </th>

                        <th>
                            Box Type
                        </th>

                        <th>
                            Weight
                        </th>

                        <th>
                            Neck Seal
                        </th>

                        <th>
                            Company
                        </th>

                        <th>
                            Neck Seal Type
                        </th>

                        <th>
                            Assigned By
                        </th>

                        <th>
                            Execute Date
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {

                        plans.length > 0

                            ?

                            (

                                plans.map((plan) => (

                                    <tr key={plan.id}>


                                        <td>

                                            {plan.plandate}

                                        </td>


                                        <td>

                                            {plan.tittle}

                                        </td>


                                        <td>

                                            {plan.scoope || "-"}

                                        </td>


                                        <td>

                                            {plan.boxtype || "-"}

                                        </td>


                                        <td>

                                            {plan.weight || "-"}

                                        </td>


                                        <td>

                                            {plan.neckseal || "-"}

                                        </td>


                                        <td>

                                            {plan.companyname || "-"}

                                        </td>


                                        <td>

                                            {plan.necksealtype || "-"}

                                        </td>


                                        <td>

                                            {plan.assignby || "-"}

                                        </td>


                                        <td>

                                            {

                                                plan.executedate

                                                    ?

                                                    new Date(
                                                        plan.executedate
                                                    ).toLocaleString()

                                                    :

                                                    "-"

                                            }

                                        </td>


                                        <td>

                                            <span className="status-badge">

                                                {plan.status}

                                            </span>

                                        </td>


                                        <td>

                                            <button

                                                className="edit-btn"

                                                onClick={() =>
                                                    onEdit(plan)
                                                }

                                            >

                                                Edit

                                            </button>


                                            <button

                                                className="delete-btn"

                                                onClick={() =>
                                                    handleDelete(plan.id)
                                                }

                                            >

                                                Delete

                                            </button>

                                        </td>


                                    </tr>

                                ))

                            )

                            :

                            (

                                <tr>

                                    <td colSpan="12">

                                        No production plans found

                                    </td>

                                </tr>

                            )

                    }

                </tbody>


            </table>


        </div>

    );

};


export default ProductionList;