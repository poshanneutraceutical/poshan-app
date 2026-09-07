import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle,
  Download,
  Mail,
  FileText,
  Trash2
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import purchaseOrderService from "../../services/purchaseOrderService";

const PurchaseOrderDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [purchaseOrder, setPurchaseOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    loadPurchaseOrder();

  }, [id]);



  const loadPurchaseOrder =
    async () => {

      try {

        setLoading(true);

        const data =
          await purchaseOrderService.getDetails(id);

        setPurchaseOrder(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };



  const downloadPdf =
    async () => {

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
          `${purchaseOrder.poNumber}.pdf`;

        document.body.appendChild(link);

        link.click();

        link.remove();

      } catch (error) {

        console.error(error);

      }

    };



  const sendEmail =
    async () => {

      try {

        await purchaseOrderService.sendToVendor(
          id
        );

        alert(
          "Purchase Order emailed successfully."
        );

      } catch (error) {

        console.error(error);

      }

    };



  const cancelPurchaseOrder =
    async () => {

      if (
        !window.confirm(
          "Cancel this Purchase Order?"
        )
      ) {
        return;
      }

      try {

        await purchaseOrderService.cancel(id);

        navigate("/purchase-orders");

      } catch (error) {

        console.error(error);

      }

    };



  const updateStatus =
    async (status) => {

      try {

        await purchaseOrderService.updateStatus(
          id,
          status
        );

        loadPurchaseOrder();

      } catch (error) {

        console.error(error);

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



  if (loading) {

    return (

      <div className="flex h-64 items-center justify-center">

        Loading Purchase Order...

      </div>

    );

  }



  if (!purchaseOrder) {

    return (

      <div className="flex h-64 items-center justify-center">

        Purchase Order Not Found.

      </div>

    );

  }
  return (

    <div className="mx-auto max-w-7xl space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-3">

        <div>

          <h1 className="text-3xl font-bold">

            Purchase Order

          </h1>

          <p className="text-gray-500">

            {purchaseOrder.poNumber}

          </p>

        </div>

        <div className="flex flex-wrap gap-2">

          <Link
            to="/purchase-orders"
            className="flex items-center gap-2 rounded-lg border px-4 py-2"
          >

            <ArrowLeft size={18} />

            Back

          </Link>

          <button
            onClick={downloadPdf}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
          >

            <Download size={18} />

            Download PDF

          </button>

          <button
            onClick={() =>
              window.open(
                `/api/procurement/purchase-orders/${purchaseOrder.id}/view-pdf`,
                "_blank"
              )
            }
            className="flex items-center gap-2 rounded-lg border px-4 py-2"
          >

            <FileText size={18} />

            View PDF

          </button>

          <button
            onClick={sendEmail}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white"
          >

            <Mail size={18} />

            Send Email

          </button>

          {purchaseOrder.status !== "CANCELLED" && (

            <button
              onClick={cancelPurchaseOrder}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white"
            >

              <Trash2 size={18} />

              Cancel

            </button>

          )}

        </div>

      </div>





      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-xl font-semibold">

            Purchase Order Information

          </h2>

          <div className="space-y-4">

            <div className="flex gap-3">

              <Building2 className="text-blue-600" />

              <div>

                <p className="text-sm text-gray-500">

                  Vendor

                </p>

                <p>

                  {purchaseOrder.vendorCompanyName}

                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <Calendar className="text-blue-600" />

              <div>

                <p className="text-sm text-gray-500">

                  Purchase Requisition

                </p>

                <p>

                  {purchaseOrder.prNumber}

                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <Calendar className="text-blue-600" />

              <div>

                <p className="text-sm text-gray-500">

                  Created Date

                </p>

                <p>

                  {purchaseOrder.createdAt?.replace(
                    "T",
                    " "
                  )}

                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <CheckCircle className="text-blue-600" />

              <div>

                <p className="text-sm text-gray-500">

                  Total Amount

                </p>

                <p>

                  ₹{purchaseOrder.totalAmount}

                </p>

              </div>

            </div>

          </div>

        </div>





        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-xl font-semibold">

            Status

          </h2>

          <div className="space-y-5">

            <span
              className={`inline-flex rounded-full px-4 py-2 text-sm ${getStatusClass(
                purchaseOrder.status
              )}`}
            >

              {purchaseOrder.status}

            </span>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() =>
                  updateStatus("CREATED")
                }
                className="rounded-lg border px-4 py-2"
              >

                Created

              </button>

              <button
                onClick={() =>
                  updateStatus("SENT")
                }
                className="rounded-lg border px-4 py-2"
              >

                Sent

              </button>

              <button
                onClick={() =>
                  updateStatus("RECEIVED")
                }
                className="rounded-lg border px-4 py-2"
              >

                Received

              </button>

            </div>

          </div>

        </div>

      </div>





      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold">

          Purchase Order Items

        </h2>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">

                  Box Type

                </th>

                <th className="p-3 text-left">

                  Quantity

                </th>

              </tr>

            </thead>

            <tbody>

              {(purchaseOrder.items || []).map(

                (item, index) => (

                  <tr
                    key={index}
                    className="border-t"
                  >

                    <td className="p-3">

                      {item.boxType}

                    </td>

                    <td className="p-3">

                      {item.quantity}

                    </td>

                  </tr>

                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default PurchaseOrderDetails;