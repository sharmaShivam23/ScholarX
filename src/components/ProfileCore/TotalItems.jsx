import React from 'react';
import { useSelector } from 'react-redux';

const TotalItems = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-[#161D29] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Summary</h2>
      <p className="mb-2 text-gray-300">Total Courses: {cartItems.length}</p>
      <p className="mb-4 text-gray-300">Total Price: <span className="text-[#FFD60A] font-semibold">${totalPrice}</span></p>
      <button className="w-full mt-4 py-2 bg-[#FFD60A] text-black font-semibold rounded hover:bg-yellow-400 transition-all duration-200">
        Checkout
      </button>
    </div>
  );
};

export default TotalItems;
