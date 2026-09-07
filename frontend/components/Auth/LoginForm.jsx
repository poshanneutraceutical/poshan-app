import React, { useState } from "react";
import InputField from "../Common/InputField";
import Button from "../Common/Button";
import Alert from "../Common/Alert";


const LoginForm = ({
  onSubmit,
  loading = false,
  error
}) => {


  const [formData, setFormData] = useState({

    username: "",

    password: ""

  });




  const handleChange = (event) => {


    setFormData({

      ...formData,

      [event.target.name]:
        event.target.value

    });


  };





  const handleSubmit = (event) => {


    event.preventDefault();


    onSubmit(formData);


  };





  return (

    <form

      onSubmit={handleSubmit}

      className="
        space-y-4
      "

    >



      {
        error && (

          <Alert

            type="error"

            message={error}

          />

        )
      }




      <InputField

        label="Username"

        name="username"

        value={formData.username}

        onChange={handleChange}

        required

      />




      <InputField

        label="Password"

        name="password"

        type="password"

        value={formData.password}

        onChange={handleChange}

        required

      />





      <Button

        type="submit"

        loading={loading}

        className="w-full"

      >

        Login

      </Button>



    </form>

  );

};


export default LoginForm;