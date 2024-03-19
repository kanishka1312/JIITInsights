import React from 'react'
import Productdetails from '../Component/productdetails'
import '../App.css';

const details = () => {
  return<>
  <section className="product-details p-5">
    <div className="conntainer-xxl">
        <div className="row">
        <Productdetails />
        </div>
    </div>
  </section>
  </>
}

export default details