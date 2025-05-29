// import React, { useEffect } from 'react'
// import { cartData } from '../Data/CartData'
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import TotalItems from './TotalItems';
// import { useSelector , useDispatch } from 'react-redux';
// import { setTotalItems } from '../../slices/cartSlice';

// const Cart = () => {
//   const dispatch = useDispatch()
//   const {totalItems } = useSelector((state) => state.cart)

//   dispatch(setTotalItems(cartData.length))
//   console.log(totalItems);

//   const handleDelete = (txt) => {
//     console.log(txt);
//     dispatch(setTotalItems(cartData.filter((item) => item.id !== txt)))
//   }
  

  
//   return (
//     <div className='w-screen h-auto bg-[#000814]'>
//         <div className="cart max-w-[86vw] ml-auto mt-16 p-14  h-auto">
//            <h1 className='text-3xl font-semibold text-white '>Cart</h1>
//            <div className="dd flex gap-14">
//             <div className="d flex flex-col gap-8">
//            {cartData.map((item , index) => (
//            <div key={index} className="courses flex gap-28 items-center mt-20">
           
//               <div className="img">
//                 <img src={item.img} className='object-cover h-42' alt="" />
//               </div>
//               <div className="info mb-20">
//                 <p className='text-xl font-semibold text-white'>{item.head}</p>
//                 <p className='text-lg font-[550] text-[#AFB2BF]'>{item.head2}</p>
//                 <p className='text-lg font-[550] text-[#AFB2BF]'>{item.rating}</p>
//               </div>
//               <div className="p mb-10">
//                 <div className="btn">
//                   <button onClick={() => handleDelete(item.id)} className='w-[130px]  border-[1px] bg-[#161D29] h-[50px] font-semibold text-red-400 border-white rounded-lg  flex justify-center items-center gap-2'>
//                   <RiDeleteBin5Fill/>
//                     Remove
                    
//                   </button>
//                   <div className="p text-3xl mt-7 font-semibold text-[#FFD60A]">{`$ ${item.price}`}</div>
//                 </div>
//               </div>
          
//            </div>
        
//            ))}
//              </div>
//            <div className="d mt-20">
//              <TotalItems/>
//              </div>
//              </div>
//         </div>
      
//     </div>
//   )
// }

// export default Cart

// components/Cart.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartData } from '../Data/CartData';
import { setCartItems, setTotalItems, removeItem } from '../../slices/cartSlice';
import { RiDeleteBin5Fill } from "react-icons/ri";
import TotalItems from './TotalItems';
import { setCount } from '../../slices/authSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalItems } = useSelector((state) => state.cart);
  const {count} = useSelector(( state) => state.auth)
  const {val , setval} = useState(0)
  useEffect(() => {
    if (cartItems.length === 0) {
      dispatch(setCartItems(cartData));
      dispatch(setTotalItems(cartData.length));
    }
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className='w-screen h-auto bg-[#000814]'>
      <div className="cart max-w-[86vw] ml-auto mt-16 p-14 h-auto">
        <h1 className='text-3xl font-semibold text-white'>Cart</h1>
        <div className="dd flex gap-14">
          <div className="d flex flex-col gap-8">
            {cartItems.map((item, index) => (
              <div key={index} className="courses flex gap-28 items-center mt-20">
                <div className="img">
                  <img src={item.img} className='object-cover h-42' alt="" />
                </div>
                <div className="info mb-20">
                  <p className='text-xl font-semibold text-white'>{item.head}</p>
                  <p className='text-lg font-[550] text-[#AFB2BF]'>{item.head2}</p>
                  <p className='text-lg font-[550] text-[#AFB2BF]'>{item.rating}</p>
                </div>
                <div className="p mb-10">
                  <div className="btn">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className='w-[130px] border-[1px] bg-[#161D29] h-[50px] font-semibold text-red-400 border-white rounded-lg flex justify-center items-center gap-2'
                    >
                      <RiDeleteBin5Fill />
                      Remove
                    </button>
                    <div className="p text-3xl mt-7 font-semibold text-[#FFD60A]">
                      {`$ ${item.price}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d mt-20">
            <TotalItems />
          </div>
        </div>
        {/* <input type="text"  
         className='h-[60px] cursor-pointer w-[10vw] p-2 flex justify-center items-center border-2 border-black bg-red-400 text-2xl font-bold' 
          value={val}
          onChange={(e) => setval(e.target.value)}
         />
         
        <button  className='h-[60px] cursor-pointer w-[10vw] p-2 flex justify-center items-center border-2 border-black bg-red-400 text-2xl font-bold'>{count}</button>
        <button onClick={() => dispatch(setCount(val))} className='h-[60px] cursor-pointer w-[10vw] p-2 flex justify-center items-center border-2 border-black bg-red-400 text-2xl font-bold'>Click</button> */}
      </div>
    </div>
  );
};

export default Cart;
