// // import React, { useEffect } from 'react'
// // import { cartData } from '../Data/CartData'
// // import { RiDeleteBin5Fill } from "react-icons/ri";
// // import TotalItems from './TotalItems';
// // import { useSelector , useDispatch } from 'react-redux';
// // import { setTotalItems } from '../../slices/cartSlice';

// // const Cart = () => {
// //   const dispatch = useDispatch()
// //   const {totalItems } = useSelector((state) => state.cart)

// //   dispatch(setTotalItems(cartData.length))
// //   console.log(totalItems);

// //   const handleDelete = (txt) => {
// //     console.log(txt);
// //     dispatch(setTotalItems(cartData.filter((item) => item.id !== txt)))
// //   }
  

  
// //   return (
// //     <div className='w-screen h-auto bg-[#000814]'>
// //         <div className="cart max-w-[86vw] ml-auto mt-16 p-14  h-auto">
// //            <h1 className='text-3xl font-semibold text-white '>Cart</h1>
// //            <div className="dd flex gap-14">
// //             <div className="d flex flex-col gap-8">
// //            {cartData.map((item , index) => (
// //            <div key={index} className="courses flex gap-28 items-center mt-20">
           
// //               <div className="img">
// //                 <img src={item.img} className='object-cover h-42' alt="" />
// //               </div>
// //               <div className="info mb-20">
// //                 <p className='text-xl font-semibold text-white'>{item.head}</p>
// //                 <p className='text-lg font-[550] text-[#AFB2BF]'>{item.head2}</p>
// //                 <p className='text-lg font-[550] text-[#AFB2BF]'>{item.rating}</p>
// //               </div>
// //               <div className="p mb-10">
// //                 <div className="btn">
// //                   <button onClick={() => handleDelete(item.id)} className='w-[130px]  border-[1px] bg-[#161D29] h-[50px] font-semibold text-red-400 border-white rounded-lg  flex justify-center items-center gap-2'>
// //                   <RiDeleteBin5Fill/>
// //                     Remove
                    
// //                   </button>
// //                   <div className="p text-3xl mt-7 font-semibold text-[#FFD60A]">{`$ ${item.price}`}</div>
// //                 </div>
// //               </div>
          
// //            </div>
        
// //            ))}
// //              </div>
// //            <div className="d mt-20">
// //              <TotalItems/>
// //              </div>
// //              </div>
// //         </div>
      
// //     </div>
// //   )
// // }

// // export default Cart

// // components/Cart.jsx
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { cartData } from '../Data/CartData';
// import { setCartItems, setTotalItems, removeItem } from '../../slices/cartSlice';
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import TotalItems from './TotalItems';
// import { setCount } from '../../slices/authSlice';

// const Cart = () => {
//   const dispatch = useDispatch();
//   const { cartItems, totalItems } = useSelector((state) => state.cart);
//   const {count} = useSelector(( state) => state.auth)
//   const {val , setval} = useState(0)
//   useEffect(() => {
//     if (cartItems.length === 0) {
//       dispatch(setCartItems(cartData));
//       dispatch(setTotalItems(cartData.length));
//     }
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(removeItem(id));
//   };

//   return (
//     <div className='w-screen h-auto bg-[#000814]'>
//       <div className="cart max-w-[86vw] ml-auto mt-16 p-14 h-auto">
//         <h1 className='text-3xl font-semibold text-white'>Cart</h1>
//         <div className="dd flex gap-14">
//           <div className="d flex flex-col gap-8">
//             {cartItems.map((item, index) => (
//               <div key={index} className="courses flex gap-28 items-center mt-20">
//                 <div className="img">
//                   <img src={item.thumbnail
// } className='object-cover h-42' alt="" />
//                 </div>
//                 <div className="info mb-20">
//                   <p className='text-xl font-semibold text-white'>{item.
// courseName}</p>
//                   <p className='text-lg font-[550] text-[#AFB2BF]'>{item.head2}</p>
//                   <p className='text-lg font-[550] text-[#AFB2BF]'>{item.rating}</p>
//                 </div>
//                 <div className="p mb-10">
//                   <div className="btn">
//                     <button
//                       onClick={() => handleDelete(item.id)}
//                       className='w-[130px] border-[1px] bg-[#161D29] h-[50px] font-semibold text-red-400 border-white rounded-lg flex justify-center items-center gap-2'
//                     >
//                       <RiDeleteBin5Fill />
//                       Remove
//                     </button>
//                     <div className="p text-3xl mt-7 font-semibold text-[#FFD60A]">
//                       {`$ ${item.price}`}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="d mt-20">
//             <TotalItems />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Cart;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartData } from '../Data/CartData';
import { setCartItems, setTotalItems, removeItem } from '../../slices/cartSlice';
import { RiDeleteBin5Fill } from "react-icons/ri";
import TotalItems from './TotalItems';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // useEffect(() => {
  //   if (cartItems.length === 0) {
  //     dispatch(setCartItems(cartData));
  //     dispatch(setTotalItems(cartData.length));
  //   }
  // }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="max-w-[80vw] ml-auto min-h-screen bg-[#000814] text-white py-16 mt-16 px-6 md:px-20">
      <h1 className="text-4xl font-bold mb-10 border-b border-gray-700 pb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-3xl flex justify-center items-center font-semibold">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Cart Items */}
          <div className="flex flex-col gap-10 w-full lg:w-2/3">
            {cartItems.map((item) => (
              <div key={item._id} className="flex gap-6 bg-[#161D29] p-6 rounded-lg shadow-md">
                
                <img
                  src={item.thumbnail}
                  alt={item.courseName}
                  className="h-28 w-36 rounded-md object-cover"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{item.courseName}</h2>
                    <p className="text-sm text-gray-400 mt-1">Instructor: {item.Instructor?.firstName} {item.Instructor?.lastName}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[#FFD60A] text-lg font-semibold">${item.price}</span>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 border border-white rounded hover:bg-red-800/10"
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
