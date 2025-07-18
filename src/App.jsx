// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Navbar from "./components/common/Navbar";
// import Aboutus from "./pages/Aboutus";
// import Signup from "./components/common/Signup";
// import Login from "./components/common/Login";
// import OTPpage from "./components/common/OTPpage";
// import ForgotPassword from "./pages/ForgotPassword";
// import { ToastContainer, toast } from "react-toastify";
// import UpdatePassword from "./pages/UpdatePassword";
// import { useState } from "react";
// import Profile from "./pages/Profile";
// import UpdateProfile from "./components/ProfileCore/UpdateProfile";
// import PrivateRoute from "./components/cores/Homepage/Auth/PrivateRoute";
// import Layout from "./pages/Layout";
// import EnrolledCourses from "./components/ProfileCore/EnrolledCourses";
// import Cart from "./components/ProfileCore/Cart";
// import Logout from "./pages/Logout";
// import { useSelector } from "react-redux";
// import AddCourse from "./components/AddCourse/AddCourse";
// // import userData from "./store/store";
// import StudentRoute from "./components/cores/Homepage/Auth/StudentRoute";
// import MyCourses from "./pages/MyCourses";
// import Catalog from "./pages/Catalog";
// import EachCourse from "./components/catalogcore/EachCourse";
// import SubVideo from "./components/catalogcore/SubVideo";
// import Footer from "./components/common/Footer";


// function App() {
//   const [updatepasswordToken, setupdatepasswordToken] = useState("");
//   console.log("uptoken", updatepasswordToken);
//    const {logoutState} = useSelector((state) => state.profile)
//     const { user } = useSelector((state) => state.profile);
//     const {courseId} = useSelector((state) => state.Category)

//   return (
    
//    <>
//       <ToastContainer />
//       <Navbar />
//       {/* <Logout/> */}
//       {logoutState && <Logout/>}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<Aboutus />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/otp" element={<OTPpage />} />
//         <Route path="/Catalog/:catalogName" element={<Catalog />} />
//         <Route path={`/catalog/courses/:courseId`} element={<EachCourse />} />
//         <Route path={`/courses/:courseId/lecture`} element={<SubVideo />} />

//         <Route
//           path="/forgotpassword"
//           element={
//             <ForgotPassword setupdatepasswordToken={setupdatepasswordToken} />
//           }
//         />
//         <Route path="/login" element={<Login />} />
       
//         <Route path="/updatepassword/:updatepasswordToken" element={<UpdatePassword />} />


      

//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Layout />
//             </PrivateRoute>
//           }
//         >
//           <Route path="/dashboard/my-profile" element={<Profile />} />
//           <Route path="/dashboard/settings" element={<UpdateProfile/>} />
          

// {
//         user?.accountType === "Student" && (
//           <>
//           <Route path="/dashboard/cart" element={<Cart />} />
//           <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
//           </>
//         )
//       }

//       {
//          user?.accountType === "Instructor" && (
//           <>
//           <Route path="/dashboard/add-course" element={<AddCourse />} />
//           <Route path="/dashboard/my-courses" element={<MyCourses />} />
//           </>
//         )

//       }
        

//         </Route>
//       </Routes>
//       <Footer/>
//       </>
  
//   );
// }

// export default App;

// // "server": "cd server && npm run dev",
//  // "server": "cd server && npm run dev",
//     // "dev": "concurrently -n \"client,server\" -c \"bgBlue,bgYellow\" \"vite\" \"npm run server\""




import React, { Suspense, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import PrivateRoute from "./components/cores/Homepage/Auth/PrivateRoute";
import { ToastContainer } from "react-toastify";
// import { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import Chatbot from "./pages/Chatbot";
import ScrollToTop from "./pages/ScrollToTop";

//  Lazy load all route components
const Home = React.lazy(() => import("./pages/Home"));
const Aboutus = React.lazy(() => import("./pages/Aboutus"));
const Signup = React.lazy(() => import("./components/common/Signup"));
const Login = React.lazy(() => import("./components/common/Login"));
const OTPpage = React.lazy(() => import("./components/common/OTPpage"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const UpdatePassword = React.lazy(() => import("./pages/UpdatePassword"));
const Profile = React.lazy(() => import("./pages/Profile"));
const UpdateProfile = React.lazy(() => import("./components/ProfileCore/UpdateProfile"));
const Layout = React.lazy(() => import("./pages/Layout"));
const EnrolledCourses = React.lazy(() => import("./components/ProfileCore/EnrolledCourses"));
const Cart = React.lazy(() => import("./components/ProfileCore/Cart"));
const Logout = React.lazy(() => import("./pages/Logout"));
const AddCourse = React.lazy(() => import("./components/AddCourse/AddCourse"));
const MyCourses = React.lazy(() => import("./pages/MyCourses"));
const Catalog = React.lazy(() => import("./pages/Catalog"));
const EachCourse = React.lazy(() => import("./components/catalogcore/EachCourse"));
const SubVideo = React.lazy(() => import("./components/catalogcore/SubVideo"));


function App() {
  const [updatepasswordToken, setupdatepasswordToken] = useState("");
  const { logoutState } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.profile);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Chatbot/>
      <ScrollToTop/>
      {logoutState && <Logout />}

      {/*  Suspense for lazy loading */}
      <Suspense fallback={<div className="text-center text-lg mt-20">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTPpage />} />
          <Route path="/catalog/:catalogName" element={<Catalog />} />
          <Route path={`/catalog/courses/:courseId`} element={<EachCourse />} />
          <Route path={`/courses/:courseId/lecture`} element={<SubVideo />} />

          <Route
            path="/forgotpassword"
            element={<ForgotPassword setupdatepasswordToken={setupdatepasswordToken} />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/updatepassword/:updatepasswordToken"
            element={<UpdatePassword />}
          />

          {/*  Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard/my-profile" element={<Profile />} />
            <Route path="/dashboard/settings" element={<UpdateProfile />} />

            {/* Student Routes */}
            {user?.accountType === "Student" && (
              <>
                <Route path="/dashboard/cart" element={<Cart />} />
                <Route
                  path="/dashboard/enrolled-courses"
                  element={<EnrolledCourses />}
                />
              </>
            )}

            {/* Instructor Routes */}
            {user?.accountType === "Instructor" && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
              </>
            )}
          </Route>
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
