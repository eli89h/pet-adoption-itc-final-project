// TODO:
// Should have a link to → My Pets Page
// Has access to navigate to profile settings
//

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProfileSettings from "./profile-settings";
import MyPets from "../../pages/my-pets";
import SearchBar from "../search/search-bar";
import AdminLogin from "../home-lo/login-form/admin-login";


export default function HeaderLoggedIn() {


  const userLogged = JSON.parse(localStorage.getItem("user"));
  console.log(userLogged);

  return (
    <div>
      <Router>
        <h1>
          {"Hello " +
            userLogged.appUserFirstName +
            " " +
            userLogged.appUserLastName}
        </h1>
        <ul>
          <li>
            <Link to="/my-pets">My Pets</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/profile-settings">Profile Settings</Link>
          </li>
          {/* <li>
            <Link to="/admin-login">Admin Login</Link>
          </li> */}
        </ul>
        <Switch>
          <Route exact path="/my-pets">
            <MyPets />
          </Route>

          <Route exact path="/search">
            <SearchBar />
          </Route>

          <Route exact path="/profile-settings">
            <ProfileSettings />
          </Route>
          {/* <Route exact path="/admin-login">
            <AdminLogin />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
}
