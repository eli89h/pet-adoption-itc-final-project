import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { login } from "../../../middleware/admin-auth";
import { useHistory } from "react-router";


export default function AdminLogin() {

  const history = useHistory();

  const handleLogin = async (data) => {
    try {
      console.log(data);
      const admin = await axios.post(
        `https://eli-server.herokuapp.com/admin/login`,
        data
      );
      return admin.data;
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
    const adminData = await handleLogin(data);
    login(history, adminData);
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

