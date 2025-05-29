import React, { useState, useEffect } from "react";
import HighlightText from "../cores/Homepage/HighlightText";
import { IoIosArrowDown } from "react-icons/io";
import sign from "../../assets/images/sign.png"
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

const Login = () => {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState("Student");
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token);
  const profileImage = useSelector((state) => state.auth.profileImage);
  const user = useSelector((state) => state.profile.user);
  const [formData , setFormData] = useState({
    email : "",
    password : "",
     })

  const handleInputChange = (e) => {
    const {name , value} = e.target

    setFormData((prev) => ({...prev , [name] : value , selectedRole}))
  }

  useEffect(() => {
    console.log("Token updated in Redux:", token);
  }, [token]);
  

  useEffect(() => {
    console.log("Token updated in Redux:", profileImage);
  }, [token]);
  
  useEffect(() => {
    console.log("user updated in Redux:", user);
  }, [user]);
  

  const handleForm = async(e) => {
    e.preventDefault()
    console.log(formData);
    dispatch(setLoading(true))
    const toastId =  toast.loading("Loading...")
    try{
      const result = await apiConnect('POST' , login.LOGIN_API , formData)
      toast.success(result.data.message , {id : toastId})
      console.log(result);
      localStorage.setItem("token" , JSON.stringify(result.data.token))
      dispatch(setToken(result.data.token))
      dispatch(setProfileImage(result.data.user.image))
      dispatch(setUser(result.data.user))
      navigate("/dashboard/my-profile")
      
    } catch(Err){
      console.log(Err);
      toast.error(Err.response.data.message , {id : toastId})
      
    }
    
  }

  return (
    <div className="signup bg-[#000814] px-6 gap-6  sm:px-32 flex h-auto sm:h-[100vh] text-white py-10 sm:flex-row flex-col w-[100vw]">
      <div className="left w-full sm:w-1/2 mt-24  sm:px-16">
        <p className="head text-4xl text-white font-[550] sm:max-w">
          Welcome back
        </p>
        <div className="head2 font-sans text-xl text-[#AFB2BF]  mt-6">
          Build skills for today, tomorrow, and beyond.{" "}
          <HighlightText text="Education to future-proof your career." />
        </div>

        <div className="role text-[#AFB2BF] sm:w-[18vw]  h-[7vh] bg-[#161D29] rounded-4xl mt-10 text-xl flex justify-center items-center gap-12">
          <p
            className={`cursor-pointer ${
              selectedRole == "Student" ? "bg-[#000814] text-white" : ""
            } py-2 px-4 rounded-3xl`}
            onClick={() => setSelectedRole("Student")}
          >
            Student
          </p>
          <p
            className={`cursor-pointer ${
              selectedRole == "Instructor" ? "bg-[#000814] text-white" : ""
            } py-2 px-4 rounded-3xl`}
            onClick={() => setSelectedRole("Instructor")}
          >
            Instructor
          </p>
        </div>

        <form onSubmit={handleForm}>
         
          

          <div className="email mt-5.5">
            <div className="email  flex flex-col gap-2">
              <label htmlFor="email" className="text-lg font-[600]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name = "email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="w-full h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
              />
            </div>
          </div>

         


          <div className="1 flex justify-center   items-center gap-5 mt-5.5">
            <div className="flex justify-center flex-col w-full">
              <label htmlFor="pass" className="text-lg mb-1.5 font-[600]">
                 Password
              </label>
              <input
                type="password"
                id="pass"
                name = "password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className=" h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
              />
            </div>
           

           

          </div>
          <Link to="/forgotpassword">
          <p className="text-[#47A5C5] text-end font-semibold text-md mt-1">Forgot password</p>
          </Link>

          <div className="btn w-full mt-7  flex justify-center rounded-xl items-center bg-[#FFD60A]">
              <button className="text-black cursor-pointer h-[6vh]  font-[550]">Sign In</button>
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
