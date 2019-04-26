import React from "react";
import style from "./Landing.module.scss";
import { Route } from "react-router-dom";

import NavBar from "../Layout/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Logout from "../Login/Logout";
import Dashboard from "../Dashboard/Dashboard";
import Country from "../Country/Country";

const Landing = () => {
  return (
    <div className={style.background}>
      <div className={style.landing}>
        <NavBar />
        <Route path="/signup" exact component={Signup} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/countries" component={Country} />
        <Route path="/" exact component={Login} />
      </div>
    </div>
  );
};

export default Landing;
