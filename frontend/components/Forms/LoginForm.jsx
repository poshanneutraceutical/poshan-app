import React from "react";
import InputField from "../Common/InputField";
import Button from "../Common/Button";
import useForm from "../../hooks/useForm";


const LoginForm = ({
  onSubmit
}) => {


  const {
    values,
    handleChange
  } = useForm({

    username: "",

    password: ""

  });



  const submitHandler = (event) => {

    event.preventDefault();

    onSubmit(values);

  };



  return (

    <form
      onSubmit={submitHandler}
      className="space-y-4"
    >


      <InputField

        label="Username"

        name="username"

        value={values.username}

        onChange={handleChange}

        placeholder="Enter username"

        required

      />



      <InputField

        label="Password"

        name="password"

        type="password"

        value={values.password}

        onChange={handleChange}

        placeholder="Enter password"

        required

      />



      <Button
        type="submit"
        className="w-full"
      >

        Login

      </Button>



    </form>

  );

};


export default LoginForm;