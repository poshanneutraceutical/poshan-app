import React from "react";

const Table = ({
    columns = [],
    data = [],
    loading = false,
    emptyMessage = "No data found"
}) => {

    /*
     * Always make sure we are working with an array.
     *
     * This prevents:
     *
     * data.map is not a function
     *
     * if an API accidentally returns an object.
     */

    const rows = Array.isArray(data) ? data : [];

    return (

        <div
            className="
                overflow-x-auto
                bg-white
                rounded-lg
                shadow
            "
        >

            <table
                className="
                    w-full
                    text-sm
                    text-left
                "
            >

                <thead
                    className="
                        bg-gray-100
                    "
                >

                    <tr>

                        {
                            columns.map((column, index) => (

                                <th
                                    key={index}
                                    className="
                                        px-6
                                        py-3
                                        font-semibold
                                        text-gray-700
                                    "
                                >

                                    {column.label}

                                </th>

                            ))
                        }

                    </tr>

                </thead>


                <tbody>

                    {
                        loading ? (

                            <tr>

                                <td
                                    colSpan={columns.length}
                                    className="
                                        text-center
                                        py-6
                                        text-gray-500
                                    "
                                >

                                    Loading...

                                </td>

                            </tr>

                        ) : rows.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={columns.length}
                                    className="
                                        text-center
                                        py-6
                                        text-gray-500
                                    "
                                >

                                    {emptyMessage}

                                </td>

                            </tr>

                        ) : (

                            rows.map((row, rowIndex) => (

                                <tr
                                    key={row.id ?? rowIndex}
                                    className="
                                        border-b
                                        hover:bg-gray-50
                                    "
                                >

                                    {
                                        columns.map((column, colIndex) => (

                                            <td
                                                key={colIndex}
                                                className="
                                                    px-6
                                                    py-3
                                                    text-gray-700
                                                "
                                            >

                                                {
                                                    column.render
                                                        ? column.render(row)
                                                        : row[column.key] ?? "-"
                                                }

                                            </td>

                                        ))
                                    }

                                </tr>

                            ))

                        )
                    }

                </tbody>

            </table>

        </div>

    );

};

export default Table;