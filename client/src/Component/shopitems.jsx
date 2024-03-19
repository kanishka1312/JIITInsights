/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react'
import { ShopContext } from './shopcontext';
import { PRODUCTS, PRODUCTS1 } from './products';
import Prod from './prod';

const shopitems = () => {
  return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
        {[...PRODUCTS, ...PRODUCTS1].map((product) => (
          <Prod key={product.id} data={product} />
        ))}
      </div>
  );
};


export default shopitems;