
// import React from 'react';
// import { Sidebardata } from '../Data/ProfileSidebarData';
// import { Link, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { CgMenuRound } from "react-icons/cg";
// import { setLogoutState } from '../../slices/ProfileSlice';


// const Sidebar = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const {user , hideMenu} = useSelector((state) => state.profile)


//   return (
//     <div className="w-[14vw] z-50 hidden  fixed top-0 left-0 h-screen bg-[#161D29]  pt-16 p-4 md:flex flex-col gap-2 text-center">
//       {Sidebardata.map((item, index) => {
//          if (item.type && user?.accountType !== item.type) return null
//         const isActive = location.pathname === item.path;

    
//         if (item.title === "Logout") {
//           return (
//             <div
//               key={index}
//               onClick={() => dispatch(setLogoutState(true))}
//               className={`cursor-pointer flex font-[450] text-lg mt-4 text-[#838894] gap-3 items-center justify-start px-2 py-4 transition-all duration-200 ${
//                 isActive ? 'bg-[#3D2A01] text-[#FFD60A]' : ''
//               }`}
//             >
//               <div className="icon">{item.icon}</div>
//               <div className="para">{item.title}</div>
//             </div>
//           );
//         }

//         return (
//           <Link to={item.path} key={index}>
//             <div
//               className={`flex font-[450] text-lg mt-4 text-[#838894] gap-3 items-center justify-start px-2 py-4 transition-all duration-200 ${
//                 isActive ? 'bg-[#3D2A01] text-[#FFD60A]' : ''
//               }`}
//             >
//               <div className="icon">{item.icon}</div>
//               <div className="para">{item.title}</div>
//             </div>
//           </Link>
//         );
//       })}
      
//     </div>

//   );


  
// };

// export default Sidebar;


import React from 'react';
import { Sidebardata } from '../Data/ProfileSidebarData';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogoutState } from '../../slices/ProfileSlice';
import { CgMenuRound } from "react-icons/cg";
import { RxCrossCircled } from "react-icons/rx";
import { setMenu } from '../../slices/ProfileSlice';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, hideMenu } = useSelector((state) => state.profile);
  

     const handleMenu = () => {
      dispatch(setMenu(!hideMenu));
     }

  // Reusable Sidebar Item
  const renderSidebarItem = (item, index) => {
    const isActive = location.pathname === item.path;
    const itemClasses = `flex font-[450] text-lg mt-4 text-[#838894] gap-3 items-center justify-start px-2 py-4 transition-all duration-200 ${
      isActive ? 'bg-[#3D2A01] text-[#FFD60A]' : ''
    }`;

    if (item.title === "Logout") {
      return (
        <div
          key={index}
          onClick={() => dispatch(setLogoutState(true))}
          className={`cursor-pointer ${itemClasses}`}
        >
          <div className="icon">{item.icon}</div>
          <div className="para">{item.title}</div>
        </div>
      );
    }

    return (
      <Link to={item.path} key={index}>
        <div className={itemClasses}>
          <div className="icon">{item.icon}</div>
          <div className="para">{item.title}</div>
        </div>
      </Link>
    );
  };

  return (
    <>

      <div onClick={handleMenu} className="icon flex md:hidden text-4xl font-bold  h-screen text-white fixed z-[100] top-16 left-5">
           {hideMenu ?  <CgMenuRound/> : <RxCrossCircled/>} 
          </div>
    
      
      <div className="w-[14vw] z-50 hidden fixed top-0 left-0 h-screen bg-[#161D29] pt-16 p-4 md:flex flex-col gap-2 text-center">
        {Sidebardata.map((item, index) => {
          if (item.type && user?.accountType !== item.type) return null;
          return renderSidebarItem(item, index);
        })}
      </div>

      
      {!hideMenu && (
        <div className="w-[70vw] z-50 fixed top-0 left-0 h-screen bg-[#161D29] pt-16 p-4 md:hidden flex flex-col gap-2 text-center">
          {Sidebardata.map((item, index) => {
            if (item.type && user?.accountType !== item.type) return null;
            return renderSidebarItem(item, index);
          })}
        </div>
      )}
    </>
  );
};

export default Sidebar;
