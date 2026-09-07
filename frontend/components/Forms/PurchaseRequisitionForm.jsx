import React from "react";
import FormContainer from "./FormContainer";
import InputField from "../Common/InputField";
import SelectField from "../Common/SelectField";
import Button from "../Common/Button";
import useForm from "../../hooks/useForm";


const PurchaseRequisitionForm = ({
  onSubmit,
  initialData = {}
}) => {


  const {
    values,
    handleChange
  } = useForm({

    itemName: initialData.itemName || "",

    description: initialData.description || "",

    quantity: initialData.quantity || "",

    priority: initialData.priority || "",

    requiredDate: initialData.requiredDate || "",

    remarks: initialData.remarks || ""

  });



  const submitHandler = (event) => {

    event.preventDefault();

    onSubmit(values);

  };



  return (

    <FormContainer

      title="Create Purchase Requisition"

      onSubmit={submitHandler}

    >



      <InputField

        label="Item Name"

        name="itemName"

        value={values.itemName}

        onChange={handleChange}

        placeholder="Enter item name"

        required

      />



      <InputField

        label="Description"

        name="description"

        value={values.description}

        onChange={handleChange}

        placeholder="Enter item description"

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



      <SelectField

        label="Priority"

        name="priority"

        value={values.priority}

        onChange={handleChange}

        options={[

          {
            value: "LOW",
            label: "Low"
          },

          {
            value: "MEDIUM",
            label: "Medium"
          },

          {
            value: "HIGH",
            label: "High"
          }

        ]}

        required

      />



      <InputField

        label="Required Date"

        name="requiredDate"

        type="date"

        value={values.requiredDate}

        onChange={handleChange}

      />



      <InputField

        label="Remarks"

        name="remarks"

        value={values.remarks}

        onChange={handleChange}

        placeholder="Additional remarks"

      />



      <Button type="submit">

        Submit Request

      </Button>



    </FormContainer>

  );

};


export default PurchaseRequisitionForm;