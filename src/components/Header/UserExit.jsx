import React from "react";
import exit from "../icon/exit.svg";
import '../style/Header.css'

const UserExit = ({ user, setUser }) => {
  const removeUser = () => {
    window.location.reload()
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
  };
  return (
    <div className='nav2'>
      <div className="user">{user}</div>
      <img src={exit} className="exit" onClick={() => removeUser()} alt=''/>
    </div>
  );
};

export default UserExit;
