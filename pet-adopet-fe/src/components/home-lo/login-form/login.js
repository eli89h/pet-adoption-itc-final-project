import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
//import PropTypes from "prop-types";
import { login } from "../../../middleware/auth";
//import AppContext from "../../../context/AppContext";
import { useHistory } from "react-router";


export default function Login() {

  const history = useHistory();

  const handleLogin = async (data) => {
    try {
      console.log(data);
      const user = await axios.post(
        `https://eli-server.herokuapp.com/users/login`,
        data
      );
      //console.log(user.data);
      localStorage.setItem("user", JSON.stringify(user.data));
      return user.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    const userData = await handleLogin(data);
    login(history, userData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register("email", { required: true })} />
        {errors.firstName?.type === "required" && "email is required"}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };
