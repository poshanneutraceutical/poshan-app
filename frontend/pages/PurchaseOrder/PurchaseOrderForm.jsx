import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ShoppingCart
} from "lucide-react";
import {
  Link,
  useNavigate
} from "react-router-dom";

import purchaseOrderService from "../../services/PurchaseOrderService";
import purchaseRequisitionService from "../../services/PurchaseRequisitionService";

const PurchaseOrderForm = () => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [purchaseRequisitions, setPurchaseRequisitions] =
    useState([]);

  const [selectedPR, setSelectedPR] =
    useState("");

  const [selectedData, setSelectedData] =
    useState(null);



  useEffect(() => {

    loadApprovedPurchaseRequisitions();

  }, []);




  const loadApprovedPurchaseRequisitions =
    async () => {

      try {

        setLoading(true);

        const data =
          await purchaseRequisitionService.getAll();

        const approved =
          data.filter(
            (item) =>
              item.status === "Approved"
          );

        setPurchaseRequisitions(
          approved
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };




  const handleSelect =
    (event) => {

      const id =
        event.target.value;

      setSelectedPR(id);

      const pr =
        purchaseRequisitions.find(
          (item) =>
            item.id === Number(id)
        );

      setSelectedData(pr);

    };




  const createPurchaseOrder =
    async () => {

      if (!selectedPR) {

        alert(
          "Please select a Purchase Requisition."
        );

        return;

      }

      try {

        setLoading(true);

        const purchaseOrder =
          await purchaseOrderService.createFromPR(
            selectedPR
          );

        alert(
          "Purchase Order created successfully."
        );

        navigate(
          `/purchase-orders/${purchaseOrder.id}`
        );

      } catch (error) {

        console.error(error);

        alert(
          "Unable to create Purchase Order."
        );

      } finally {

        setLoading(false);

      }

    };
  return (

    <div className="mx-auto max-w-5xl space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Create Purchase Order

          </h1>

          <p className="text-gray-500">

            Select an Approved Purchase Requisition

          </p>

        </div>

        <Link
          to="/purchase-orders"
          className="flex items-center gap-2 rounded-lg border px-4 py-2"
        >

          <ArrowLeft size={18} />

          Back

        </Link>

      </div>





      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">

        <div>

          <label className="mb-2 block font-medium">

            Purchase Requisition

          </label>

          <select
            value={selectedPR}
            onChange={handleSelect}
            className="w-full rounded-lg border p-3"
          >

            <option value="">

              Select Approved Purchase Requisition

            </option>

            {purchaseRequisitions.map((pr) => (

              <option
                key={pr.id}
                value={pr.id}
              >

                {pr.prNumber} - {pr.vendorCompanyName}

              </option>

            ))}

          </select>

        </div>





        {selectedData && (

          <div className="rounded-lg bg-gray-50 p-6">

            <h2 className="mb-4 text-xl font-semibold">

              Purchase Requisition Details

            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              <div>

                <p className="text-sm text-gray-500">

                  PR Number

                </p>

                <p className="font-medium">

                  {selectedData.prNumber}

                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">

                  Vendor

                </p>

                <p className="font-medium">

                  {selectedData.vendorCompanyName}

                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">

                  Requested By

                </p>

                <p className="font-medium">

                  {selectedData.requestedBy}

                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">

                  Department

                </p>

                <p className="font-medium">

                  {selectedData.department}

                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">

                  Priority

                </p>

                <p className="font-medium">

                  {selectedData.priority}

                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">

                  Total Items

                </p>

                <p className="font-medium">

                  {selectedData.items?.length || 0}

                </p>

              </div>

            </div>





            <div className="mt-6">

              <h3 className="mb-3 font-semibold">

                Requested Items

              </h3>

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

                    {(selectedData.items || []).map(

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

        )}






        <div className="flex justify-end">

          <button
            type="button"
            disabled={
              loading || !selectedPR
            }
            onClick={
              createPurchaseOrder
            }
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >

            <ShoppingCart size={18} />

            {loading
              ? "Creating..."
              : "Create Purchase Order"}

          </button>

        </div>

      </div>

    </div>

  );

};

export default PurchaseOrderForm;