import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Component/Footer';
import Header from './Component/Header';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import NotFound from './Screens/NotFound';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import { useState } from 'react';
import CartScreen from './Screens/CartScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentMethod from './Screens/PaymentMetod';
import CheckoutScreen from './Screens/CheckoutScreen';

function App() {
  const [cartItems, setcartItems] = useState(JSON.parse(localStorage.getItem("cartItems") || "[]"));
  return (
    <BrowserRouter>
      <div className="App">
        <Header cartItems={cartItems} setcartItems={setcartItems}/>
        <main style={{ minHeight: "86.3vh" }}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/product/:id" element={<ProductScreen cartItems={cartItems} setcartItems={setcartItems} />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/cart" element={<CartScreen cartItems={cartItems} setcartItems={setcartItems} />} />
            <Route path="/paymentMethod" element={<PaymentMethod cartItems={cartItems}/>} />
            <Route path="/checkout" element={<CheckoutScreen cartItems={cartItems} setcartItems={setcartItems} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
