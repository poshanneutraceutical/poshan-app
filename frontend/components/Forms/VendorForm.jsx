import React from "react";
import FormContainer from "./FormContainer";
import InputField from "../Common/InputField";
import SelectField from "../Common/SelectField";
import Button from "../Common/Button";
import useForm from "../../hooks/useForm";


const VendorForm = ({
  onSubmit,
  initialData = {}
}) => {


  const {
    values,
    handleChange
  } = useForm({

    name: initialData.name || "",

    email: initialData.email || "",

    phone: initialData.phone || "",

    address: initialData.address || "",

    gstNumber: initialData.gstNumber || "",

    status: initialData.status || ""

  });



  const submitHandler = (event) => {

    event.preventDefault();

    onSubmit(values);

  };



  return (

    <FormContainer
      title="Vendor Details"
      onSubmit={submitHandler}
    >



      <InputField

        label="Vendor Name"

        name="name"

        value={values.name}

        onChange={handleChange}

        placeholder="Enter vendor name"

        required

      />



      <InputField

        label="Email"

        name="email"

        type="email"

        value={values.email}

        onChange={handleChange}

        placeholder="Enter email"

      />



      <InputField

        label="Phone"

        name="phone"

        value={values.phone}

        onChange={handleChange}

        placeholder="Enter phone number"

      />



      <InputField

        label="Address"

        name="address"

        value={values.address}

        onChange={handleChange}

        placeholder="Enter address"

      />



      <InputField

        label="GST Number"

        name="gstNumber"

        value={values.gstNumber}

        onChange={handleChange}

        placeholder="Enter GST number"

      />



      <SelectField

        label="Status"

        name="status"

        value={values.status}

        onChange={handleChange}

        options={[
          {
            value: "ACTIVE",
            label: "Active"
          },
          {
            value: "INACTIVE",
            label: "Inactive"
          }
        ]}

      />



      <Button
        type="submit"
      >
        Save Vendor
      </Button>



    </FormContainer>

  );

};


export default VendorForm;