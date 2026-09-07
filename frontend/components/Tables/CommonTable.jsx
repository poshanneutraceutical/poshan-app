import React from "react";

import "./CommonTable.css";


const CommonTable = ({
    columns = [],
    data = [],
    actions,
    loading = false,
    emptyMessage = "No data found"
}) => {


    if (loading) {

        return (

            <div className="table-loading">

                Loading...

            </div>

        );

    }


    return (

        <div className="common-table-container">


            <table className="common-table">


                <thead>

                    <tr>

                        {
                            columns.map((column, index) => (

                                <th key={index}>

                                    {column.label}

                                </th>

                            ))
                        }


                        {
                            actions && (

                                <th>
                                    Actions
                                </th>

                            )
                        }


                    </tr>

                </thead>



                <tbody>


                    {
                        data.length > 0 ? (

                            data.map((row, rowIndex) => (

                                <tr key={row.id || rowIndex}>


                                    {
                                        columns.map((column, colIndex) => (

                                            <td key={colIndex}>

                                                {
                                                    column.render
                                                    ?
                                                    column.render(row)
                                                    :
                                                    row[column.key]
                                                }

                                            </td>

                                        ))
                                    }



                                    {
                                        actions && (

                                            <td className="table-actions">

                                                {actions(row)}

                                            </td>

                                        )
                                    }


                                </tr>

                            ))

                        )
                        :
                        (

                            <tr>

                                <td
                                    colSpan={
                                        columns.length + (actions ? 1 : 0)
                                    }
                                    className="empty-table"
                                >

                                    {emptyMessage}

                                </td>

                            </tr>

                        )

                    }


                </tbody>


            </table>


        </div>

    );

};


export default CommonTable;