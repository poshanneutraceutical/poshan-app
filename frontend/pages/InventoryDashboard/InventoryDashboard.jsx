import {
    useEffect,
    useState
} from "react";

import {
    Boxes,
    AlertTriangle,
    PackageCheck,
    Clock3,
    RefreshCcw
} from "lucide-react";

import dashboardService
    from "../../services/dashboardService";


const InventoryDashboard = () => {

    const [
        inventory,
        setInventory
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    useEffect(() => {

        loadInventoryDashboard();

    }, []);


    const loadInventoryDashboard =
        async () => {

            try {

                setLoading(true);

                const data =
                    await dashboardService
                        .getInventoryDashboard();

                setInventory(data);

            }
            catch (error) {

                console.error(
                    "Failed to load inventory dashboard",
                    error
                );

            }
            finally {

                setLoading(false);
            }
        };


    if (
        loading
    ) {

        return (

            <div className="flex h-64 items-center justify-center">

                <RefreshCcw
                    className="animate-spin"
                />

            </div>
        );
    }


    const cards = [

        {
            title:
                "Available Stock",

            value:
                inventory?.availableStock || 0,

            icon:
                Boxes
        },

        {
            title:
                "Minimum Quantity",

            value:
                inventory?.minimumQuantity || 0,

            icon:
                PackageCheck
        },

        {
            title:
                "Low Stock Items",

            value:
                inventory?.lowStockCount || 0,

            icon:
                AlertTriangle
        },

        {
            title:
                "Last Updated",

            value:
                inventory?.updatedTime || "-",

            icon:
                Clock3
        }
    ];


    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Inventory Dashboard
                    </h1>

                    <p className="text-gray-500">
                        Real-time inventory overview
                    </p>

                </div>


                <button
                    onClick={
                        loadInventoryDashboard
                    }
                    className="flex items-center gap-2 rounded-lg border px-4 py-2"
                >

                    <RefreshCcw
                        size={18}
                    />

                    Refresh

                </button>

            </div>


            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                {
                    cards.map(
                        (
                            card,
                            index
                        ) => {

                            const Icon =
                                card.icon;


                            return (

                                <div
                                    key={index}
                                    className="rounded-xl border bg-white p-5 shadow-sm"
                                >

                                    <div className="flex justify-between">

                                        <div>

                                            <p className="text-sm text-gray-500">

                                                {
                                                    card.title
                                                }

                                            </p>


                                            <h2 className="mt-3 text-2xl font-bold">

                                                {
                                                    card.value
                                                }

                                            </h2>

                                        </div>


                                        <div className="rounded-lg bg-blue-100 p-3">

                                            <Icon
                                                size={24}
                                                className="text-blue-600"
                                            />

                                        </div>

                                    </div>

                                </div>
                            );
                        }
                    )
                }

            </div>


            <div className="rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-semibold">
                    Inventory Status
                </h2>


                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-3 text-left">
                                    Inventory Type
                                </th>

                                <th className="p-3 text-left">
                                    Item
                                </th>

                                <th className="p-3 text-left">
                                    Available
                                </th>

                                <th className="p-3 text-left">
                                    Minimum
                                </th>

                                <th className="p-3 text-left">
                                    Status
                                </th>

                                <th className="p-3 text-left">
                                    Updated
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                (
                                    inventory?.items ||
                                    []
                                ).map(
                                    item => (

                                        <tr
                                            key={
                                                item.id
                                            }
                                            className="border-t"
                                        >

                                            <td className="p-3">

                                                {
                                                    item.categoryName
                                                }

                                            </td>


                                            <td className="p-3">

                                                {
                                                    item.itemName
                                                }

                                            </td>


                                            <td className="p-3">

                                                {
                                                    item.availableQuantity
                                                }

                                            </td>


                                            <td className="p-3">

                                                {
                                                    item.minimumQuantity
                                                }

                                            </td>


                                            <td className="p-3">

                                                {
                                                    item.lowStock

                                                        ? (

                                                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">

                                                                Low Stock

                                                            </span>

                                                        )

                                                        : (

                                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">

                                                                Available

                                                            </span>
                                                        )
                                                }

                                            </td>


                                            <td className="p-3">

                                                {
                                                    item.updatedTime
                                                        ? new Date(
                                                            item.updatedTime
                                                        ).toLocaleString()
                                                        : "-"
                                                }

                                            </td>

                                        </tr>
                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};


export default InventoryDashboard;