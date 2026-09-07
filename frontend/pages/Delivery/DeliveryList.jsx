import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Plus,
    Search,
    Eye,
    Building2,
    PackageCheck
} from "lucide-react";

import {
    Link
} from "react-router-dom";

import deliveryService
    from "../../services/deliveryService";


const DeliveryList = () => {

    const [
        companies,
        setCompanies
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        search,
        setSearch
    ] = useState("");


    useEffect(() => {

        loadCompanySummary();

    }, []);


    const loadCompanySummary =
        async () => {

            try {

                setLoading(true);


                const data =
                    await deliveryService
                        .getCompanySummary();


                setCompanies(
                    Array.isArray(data)
                        ? data
                        : []
                );

            }
            catch (error) {

                console.error(
                    "Failed to load delivery companies",
                    error
                );


                setCompanies([]);

            }
            finally {

                setLoading(false);

            }

        };


    const filteredCompanies =
        useMemo(
            () => {

                const query =
                    search
                        .trim()
                        .toLowerCase();


                if (!query) {

                    return companies;

                }


                return companies.filter(
                    company =>

                        String(
                            company.companyId ||
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                query
                            )

                        ||

                        (
                            company.companyName ||
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                query
                            )
                );

            },
            [
                companies,
                search
            ]
        );


    return (

        <div className="delivery-list-container">


            <div className="delivery-header">

                <div>

                    <h2>
                        Delivery Management
                    </h2>

                    <p>
                        Manage deliveries company-wise
                    </p>

                </div>


                <Link
                    to="/sales/delivery/add"
                    className="add-btn"
                >

                    <Plus
                        size={18}
                    />

                    Create Delivery

                </Link>

            </div>


            <div className="delivery-search">

                <Search
                    size={18}
                />

                <input
                    type="text"
                    placeholder="Search company or company ID..."
                    value={search}
                    onChange={
                        event =>
                            setSearch(
                                event.target.value
                            )
                    }
                />

            </div>


            <div className="delivery-table-container">

                <table className="delivery-table">

                    <thead>

                        <tr>

                            <th>
                                Company ID
                            </th>

                            <th>
                                Company Name
                            </th>

                            <th>
                                Total Deliveries
                            </th>

                            <th>
                                Last Delivery
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            loading

                                ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="delivery-state-cell"
                                        >

                                            Loading companies...

                                        </td>

                                    </tr>

                                )

                                : filteredCompanies.length ===
                                  0

                                    ? (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="delivery-state-cell"
                                            >

                                                No delivery companies found.

                                            </td>

                                        </tr>

                                    )

                                    : (

                                        filteredCompanies.map(
                                            company => (

                                                <tr
                                                    key={
                                                        company.companyId
                                                    }
                                                >

                                                    <td>

                                                        <div className="company-id-cell">

                                                            <Building2
                                                                size={17}
                                                            />

                                                            {
                                                                company.companyId
                                                            }

                                                        </div>

                                                    </td>


                                                    <td>

                                                        <div className="company-name-cell">

                                                            {
                                                                company.companyName ||
                                                                "-"
                                                            }

                                                        </div>

                                                    </td>


                                                    <td>

                                                        <span className="items-badge">

                                                            <PackageCheck
                                                                size={14}
                                                            />

                                                            {
                                                                company.totalDeliveries ??
                                                                0
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        {
                                                            company.lastDeliveryDate

                                                                ? new Date(
                                                                    company.lastDeliveryDate
                                                                ).toLocaleString()

                                                                : "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        <div className="table-action">

                                                            <Link
                                                                to={
                                                                    `/sales/delivery/company/${company.companyId}`
                                                                }
                                                                className="action-btn action-view"
                                                                title="View company deliveries"
                                                            >

                                                                <Eye
                                                                    size={18}
                                                                />

                                                            </Link>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    )
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};


export default DeliveryList;