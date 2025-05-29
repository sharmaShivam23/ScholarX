import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { validation } from "../components/Data/Validations";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { resetpassword } from "../services/apis";
import { apiConnect } from "../services/apiconnect";
const UpdatePassword = () => {
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleForm(e) {
    e.preventDefault();
    console.log(formData);

    try{
    const response = await apiConnect('POST' , resetpassword.RESETPASS_API , {...formData , token})
    console.log(response);
    
    } catch(Err){
      console.log(Err);
      
    }
    
  }

  let hasLower = (password) => /[a-z]/.test(password);
  let hasUpper = (password) => /[A-Z]/.test(password);
  let hasNumber = (password) => /[0-9]/.test(password);
  let hasSpecial = (password) => /[!@#$%^&*]/.test(password);
  let isLongEnough = (password) => /^.{8,}$/.test(password);
  return (
    <div className="flex justify-center text-white bg-[#000814] h-auto sm:h-screen items-center">
      <form
        className="flex justify-center p-10 items-center gap-5 flex-col"
        onSubmit={handleForm}
      >
        <p className="p text-3xl font-bold text-center">Choose new password</p>
        <p className="p text-xl font-semibold text-center text-[#AFB2BF]">
          Almost done. Enter your new password and youre all set.
        </p>

        <div className="flex justify-center flex-col w-full">
          <label htmlFor="pass" className="text-lg mb-1.5 font-[600]">
            Create Password
          </label>

        
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="pass"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter Password"
              className="h-[7vh] w-full bg-[#161D29] placeholder:font-[600] pl-3 pr-10 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
            />
          
            <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white cursor-pointer">
             {showPassword ?  <FaEye  className="text-xl"/> : <FaEyeSlash className="text-2xl"/>}
            </span>
          </div>
        </div>

       
          <div className="flex justify-center flex-col w-full">
          <label htmlFor="pass2" className="text-lg mb-1.5 font-[600]">
            Confirm Password
          </label>

        
          <div className="relative">
            <input
               type={`${showConfirmPassword ? "text" : "password"}`}
              id="pass2"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Enter Password"
              className="h-[7vh] w-full bg-[#161D29] placeholder:font-[600] pl-3 pr-10 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
            />
          
            <span onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white cursor-pointer">
             {showConfirmPassword ?  <FaEye  className="text-xl "/> : <FaEyeSlash className="text-2xl"/>}
            </span>
          </div>
        </div>


        <div className="flex justify-center w-full sm:w-[35vw] flex-wrap items-center gap-2">
          {validation.map((item, index) => {
            let isValid = false;

            if (item.txt === "one lowercase character") {
              isValid = hasLower(formData.password);
            } else if (item.txt === "one uppercase character") {
              isValid = hasUpper(formData.password);
            } else if (item.txt === "one number") {
              isValid = hasNumber(formData.password);
            } else if (item.txt === "one special character") {
              isValid = hasSpecial(formData.password);
            } else if (item.txt === "8 character minimum") {
              isValid = isLongEnough(formData.password);
            }

            return (
              <div
                key={index}
                className={`flex gap-2 mt-3 ${
                  isValid
                    ? "text-[#05A77B]"
                    : `${formData.password ? "text-[#FF4D4D]" : "text-white"}`
                }`}
              >
                <FaCheckCircle className="sm:text-xl text-xs mt-1" />
                <p className="text-md font-[400] mr-6">{item.txt}</p>
              </div>
            );
          })}
        </div>

        <div className="btn w-full mt-4  flex justify-center rounded-xl items-center bg-[#FFD60A]">
          <button className="text-black h-[6vh]  font-[550]">
            Reset Password
          </button>
        </div>
        <Link to="/login">
          <div className="p mt-3 flex text-start gap-5 ">
            <FaLongArrowAltLeft className="text-3xl text-white" /> Back to login
          </div>
        </Link>
      </form>
    </div>
  );
};

export default UpdatePassword;
