import React from "react";
import FormContainer from "./FormContainer";
import InputField from "../Common/InputField";
import Button from "../Common/Button";
import useForm from "../../hooks/useForm";


const PurchaseOrderForm = ({
  onSubmit,
  initialData = {}
}) => {


  const {
    values,
    handleChange
  } = useForm({

    vendorName: initialData.vendorName || "",

    itemName: initialData.itemName || "",

    quantity: initialData.quantity || "",

    unitPrice: initialData.unitPrice || "",

    tax: initialData.tax || "",

    totalAmount: initialData.totalAmount || "",

    deliveryDate: initialData.deliveryDate || "",

    remarks: initialData.remarks || ""

  });



  const submitHandler = (event) => {

    event.preventDefault();

    onSubmit(values);

  };



  return (

    <FormContainer

      title="Create Purchase Order"

      onSubmit={submitHandler}

    >



      <InputField

        label="Vendor Name"

        name="vendorName"

        value={values.vendorName}

        onChange={handleChange}

        placeholder="Enter vendor name"

        required

      />



      <InputField

        label="Item Name"

        name="itemName"

        value={values.itemName}

        onChange={handleChange}

        placeholder="Enter item name"

        required

      />



      <InputField

        label="Quantity"

        name="quantity"

        type="number"

        value={values.quantity}

        onChange={handleChange}

        placeholder="Enter quantity"

        required

      />



      <InputField

        label="Unit Price"

        name="unitPrice"

        type="number"

        value={values.unitPrice}

        onChange={handleChange}

        placeholder="Enter unit price"

      />



      <InputField

        label="Tax (%)"

        name="tax"

        type="number"

        value={values.tax}

        onChange={handleChange}

        placeholder="Enter tax percentage"

      />



      <InputField

        label="Total Amount"

        name="totalAmount"

        type="number"

        value={values.totalAmount}

        onChange={handleChange}

        placeholder="Enter total amount"

      />



      <InputField

        label="Delivery Date"

        name="deliveryDate"

        type="date"

        value={values.deliveryDate}

        onChange={handleChange}

      />



      <InputField

        label="Remarks"

        name="remarks"

        value={values.remarks}

        onChange={handleChange}

        placeholder="Enter remarks"

      />



      <Button type="submit">

        Create Purchase Order

      </Button>



    </FormContainer>

  );

};


export default PurchaseOrderForm;