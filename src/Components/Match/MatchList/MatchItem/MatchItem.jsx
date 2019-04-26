import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as Actions from "../../../../store/actions/index";
import Button from "../../../Layout/Button";
import style from "./MatchItem.module.scss";

const MatchItem = props => {
  const onDelete = matchID => {
    props.matchDel(matchID);
  };
  const onFinish = matchID => {
    props.matchFin(matchID);
  };

  return (
    <div className={style.matchItem}>
      <div className={style.teamA}>
        <div className={style.name}>{props.teamA.name}</div>
        <img
          className={style.logo}
          src={props.teamA.url}
          alt={`Logo do ${props.name}`}
        />
        <div className={style.result}>{props.resultA}</div>
      </div>
      <div className={style.teamB}>
        <div className={style.name}>{props.teamB.name}</div>
        <img
          className={style.logo}
          src={props.teamB.url}
          alt={`Logo do ${props.name}`}
        />
        <div className={style.result}>{props.resultB}</div>
      </div>
      <div className={style.desc}>{props.desc}</div>
      <div className={style.buttons}>
        <Link to={`${props.url}/edit-match/${props._id}`}>
          <Button btStyle="edit">Editar</Button>
        </Link>
        <Button clicked={() => onFinish(props._id)} btStyle="finish">
          Encerrar
        </Button>
        <div className={style.remove}>
          <Button clicked={() => onDelete(props._id)} btStyle="remove">
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchtoProps = dispatch => {
  return {
    matchDel: matchID => dispatch(Actions.matchDel(matchID)),
    matchFin: matchID => dispatch(Actions.matchFin(matchID))
  };
};

export default connect(
  null,
  mapDispatchtoProps
)(MatchItem);
