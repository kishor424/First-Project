import { Link } from "react-router-dom";
import { LOG_URL } from "../utills/contants";
import { useState,useEffect } from "react";
import useOnlineStatus from "../utills/useOnlineStatus";

const Header = () => {
const [btnNameReact,setBtnNameReact]=useState("Login")

  const OnlineStatus = useOnlineStatus()

    return (
      <div className="header">
        <div className="logo-container">
          <img
            className="logo"
            src={LOG_URL}
          />
        </div>
        <div className="nav-items">
          <ul>
          <li> Online Status: {OnlineStatus ? "👍" : "😡"} </li>
          <li> <Link to="/">Home</Link>  </li>
           <li> <Link to="/about">About Us</Link> </li>      
           <li> <Link to="/contact">Contact Us</Link> </li>    
           <li> <Link to="/grocery">Grocery</Link> </li>    
            <li>Cart</li>
            <button className="login" 
            onClick={() => { 
              btnNameReact === "Login" 
              ? setBtnNameReact("Logout")
              : setBtnNameReact("Login")
            }}
            >{btnNameReact}</button>
          </ul>
        </div>
      </div>
    );
  };
  export default Header;