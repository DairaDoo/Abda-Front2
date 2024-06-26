import React, { useState } from 'react';
import OrderForm from '../order/orderForm';

const CheckoutContainer = () => {
  const [showForm, setShowForm] = useState(false);

  return (
      <div>
          <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => setShowForm(!showForm)}
          >
              Proceed to Checkout
          </button>
          {showForm && <OrderForm />} 
      </div>
  );
};

export default CheckoutContainer;
