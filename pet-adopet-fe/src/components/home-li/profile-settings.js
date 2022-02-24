import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ProfileSettings() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [userValidPassword, setUserValidPassword] = useState(false);
  const [updatedDetail, setUpdatedDetail] = useState(false);

  const onSubmit = (data) => {
    if (data.password === data.validatePassword) {
      console.log(data);
      setUserValidPassword(false);
    } else {
      setUserValidPassword(true);
    }
    handleUpdate(data);
  };

  const handleUpdate = async (data) => {
    const userLogged = JSON.parse(localStorage.getItem("user"));
    //console.log(userLogged);
    try {
      const updateUser = await axios.put(
        `https://eli-server.herokuapp.com/users/${userLogged.appUserId}`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          email: data.email,
          phone: data.phone,
          bio: data.bio,
        },
        {
          headers: {
            authorization: userLogged.token,
          },
        }
      );
      console.log(updateUser.data);
      localStorage.setItem("user", JSON.stringify(updateUser.data));
      setUpdatedDetail(updateUser.data.text);
      return updateUser.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(userValidPassword);
  }, [userValidPassword]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="First Name"
          {...register("firstName", { required: true })}
        />
        {errors.firstName?.type === "required" && "First name is required"}
        <input
          placeholder="Last Name"
          {...register("lastName", { required: true })}
        />
        {errors.lastName?.type === "required" && "Last name is required"}
        <input placeholder="Email" {...register("email", { required: true })} />
        {errors.password?.type === "required" && "Email is required"}
        <input
          type="text"
          placeholder="Bio"
          {...register("bio", { required: true })}
        />
        {errors.bio?.type === "required" && "Bio is required"}
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
        <input placeholder="Phone" {...register("phone", { required: true })} />
        {errors.phone?.type === "required" && "Phone is required"}

        <input type="submit" />
        {userValidPassword ? (
          <div class="text-danger">Passwords Don't Match</div>
        ) : null}
      </form>
      {updatedDetail ? (
        <div class="text-danger">User Detail Updated!</div>
      ) : null}
    </div>
  );
}
