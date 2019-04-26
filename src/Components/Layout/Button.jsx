import React from "react";
import classnames from "classnames";

import style from "./scss/Button.module.scss";

const Button = props => {
  let ok = null;
  let remove = null;
  let finish = null;
  let formBlack = null;
  let formWhite = null;
  let formBet = null;
  let controlls = null;

  if (props.btStyle === "ok") {
    ok = style.ok;
  }

  if (props.btStyle === "navPage") {
    ok = style.navPage;
  }

  if (props.btStyle === "remove") {
    remove = style.remove;
  }

  if (props.btStyle === "finish") {
    finish = style.finish;
  }

  if (props.btStyle === "formBlack") {
    formBlack = style.formBlack;
  }

  if (props.btStyle === "formWhite") {
    formWhite = style.formWhite;
  }

  if (props.btStyle === "formBet") {
    formBet = style.formBet;
  }

  if (props.btStyle === "edit") {
    formWhite = style.edit;
  }

  if (props.controlls === "yes") {
    controlls = style.controlls;
  }

  return (
    <button
      onClick={props.clicked}
      className={classnames(
        ok,
        remove,
        finish,
        formBlack,
        formWhite,
        controlls,
        formBet
      )}
    >
      {props.children}
    </button>
  );
};

export default Button;
