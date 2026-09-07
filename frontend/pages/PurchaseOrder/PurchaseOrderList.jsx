import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Download,
  Mail,
  Trash2,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";

import purchaseOrderService from "../../services/purchaseOrderService";

const PurchaseOrderList = () => {

  const [purchaseOrders, setPurchaseOrders] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);




  useEffect(() => {

    loadPurchaseOrders();

  }, []);




  const loadPurchaseOrders =
    async () => {

      try {

        setLoading(true);

        const data =
          await purchaseOrderService.getAll();

        setPurchaseOrders(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };




  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Cancel this Purchase Order?"
        )
      ) {
        return;
      }

      try {

        await purchaseOrderService.cancel(id);

        loadPurchaseOrders();

      } catch (error) {

        console.error(error);

      }

    };




  const handleDownload =
    async (id) => {

      try {

        const file =
          await purchaseOrderService.downloadPdf(id);

        const url =
          window.URL.createObjectURL(
            new Blob([file])
          );

        const link =
          document.createElement("a");

        link.href = url;

        link.download =
          `Purchase-Order-${id}.pdf`;

        document.body.appendChild(
          link
        );

        link.click();

        link.remove();

      } catch (error) {

        console.error(error);

      }

    };




  const handleSendEmail =
    async (id) => {

      try {

        await purchaseOrderService.sendToVendor(
          id
        );

        alert(
          "Purchase Order emailed successfully."
        );

      } catch (error) {

        console.error(error);

        alert(
          "Unable to send Purchase Order."
        );

      }

    };




  const getStatusClass =
    (status) => {

      switch (status) {

        case "CREATED":
          return "bg-blue-100 text-blue-700";

        case "SENT":
          return "bg-yellow-100 text-yellow-700";

        case "RECEIVED":
          return "bg-green-100 text-green-700";

        case "CANCELLED":
          return "bg-red-100 text-red-700";

        default:
          return "bg-gray-100 text-gray-700";

      }

    };




  const filtered =
    useMemo(() => {

      return purchaseOrders.filter(
        (purchaseOrder) =>

          (
            purchaseOrder.poNumber || ""
          )

            .toLowerCase()

            .includes(
              search.toLowerCase()
            )

      );

    }, [
      purchaseOrders,
      search
    ]);
  return (

    <div className="space-y-6">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Purchase Orders

          </h1>

          <p className="text-gray-500">

            Manage all Purchase Orders

          </p>

        </div>

      </div>



      <div className="relative">

        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search Purchase Order..."
          className="w-full rounded-lg border py-2 pl-10 pr-4"
        />

      </div>



      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">

                PO Number

              </th>

              <th className="p-3 text-left">

                Vendor

              </th>

              <th className="p-3 text-left">

                Created Date

              </th>

              <th className="p-3 text-left">

                Total Amount

              </th>

              <th className="p-3 text-left">

                Status

              </th>

              <th className="p-3 text-center">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="6"
                  className="p-6 text-center"
                >

                  Loading Purchase Orders...

                </td>

              </tr>

            ) : filtered.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="p-6 text-center"
                >

                  No Purchase Orders Found.

                </td>

              </tr>

            ) : (

              filtered.map(
                (purchaseOrder) => (

                  <tr
                    key={purchaseOrder.id}
                    className="border-t"
                  >

                    <td className="p-3 font-medium">

                      {purchaseOrder.poNumber}

                    </td>

                    <td className="p-3">

                      {purchaseOrder.vendorCompanyName}

                    </td>

                    <td className="p-3">

                      {purchaseOrder.createdAt?.split(
                        "T"
                      )[0]}

                    </td>

                    <td className="p-3">

                      ₹
                      {purchaseOrder.totalAmount}

                    </td>

                    <td className="p-3">

                      <span
                        className={`rounded-full px-3 py-1 text-xs ${getStatusClass(
                          purchaseOrder.status
                        )}`}
                      >

                        {purchaseOrder.status}

                      </span>

                    </td>

                    <td className="p-3">

                      <div className="flex justify-center gap-3">

                        <Link
                          to={`/purchase-orders/${purchaseOrder.id}`}
                        >

                          <Eye
                            size={18}
                            className="text-blue-600"
                          />

                        </Link>

                        <button
                          onClick={() =>
                            handleDownload(
                              purchaseOrder.id
                            )
                          }
                        >

                          <Download
                            size={18}
                            className="text-green-600"
                          />

                        </button>

                        <button
                          onClick={() =>
                            handleSendEmail(
                              purchaseOrder.id
                            )
                          }
                        >

                          <Mail
                            size={18}
                            className="text-purple-600"
                          />

                        </button>

                        <button
                          onClick={() =>
                            window.open(
                              `/api/procurement/purchase-orders/${purchaseOrder.id}/view-pdf`,
                              "_blank"
                            )
                          }
                        >

                          <FileText
                            size={18}
                            className="text-indigo-600"
                          />

                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              purchaseOrder.id
                            )
                          }
                        >

                          <Trash2
                            size={18}
                            className="text-red-600"
                          />

                        </button>

                      </div>

                    </td>

                  </tr>

                )

              )

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default PurchaseOrderList;