import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import TopNav from "./components/TopNav";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        
            <CartProvider>
        <TopNav />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/cart" element={<Cart />} />
          </Routes>
            </CartProvider>
        
      </div>
    </>
  );
}

export default App;
