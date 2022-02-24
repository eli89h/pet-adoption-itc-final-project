import React, { useEffect, useState } from "react";
//import Header from "../components/home-lo/header";
import SignupModal from "../components/home-lo/signup-modal";
import LoginBtn from "../components/home-lo/login-btn";
import Service from "../components/home-lo/service-paragraph";
import AdminLogin from "../components/home-lo/login-form/admin-login";

export default function HomeLoggedOut(props) {
  return (
    <>
      <p>
        Admin Login:
        <AdminLogin />
      </p>
      <p>
        User Login:
        <LoginBtn />
      </p>

      <Service />
      <SignupModal />
    </>
  );
}
