import "./App.css";
import React, { useEffect, useState, useMemo } from "react";
import HomeLoggedOut from "./pages/home-lo";
import HomeLoggedIn from "./pages/home-li";
import Pet from "./pages/pet";
import { UserContext } from "./hooks/user-context";
import PublicRoute from "./hooks/public-route";
import PrivateRoute from "./hooks/private-route";
import ProfileSettings from "./components/home-li/profile-settings";
import Dashboard from "./pages/admin/dashboard";
import Login from "./components/home-lo/login-form/login";
import SignupModal from "./components/home-lo/signup-modal";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import AppContext from "./context/AppContext";
import AddPet from "./pages/admin/add-pet";
import AdminSignup from "./components/home-lo/signup-form/admin-signup";
import SearchBar from "./components/search/search-bar";

export default function App() {
  const [user, setUser] = useState(null);
  const userValues = useMemo(() => ({ user, setUser }), [user, setUser]);
  console.log(userValues);
  // const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {/* <HomeLoggedOut /> */}
      <BrowserRouter>
        <UserContext.Provider value={userValues}>
          <Switch>
            <PublicRoute
              restricted={false}
              component={HomeLoggedOut}
              //component={Dashboard}
             //component={Dashboard}
              path="/"
              exact
            />

            <PrivateRoute component={HomeLoggedIn} path="/logged" exact />
            <PrivateRoute component={Dashboard} path="/admin-logged" exact />
            <PrivateRoute
              component={AddPet}
              path="/admin-logged-addpet"
              exact
            />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
