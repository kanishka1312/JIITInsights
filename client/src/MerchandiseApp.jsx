import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Details from './pages/details';
import ShopContext from './Component/shopcontext'; // Adjust the import path

function MerchandiseApp() {
  return (
    <ShopContext>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="details" element={<Details />} />
        {/* Add more routes for other merchandise-related pages */}
      </Routes>
    </ShopContext>
  );
}

export default MerchandiseApp;