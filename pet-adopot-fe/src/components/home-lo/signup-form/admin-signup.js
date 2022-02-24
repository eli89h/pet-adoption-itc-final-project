import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AdminSignup() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [userValidPassword, setUserValidPassword] = useState(false);

  const handleSignup = async (data) => {
    try {
      const user = await axios.post(
        `https://eli-server.herokuapp.com/users/admin`,
        {
          firstName: data.firstName,
          email: data.email,
          password: data.password,
          name: data.name,
        }
      );
      console.log(user.data);
      //localStorage.setItem("user", JSON.stringify(user.data));
     // return user.data;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    if (data.password === data.validatePassword) {
      //console.log(data);
      await handleSignup(data);
      setUserValidPassword(false);
    } else {
      setUserValidPassword(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Name"
          {...register("name", { required: true })}
        />
        {errors.name?.type === "required" && "Name is required"}

        {errors.lastName?.type === "required" && "Last name is required"}
        <input placeholder="Email" {...register("email", { required: true })} />
        {errors.password?.type === "required" && "Email is required"}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && "Password is required"}

        <input
          type="password"
          placeholder="Validate Password"
          {...register("validatePassword", {})}
        />
        {errors.validatePassword?.type === "required" &&
          "Validation is required"}

        <input type="submit" />
        {userValidPassword ? (
          <div class="text-danger">Passwords Don't Match</div>
        ) : null}
      </form>
    </div>
  );
}
