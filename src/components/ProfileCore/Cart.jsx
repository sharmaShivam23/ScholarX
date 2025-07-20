

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../slices/cartSlice';
import { RiDeleteBin5Fill } from "react-icons/ri";
import TotalItems from './TotalItems';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="sm:max-w-[85vw] w-full sm:ml-auto min-h-screen bg-[#000814] text-white py-16 px-4 sm:px-8 md:px-20 mt-16">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 border-b border-gray-700 pb-4 text-center md:text-left">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-xl sm:text-2xl md:text-3xl text-center font-semibold">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Cart Items */}
          <div className="flex flex-col gap-6 w-full lg:w-2/3">
            
            {cartItems.map((item) => (
  <div
    key={item._id}
    className="flex flex-col sm:flex-row gap-4 bg-[#161D29] p-4 sm:p-6 rounded-lg shadow-md"
  >
    {/* Thumbnail */}
    <div className="i">
    <img
      src={item.thumbnail}
      alt={item.courseName}
      className="h-40 sm:h-28 w-full sm:w-36 rounded-md object-cover"
    />

    <div className="date flex justify-center  text-sm items-center mt-6">
      Created At :-  {new Date(item.createdAt).toLocaleDateString()}
    </div>

    </div>

  

    {/* Course Info */}
    <div className="flex-1 flex flex-col justify-between gap-3">
      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-semibold">{item?.courseName || "HTML"}</h2>
        <p className="text-sm text-gray-400">
          Instructor: {item?.Instructor?.firstName} {item?.Instructor?.lastName}
        </p>

        {/* Description aligned properly below */}
        <p className="text-sm text-gray-300 mt-2 line-clamp-3">
          {item.courseDescription}
        </p>
      </div>

      {/* Price and Remove Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
        <span className="text-[#FFD60A] text-lg font-semibold">${item.price}</span>

        <button
          onClick={() => handleDelete(item._id)}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-400 border border-white rounded hover:bg-red-800/10 transition"
        >
          <RiDeleteBin5Fill size={18} />
          Remove
        </button>
      </div>
    </div>
  </div>
))}

          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-1/3">
            <TotalItems />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
