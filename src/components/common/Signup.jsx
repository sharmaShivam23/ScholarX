import React, { useState, useEffect } from "react";
import HighlightText from "../cores/Homepage/HighlightText";
import { IoIosArrowDown } from "react-icons/io";
import sign from "../../assets/images/sign.png";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { apiConnect } from "../../services/apiconnect";
import { signUp } from "../../services/apis";
import { sendOTP } from "../../services/apis";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
const Signup = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [accountType, setSelectedRole] = useState("Student");
  const [showPassword , setShowPassword] = useState(false)
  const [showConfirmPassword , setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    accountType: "Student",
  });

  const navigate = useNavigate();
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData((prev) => ({
      ...prev,
      accountType: role,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
  fetch("http://localhost:3000/auth/user", {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => {
      // console.log("User:", data);
      toast.success("Signup Successful")
    });
}, []);

const handleForm = async (e) => {
  e.preventDefault();

  if (!Valid()) return;

  dispatch(setLoading(true));
  const toastId = toast.loading("Signing in...");

  try {
    const result = await apiConnect("POST", sendOTP.OTP_API, {
      email: formData?.email,
    });

    if (result?.data?.success) {
      localStorage.setItem("signupData", JSON.stringify(formData));
      toast.success(result?.data?.message, { id: toastId });
      navigate("/otp");
      clearField();
    } else {
      toast.error(result?.data?.message || "Try again!", { id: toastId });
    }

  } catch (err) {
    console.error("Error sending OTP:", err);

    // Show detailed error if available, else fallback message
    const errorMessage = err?.response?.data?.message || "Something went wrong. Please try again.";
    toast.error(errorMessage, { id: toastId });

  } finally {
    dispatch(setLoading(false));
  }
};


  const Valid = () => {
    if (!accountType) {
      toast.error("choose your role");
      return false;
    }
    if (!formData.firstName) {
      toast.error("Enter first name");
      return false;
    }
    if (!formData.lastName) {
      toast.error("Enter last name");
      return false;
    }
    if (!formData.email) {
      toast.error("Enter email");
      return false;
    }
    if (!formData.password) {
      toast.error("Enter password");
      return false;
    }
    if (!formData.confirmpassword) {
      toast.error("Enter confirm password");
      return false;
    }
    if (formData.password != formData.confirmpassword) {
      toast.error("password do not match");
      return false;
    }
    return true;
  };

  const clearField = () => {
    formData.firstName = "";
    formData.lastName = "";
    formData.email = "";
    formData.password = "";
    formData.confirmpassword = "";
    formData.phoneNumber = "";
    // reset.current.reset()
    setSelectedRole("");
  };

  return (
    <div className="signup  mt-16 bg-[#000814] px-6 gap-6 mt- sm:px-32 flex text-white py-10 sm:flex-row flex-col w-[100vw]">
      <div className="left w-full sm:w-1/2  sm:px-16">
        <p className="head text-4xl text-white font-[550] sm:max-w">
          Join the millions learning to code with StudyNotion for free
        </p>
        <div className="head2 font-sans text-xl text-[#AFB2BF]  mt-6">
          Build skills for today, tomorrow, and beyond.{" "}
          <HighlightText allow={true} text="Education to future-proof your career." />
        </div>

        <div className="role text-[#AFB2BF] sm:w-[18vw]  h-[60px] bg-[#161D29] rounded-4xl mt-10 text-xl flex justify-center items-center gap-12">
          <p
            className={`cursor-pointer ${
              accountType == "Student" ? "bg-[#000814] text-white" : ""
            } py-2 px-4 rounded-3xl`}
            onClick={() => handleRoleSelect("Student")}
          >
            Student
          </p>
          <p
            className={`cursor-pointer ${
              accountType == "Instructor" ? "bg-[#000814] text-white" : ""
            } py-2 px-4 rounded-3xl`}
            onClick={() => handleRoleSelect("Instructor")}
          >
            Instructor
          </p>
        </div>

        <form onSubmit={handleForm}>
          <div className="1 flex justify-center sm:flex-row flex-col   items-center gap-2 sm:gap-5 mt-8">
            <div className="flex justify-center flex-col w-full sm:w-1/2">
              <label htmlFor="field1" className="text-lg mb-1.5 font-[600]">
                First Name
              </label>
              <input
                type="text"
                id="field1"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className=" h-[60px] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
              />
            </div>

            <div className="flex justify-center mt-2 sm:mt-0 flex-col w-full sm:w-1/2">
              <label htmlFor="field2" className="text-lg mb-1.5 font-[600]">
                Last Name
              </label>
              <input
                type="text"
                id="field2"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className=" h-[60px] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
              />
            </div>
          </div>

          <div className="email mt-3">
            <div className="email  flex flex-col gap-2">
              <label htmlFor="email1" className="text-lg font-[600]">
                Email Id
              </label>
              <input
                type="email"
                id="email1"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="w-full h-[60px] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
              />
            </div>
          </div>

          <div className="1 flex justify-center  flex-col sm:flex-row  items-center gap-2 sm:gap-5 mt-5">
            <div className="flex justify-center flex-col w-full sm:w-1/2">
  <label htmlFor="pass" className="text-lg mb-1.5 font-[600]">
    Create Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      id="pass"
      name="password"
      value={formData.password}
      onChange={handleInputChange}
      placeholder="Enter Password"
      className="h-[60px] w-full bg-[#161D29] placeholder:font-[600] pl-3 pr-12 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
    />
      
       <span onClick={() => setShowPassword((prev) => !prev)}>
        {!showPassword ? (
          <FaEye className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer" />
        ) : (
          <FaEyeSlash className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer" />
        )}
      </span>
  </div>
</div>

           <div className="flex justify-center mt-2 sm:mt-0 flex-col w-full sm:w-1/2">
  <label htmlFor="pass2" className="text-lg mb-1.5 font-[600]">
    Confirm Password
  </label>

  <div className="relative">
    <input
      type={showConfirmPassword ? "text" : "password"}
      id="pass2"
      name="confirmpassword"
      value={formData.confirmpassword}
      onChange={handleInputChange}
      placeholder="Enter Password"
      className="h-[60px] w-full bg-[#161D29] placeholder:font-[600] pl-3 pr-12 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
    />
     <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
        {!showConfirmPassword ? (
          <FaEye className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer" />
        ) : (
          <FaEyeSlash className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer" />
        )}
      </span>
  </div>
</div>

          </div>

          <button className="btn  w-full h-[60px] text-black font-bold text-lg mt-6 cursor-pointer  flex justify-center rounded-xl items-center bg-[#FFD60A]">
           
              Create Account

          </button>
          {/* <div className="btn w-full mt-4 cursor-pointer  flex justify-center rounded-xl items-center bg-[#FFD60A]">
            <button className="text-black cursor-pointer  h-[6vh]  font-[550]">
              Create Account
            </button>
          </div> */}
        </form>
      </div>

      <a className="hidden" href="http://localhost:3000/auth/google">
        <button>Login with Google</button>
      </a>
      <a className="hidden" href="http://localhost:3000/auth/logout">
  <button>Logout</button>
</a>


      <div className="right w-full sm:w-1/2  flex justify-center items-center mt-10 h-full">
        <img src={sign} alt="" />
      </div>
    </div>
  );
};

export default Signup;
