import React, { useState, useEffect } from "react";
import HighlightText from "../cores/Homepage/HighlightText";
import { IoIosArrowDown } from "react-icons/io";
import sign from "../../assets/images/sign.png";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { apiConnect } from "../../services/apiconnect";
import { signUp } from "../../services/apis"
import { sendOTP } from "../../services/apis";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
const Signup = () => {
  const {loading} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [accountType, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    accountType: "",
  });
  

 const navigate = useNavigate()
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

  const handleForm = async (e) => {
    e.preventDefault();
    if(!Valid()){
      return
    }
    console.log(formData);
    dispatch(setLoading(true))
    const toastId= toast.loading("Sending reset link...")
    try {
      const result = await apiConnect('POST' , sendOTP.OTP_API , { email: formData.email })
      if (result.data.success) {
      localStorage.setItem("signupData", JSON.stringify(formData));
      toast.success(result.data?.message , {id : toastId});
      navigate("/otp")
      console.log(result);
      clearField()
      }
      
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message, { id: toastId });
    }
    finally{
      dispatch(setLoading(false))
    }
  };

  const Valid = () => {
    if(!accountType){
      toast.error("choose your role")
      return false
    }
    if(!formData.firstName){
      toast.error("Enter first name")
      return false
    }
    if(!formData.lastName){
      toast.error("Enter last name")
      return false
    }
    if(!formData.email){
      toast.error("Enter email")
      return false
    }
    if(!formData.password){
      toast.error("Enter password")
      return false
    }
    if(!formData.confirmpassword){
      toast.error("Enter confirm password")
      return false
    }
    if(formData.password != formData.confirmpassword){
      toast.error("password do not match")
      return false
    }
    return true
  }

  const   clearField = () => {
    formData.firstName = ""
    formData.lastName = ""
    formData.email = ""
    formData.password = ""
    formData.confirmpassword = ""
    formData.phoneNumber = ""
    // reset.current.reset()
    setSelectedRole("")
  }

  return (
    <div className="signup bg-[#000814] px-6 gap-6 mt- sm:px-32 flex text-white py-10 sm:flex-row flex-col w-[100vw]">
      <div className="left w-full sm:w-1/2  sm:px-16">
        <p className="head text-4xl text-white font-[550] sm:max-w">
          Join the millions learning to code with StudyNotion for free
        </p>
        <div className="head2 font-sans text-xl text-[#AFB2BF]  mt-6">
          Build skills for today, tomorrow, and beyond.{" "}
          <HighlightText text="Education to future-proof your career." />
        </div>

        <div className="role text-[#AFB2BF] sm:w-[18vw]  h-[7vh] bg-[#161D29] rounded-4xl mt-10 text-xl flex justify-center items-center gap-12">
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
          <div className="1 flex justify-center   items-center gap-5 mt-8">
            <div className="flex justify-center flex-col w-1/2">
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
                className=" h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
              />
            </div>

            <div className="flex justify-center flex-col w-1/2">
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
                className=" h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
              />
            </div>
          </div>

          <div className="email mt-5">
            <div className="email  flex flex-col gap-2">
              <label htmlFor="email1" className="text-lg font-[600]">
                Email
              </label>
              <input
                type="email"
                id="email1"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="w-full h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
              />
            </div>
          </div>

       
          <div className="1 flex justify-center   items-center gap-5 mt-5">
            <div className="flex justify-center flex-col w-1/2">
              <label htmlFor="pass" className="text-lg mb-1.5 font-[600]">
                Create Password
              </label>
              <input
                type="password"
                id="pass"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className=" h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
              />
            </div>

            <div className="flex justify-center flex-col w-1/2">
              <label htmlFor="pass2" className="text-lg mb-1.5 font-[600]">
                Confirm Pasword
              </label>
              <input
                type="password"
                id="pass2"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className=" h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
              />
            </div>
          </div>

          <div className="btn w-full mt-4  flex justify-center rounded-xl items-center bg-[#FFD60A]">
            <button className="text-black cursor-pointer h-[6vh]  font-[550]">
              Create Account
            </button>
          </div>
        </form>
      </div>

      <div className="right w-full sm:w-1/2  flex justify-center items-center mt-10 h-full">
        <img src={sign} alt="" />
      </div>
    </div>
  );
};

export default Signup;
// import React, { useState, useEffect } from "react";
// import HighlightText from "../cores/Homepage/HighlightText";
// import { IoIosArrowDown } from "react-icons/io";
// import sign from "../../assets/images/sign.png";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ReCAPTCHA from "react-google-recaptcha";
// import { useRef } from "react";

// const Signup = () => {
//   const [accountType, setSelectedRole] = useState("");
//   const [recaptchaValue , setRecaptchaToken] = useState("");
//   const [csrfToken, setCsrfToken] = useState("");
//   const reset = useRef("");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     confirmpassword: "",
//     recaptchaValue : "",
//     accountType: "",
//   });


//   useEffect(() => {
//     // Fetch CSRF token from backend
//     const fetchCsrfToken = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/csrf-token", { withCredentials: true });
//         setCsrfToken(response.data.csrfToken);
//         console.log("cs",csrfToken);
//         console.log(response.data.csrfToken);
        
        
//       } catch (error) {
//         console.error("Failed to fetch CSRF token", error);
//       }
//     };
//     fetchCsrfToken();
//   }, []);


//   const handleRecaptchaChange = (token) => {
//     setRecaptchaToken(token.trim());
//     console.log(token);

//     setFormData((prev) => ({
//       ...prev,
//       recaptchaValue : token.trim(),
//     }));
//   };

//   const handleRoleSelect = (role) => {
//     setSelectedRole(role);
//     setFormData((prev) => ({
//       ...prev,
//       accountType: role,
//     }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleForm = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/lms/signUp",
//         formData,
//         {
//           headers: { 'X-CSRF-Token': csrfToken },
//           withCredentials: true,
//         }
//       );
//       console.log(response);
//       toast.success("Account created successfully");
//       clearField()
//     } catch (err) {
//       console.log(err);
//       if (err) {
//         toast.error(err.response.data.message);
//       }
//     }
//   };

//   const   clearField = () => {
//     formData.firstName = ""
//     formData.lastName = ""
//     formData.email = ""
//     formData.password = ""
//     formData.confirmpassword = ""
//     formData.phoneNumber = ""
//     reset.current.reset()
//     setSelectedRole("")
//   }

//   return (
//     <div className="signup bg-[#000814] px-6 gap-6 sm:px-32 flex text-white py-10 sm:flex-row flex-col w-[100vw]">
//       <ToastContainer />
//       <div className="left w-full sm:w-1/2  sm:px-16">
//         <p className="head text-4xl text-white font-[550] sm:max-w">
//           Join the millions learning to code with StudyNotion for free
//         </p>
//         <div className="head2 font-sans text-xl text-[#AFB2BF]  mt-6">
//           Build skills for today, tomorrow, and beyond.{" "}
//           <HighlightText text="Education to future-proof your career." />
//         </div>

//         <div className="role text-[#AFB2BF] sm:w-[18vw]  h-[7vh] bg-[#161D29] rounded-4xl mt-10 text-xl flex justify-center items-center gap-12">
//           <p
//             className={`cursor-pointer ${
//               accountType == "Student" ? "bg-[#000814] text-white" : ""
//             } py-2 px-4 rounded-3xl`}
//             onClick={() => handleRoleSelect("Student")}
//           >
//             Student
//           </p>
//           <p
//             className={`cursor-pointer ${
//               accountType == "Instructor" ? "bg-[#000814] text-white" : ""
//             } py-2 px-4 rounded-3xl`}
//             onClick={() => handleRoleSelect("Student")}
//           >
//             Instructor
//           </p>
//         </div>

//         <form onSubmit={handleForm}>
//           <div className="1 flex justify-center   items-center gap-5 mt-8">
//             <div className="flex justify-center flex-col w-1/2">
//               <label htmlFor="field1" className="text-lg mb-1.5 font-[600]">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 id="field1"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 placeholder="Enter first name"
//                 className=" h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
//               />
//             </div>

//             <div className="flex justify-center flex-col w-1/2">
//               <label htmlFor="field2" className="text-lg mb-1.5 font-[600]">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 id="field2"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 placeholder="Enter last name"
//                 className=" h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
//               />
//             </div>
//           </div>

//           <div className="email mt-5">
//             <div className="email  flex flex-col gap-2">
//               <label htmlFor="email1" className="text-lg font-[600]">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email1"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter email"
//                 className="w-full h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
//               />
//             </div>
//           </div>

//           <div className="phnumber mt-5 flex flex-col">
//             <div className="mb-1.5">
//               <label htmlFor="phone" className="text-lg  font-[600]">
//                 Phone Number
//               </label>
//             </div>
//             <div className="flex gap-7 justify-center items-center text-lg font-bold ">
//               <div className="nine flex gap-2 bg-[#161D29] shadow-[0px_1px_2px_rgba(255,255,255,0.6)] rounded-2xl p-3 text-lg">
//                 +91 <IoIosArrowDown className="mt-1" />
//               </div>
//               <div className=" flex flex-col w-full gap-2">
//                 <input
//                   type="number"
//                   id="phone"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleInputChange}
//                   placeholder="Enter phone number"
//                   className="w-full h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="1 flex justify-center   items-center gap-5 mt-5">
//             <div className="flex justify-center flex-col w-1/2">
//               <label htmlFor="pass" className="text-lg mb-1.5 font-[600]">
//                 Create Password
//               </label>
//               <input
//                 type="password"
//                 id="pass"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 placeholder="Enter Password"
//                 className=" h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
//               />
//             </div>

//             <div className="flex justify-center flex-col w-1/2">
//               <label htmlFor="pass2" className="text-lg mb-1.5 font-[600]">
//                 Confirm Pasword
//               </label>
//               <input
//                 type="password"
//                 id="pass2"
//                 name="confirmpassword"
//                 value={formData.confirmpassword}
//                 onChange={handleInputChange}
//                 placeholder="Enter Password"
//                 className=" h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
//               />
//             </div>
//           </div>
//           <div className="block gap-2 mt-4">
//             <div className="flex justify-center items-center mt-3 z-50">
//               <ReCAPTCHA
//                 // sitekey="6Ldq7wErAAAAAKiaKfx5znCYkSXxs7Tkqdr40Ks6"
//                 sitekey="6Le3-QArAAAAADn9ym4vDs6qMQN3DpD0yZe183m-"
//                 onChange={handleRecaptchaChange}
//                 className="cursor-pointer "
//                 ref={reset}
//               />
//             </div>
//           </div>
//           <div className="btn w-full mt-4  flex justify-center rounded-xl items-center bg-[#FFD60A]">
//             <button className="text-black h-[6vh]  font-[550]">
//               Create Account
//             </button>
//           </div>
//         </form>
//       </div>

//       <div className="right w-full sm:w-1/2  flex justify-center items-center mt-10 h-full">
//         <img src={sign} alt="" />
//       </div>
//     </div>
//   );
// };

// export default Signup;
