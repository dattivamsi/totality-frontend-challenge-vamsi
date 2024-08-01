import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import TopNav from "./components/TopNav";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <CartProvider>
      <div className="App">
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
