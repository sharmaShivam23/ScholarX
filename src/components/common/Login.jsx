import React, { useState, useEffect } from "react";
import HighlightText from "../cores/Homepage/HighlightText";
import { IoIosArrowDown } from "react-icons/io";
import sign from "../../assets/images/sign.png";
import { Link } from "react-router-dom";
import { login } from "../../services/apis";
import { apiConnect } from "../../services/apiconnect";
import { useSelector } from "react-redux";
import { setToken } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { setProfileImage } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../slices/ProfileSlice";
import { setLoading } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const [selectedRole, setSelectedRole] = useState("Student");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const profileImage = useSelector((state) => state.auth.profileImage);
  const user = useSelector((state) => state.profile.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    // setFormData((prev) => ({...prev , [name] : value , selectedRole}))
  };

  const handleForm = async (e) => {
    e.preventDefault();

    // console.log("Form Data:", formData);
    dispatch(setLoading(true));
    const toastId = toast.loading("Logging in...");

    try {
      const result = await apiConnect("POST", login.LOGIN_API, formData);

      if (result?.data?.success) {
        toast.success(result?.data?.message, { id: toastId });

        localStorage.setItem("token", JSON.stringify(result.data.token));
        dispatch(setToken(result.data.token));
        dispatch(setProfileImage(result.data.user?.image || ""));
        dispatch(setUser(result.data.user));
        navigate("/dashboard/my-profile");
      } else {
        toast.error(result.data?.message || "Login failed!", { id: toastId });
      }
    } catch (err) {
      // console.error("Login error:", err);
      toast.error(err?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="signup bg-[#000814] px-6 gap-6  sm:px-32 flex h-auto sm:h-[100vh] text-white py-10 sm:flex-row flex-col w-[100vw]">
      <div className="left w-full sm:w-1/2 sm:mt-32 mt-20  sm:px-16">
        <p className="head text-4xl text-white font-[550] sm:max-w">
          Welcome back
        </p>
        <div className="head2 font-sans text-xl text-[#AFB2BF]  mt-6">
          Build skills for today, tomorrow, and beyond.{" "}
          <HighlightText
            allow={true}
            text="Education to future-proof your career."
          />
        </div>

        <form onSubmit={handleForm}>
          <div className="email mt-12">
            <div className="email  flex flex-col gap-2">
              <label htmlFor="email" className="text-lg font-[600]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="w-full h-[60px] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
              />
            </div>
          </div>

          <div className="flex justify-center items-center gap-5 mt-5.5">
            <div className="relative w-full">
              <label htmlFor="pass" className="text-lg mb-1.5 font-[600] block">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="pass"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className="h-[60px] w-full bg-[#161D29] placeholder:font-[600] pl-3 pr-12 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-[68%] right-4 text-xl translate-y-[-50%] cursor-pointer text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <Link to="/forgotpassword">
            <p className="text-[#47A5C5] text-end font-semibold text-md mt-1">
              Forgot password
            </p>
          </Link>

          <div className="btn w-full mt-7  flex justify-center rounded-xl items-center bg-[#FFD60A]">
            <button className="text-black cursor-pointer h-[60px] text-lg font-bold">
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div className="right w-full sm:w-1/2  flex justify-center items-center mt-3 h-full">
        <img src={sign} alt="" />
      </div>
    </div>
  );
};

export default Login;
