import { useState } from "react";


const useForm = (initialValues = {}) => {


  const [values, setValues] = useState(
    initialValues
  );



  const handleChange = (event) => {


    const {
      name,
      value
    } = event.target;



    setValues((previous) => ({

      ...previous,

      [name]: value

    }));


  };



  const setFieldValue = (name, value) => {


    setValues((previous) => ({

      ...previous,

      [name]: value

    }));


  };



  const resetForm = () => {


    setValues(
      initialValues
    );


  };



  return {


    values,

    setValues,

    handleChange,

    setFieldValue,

    resetForm


  };


};



export default useForm;