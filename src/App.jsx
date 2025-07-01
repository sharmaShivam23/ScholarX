import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Aboutus from "./pages/Aboutus";
import Signup from "./components/common/Signup";
import Login from "./components/common/Login";
import OTPpage from "./components/common/OTPpage";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer, toast } from "react-toastify";
import UpdatePassword from "./pages/UpdatePassword";
import { useState } from "react";
import Profile from "./pages/Profile";
import UpdateProfile from "./components/ProfileCore/UpdateProfile";
import PrivateRoute from "./components/cores/Homepage/Auth/PrivateRoute";
import Layout from "./pages/Layout";
import EnrolledCourses from "./components/ProfileCore/EnrolledCourses";
import Cart from "./components/ProfileCore/Cart";
import Logout from "./pages/Logout";
import { useSelector } from "react-redux";
import AddCourse from "./components/AddCourse/AddCourse";
// import userData from "./store/store";
import StudentRoute from "./components/cores/Homepage/Auth/StudentRoute";
import MyCourses from "./pages/MyCourses";

function App() {
  const [updatepasswordToken, setupdatepasswordToken] = useState("");
  console.log("uptoken", updatepasswordToken);
   const {logoutState} = useSelector((state) => state.profile)
    const { user } = useSelector((state) => state.profile);

  return (
    
   <>
      <ToastContainer />
      <Navbar />
      {/* <Logout/> */}
      {logoutState && <Logout/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OTPpage />} />
        <Route
          path="/forgotpassword"
          element={
            <ForgotPassword setupdatepasswordToken={setupdatepasswordToken} />
          }
        />
        <Route path="/login" element={<Login />} />
        {updatepasswordToken && (
          <Route
            path={`/updatepassword/${updatepasswordToken}`}
            element={<UpdatePassword />}
          />
        )}

      

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<Profile />} />
          <Route path="/dashboard/settings" element={<UpdateProfile/>} />
          

{
        user?.accountType === "Student" && (
          <>
          <Route path="/dashboard/cart" element={<Cart />} />
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }

      {
         user?.accountType === "Instructor" && (
          <>
          <Route path="/dashboard/add-course" element={<AddCourse />} />
          <Route path="/dashboard/my-courses" element={<MyCourses />} />
          </>
        )

      }
        

        </Route>
      </Routes>
      </>
  
  );
}

export default App;

// "server": "cd server && npm run dev",
