import React from "react";
import { Link } from "react-router-dom";
import "../style/HomePage.css";

const LinkLoginReg = ({ user }) => {
  return (
    <div className= "nav">
      <Link className="link sign-in" to="/sign-in">
        SIGN IN
      </Link>
      <Link className="link sign-up" to="/sign-up">
        SIGN UP
      </Link>
    </div>
  );
};

export default LinkLoginReg;
