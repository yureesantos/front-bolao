import React from "react";
import style from "./scss/Landing.module.scss";
import { Route } from "react-router-dom";

import NavBar from "./NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Logout from "../Login/Logout";
import Dashboard from "../Dashboard/Dashboard";
import Country from "../Country/Country";

const Landing = () => {
  return (
    <div className={style.landing}>
      <NavBar />
      <Route path="/signup" exact component={Signup} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/countries" component={Country} />
      <Route path="/" exact component={Login} />
    </div>
  );
};

export default Landing;
