import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/apis";
import { apiConnect } from "../../services/apiconnect";
import OtpInput from "react-otp-input";
import { sendOTP } from "../../services/apis";
import { setLoading } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";


const OTPpage = () => {
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const data = localStorage.getItem(JSON.parse(signupData))
  const data = JSON.parse(localStorage.getItem("signupData"));
  console.log("data", data);

  async function handleClick() {
    console.log("otp", otp);
    dispatch(setLoading(true))
    const toastId= toast.loading("Submitting...")
    try {
      const response = await apiConnect("POST", signUp.SIGNUP_API, {
        ...data,
        otp,
      });
      console.log(response);
      toast.success(response.data.message , {id : toastId})
      if (response.data.success === true) {
        navigate("/login");
      }
    } catch (Err) {
      console.log(Err);
    }
    finally{
      toast.error(err.response.data.message , {id : toastId})
      dispatch(setLoading(false))
    }
  }


  async function resendOtp() {
    try {
      const response = await apiConnect("POST", sendOTP.OTP_API , {
        email: data.email,
      });
      console.log("Resend OTP response:", response)
    } catch (error) {
      console.log("Error resending OTP:", error);
    }
  }
  

  return (
    <div className="flex justify-center items-center h-[90vh] bg-[#000814]">
      <div className="otppage  w-[35vw] text-white h-[40vh] flex justify-start  items-center flex-col p-10 gap-2 float">
        <div className="heading text-3xl font-[600]">Verify Email</div>
        <div className="content text-[#AFB2BF] text-lg font-[550] ">
          A verification code has been sent to you. Enter the code below
        </div>
        <div className="otp flex  justify-center items-center gap-2 mt-4">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} placeholder="-" className="hadow-[0px_1px_2px_rgba(255,255,255,0.6)] h-[80px] bg-[#161D29] rounded-lg m-2"/>}
            className="h-[40px] w-96 bg-white m-4"
           inputStyle={{
            width : "3.2rem",
            height : "3.2rem",
           }}
           shouldAutoFocus

          />
         
        </div>
       

        <div className="btn w-full mt-7  flex justify-center rounded-xl items-center bg-[#FFD60A]">
          <button
            onClick={handleClick}
            className="text-black h-[6vh]  font-[550]"
          >
            Verify and Register
          </button>
        </div>

        <div className="btn flex font-[550] justify-between mt-2 items-center gap-20">
          <button
            onClick={() => useNavigate("/signup")}
            className="cursor-pointer flex gap-2"
          >
            <FaArrowLeft className="mt-1" /> Back to Signup{" "}
          </button>
          <button onClick={resendOtp} className="text-[#47A5C5] cursor-pointer">Resend it</button>
        </div>
      </div>
    </div>
  );
};

export default OTPpage;
