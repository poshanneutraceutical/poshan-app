import React from "react";
import InputField from "../Common/InputField";
import SelectField from "../Common/SelectField";
import TextArea from "../Common/TextArea";
import Checkbox from "../Common/Checkbox";


const DynamicField = ({
  field,
  value,
  onChange,
  error
}) => {


  switch (field.type) {


    case "select":

      return (

        <SelectField

          label={field.label}

          name={field.name}

          value={value}

          onChange={onChange}

          options={field.options || []}

          required={field.required}

          error={error}

        />

      );



    case "textarea":

      return (

        <TextArea

          label={field.label}

          name={field.name}

          value={value}

          onChange={onChange}

          placeholder={field.placeholder}

          required={field.required}

          error={error}

        />

      );




    case "checkbox":

      return (

        <Checkbox

          label={field.label}

          name={field.name}

          checked={value}

          onChange={onChange}

          error={error}

        />

      );




    default:

      return (

        <InputField

          label={field.label}

          name={field.name}

          type={field.type || "text"}

          value={value}

          onChange={onChange}

          placeholder={field.placeholder}

          required={field.required}

          error={error}

        />

      );


  }


};


export default DynamicField;