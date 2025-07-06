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
import { FaClockRotateLeft } from "react-icons/fa6";

const OTPpage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = JSON.parse(localStorage.getItem("signupData"));

  async function handleClick() {
    if (!otp || otp.length !== 5) {
      toast.error("Please enter a valid 5-digit OTP");
      return;
    }
    dispatch(setLoading(true));
    const toastId = toast.loading("Submitting...");

    try {
      const response = await apiConnect("POST", signUp.SIGNUP_API, {
        ...data,
        otp,
      });

      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        navigate("/login");
      } else {
        toast.error(response.data.message || "Signup failed", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed", {
        id: toastId,
      });
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function resendOtp() {
    const toastId = toast.loading("Resending OTP...");

    try {
      const response = await apiConnect("POST", sendOTP.OTP_API, {
        email: data.email,
      });

      if (response.data?.success) {
        toast.success(response.data.message || "OTP sent successfully", {
          id: toastId,
        });
        console.log("Resend OTP response:", response);
      } else {
        toast.error(response.data?.message || "Failed to send OTP", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md sm:max-w-xl text-white bg-[#161D29] border-2 border-white p-6 sm:p-10 b rounded-xl shadow-md space-y-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">
          Verify Email
        </h1>
       <p className="text-[#AFB2BF] text-center">
  A verification code has been sent to your email. Enter the code below: <br />
  If you don’t see the email, check your spam or promotions folder.
</p>

        {/* <div className="flex justify-center mt-4">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            shouldAutoFocus
            inputStyle={{
              width: "3rem",
              height: "3.2rem",
              margin: "0 6px",
              fontSize: "1.25rem",
              borderRadius: "0.5rem",
              backgroundColor: "#161D29",
              color: "white",
              border: "1px solid #333",
            }}
            renderInput={(props) => <input  {...props} />}
          />
        </div> */}

         <div className="otp flex  justify-center items-center gap-2 mt-3">
                         <OtpInput
                           name = "otp"
                            value={otp}
                            onChange={setOtp}
                           numInputs={5}
                           renderInput={(props) => (
                             <input
                               {...props}
                               placeholder="-"
                               className="border-[1px] border-[#C1C1C1] bg-[#000814] h-[80px] text-white font-bold rounded-lg m-2"
                             />
                           )}
                           className="w-56 sm:w-96 bg-white m-4"
                           inputStyle={{
                             width: 'clamp(2.4rem, 10vw, 3.2rem)',
                             height: 'clamp(2.8rem, 12vw, 3.2rem)',
                             fontSize: '1.25rem',
                           }}
                           shouldAutoFocus
                         />
                       </div>

        <button
          onClick={handleClick}
          className="w-full h-12 cursor-pointer bg-[#FFD60A] text-black font-semibold rounded-xl hover:opacity-90 transition"
        >
          Verify and Register
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-medium">
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 text-white hover:underline"
          >
            <FaArrowLeft className="text-base " /> Back to Signup
          </button>

          <button
            onClick={resendOtp}
            className="flex cursor-pointer items-center gap-2 text-[#47A5C5] hover:text-[#61c0e4] transition-colors"
          >
            <FaClockRotateLeft className="text-base cursor-pointer" /> Resend it
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPpage;