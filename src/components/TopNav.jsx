import React, { useContext } from "react";
import logo from "../assets/logo.jpg";
import { LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const history = useNavigate();
  const { cart } = useCart() ?? 0;


  return (
    <div className="header-container">
      <div>
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div>
        <ul className="nav-items-container">
          <li onClick={() => history("/")}>Home</li>
          <li>Products</li>
        </ul>
      </div>
      <div className="items-container">
        <button onClick={() => history("/cart")}>
          <ShoppingCartOutlined size={100} />
          {cart?.length > 0 && <sup>{cart.length}</sup>}
        </button>
        <button onClick={() => handleLogout()}>
          <LogoutOutlined />
        </button>
      </div>
    </div>
  );
};

export default TopNav;
