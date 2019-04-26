import React from "react";
import spinner from "../images/spinner.svg";
import style from "./scss/Spinner.module.scss";

const Spinner = props => {
  return (
    <div className={style.spinner}>
      <img src={spinner} alt="Loading Spinner" />
    </div>
  );
};

export default Spinner;
