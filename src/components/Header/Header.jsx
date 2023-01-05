import React, {useState} from "react";
import logo from "../icon/logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import { FormSignIn } from "../FormSignIn/FormSignIn";
import { FormSignUp } from "../FormSignUp/FormSignUp";
import LinkLoginReg from "./LinkLoginReg";
import UserExit from "./UserExit";
import '../style/Header.css';
import "../style/adaptive.css";

const Header = () => {
  const [user, setUser] = useState(localStorage.getItem('user'))

  return (
    <>
      <header className="header">
        <div className="contain">
          <div>
            <Link to="/">
              <img className="logo" src={logo} alt="" />
            </Link>
          </div>
          {user? <UserExit user={user} setUser={setUser} />: <LinkLoginReg user={user} />}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<FormSignIn />} />
        <Route path="/sign-up" element={<FormSignUp />} />
      </Routes>
    </>
  );
};

export default Header;
