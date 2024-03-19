import Shopitems from '../Component/shopitems';
import React, { useContext, useState } from 'react'
import { ShopContext } from '../Component/shopcontext'
import { CgShoppingCart } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useLocation} from 'react-router-dom';
import styled from 'styled-components'; 
import '../App.css';

const FloatingCartButton = styled.button`
  position: fixed;
  bottom: 25%;
  top:50%;
  right: 0;
  margin: 40px; 
  background-color: #yourBackgroundColor;
  color: blue;
  border: none;
  padding: 18px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
`;

const shop = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { getTotalCartProducts, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const totalProducts = getTotalCartProducts();
  const location = useLocation();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return <>

   <section className="shop-banner p-5">
  <div className="container-xxl">
    <div className="row justify-content-center align-items-center">
      <div className="col-md-8 col-lg-6 text-center">
        <div className="shop-details">
          <h1 className="text-white"><b className="title-green">Societies</b> Merchandise</h1>
        </div>
      </div>
    </div>
  </div>
</section>
  <section className="featured-products p-5">
    <div className="container-xxl">
      <div className="row">
        <Shopitems />
      </div>
    </div>
  </section>
  <FloatingCartButton className="cart-span fs-3">
        <Link to='cart' className={location.pathname === '/merchandise/cart' ? 'active' : 'not-active'}>
          <CgShoppingCart />
          <b><span>{totalProducts}</span></b>
        </Link>
  </FloatingCartButton>
  </>;
}

export default shop