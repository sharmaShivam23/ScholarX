
import React from 'react'
import { useState } from 'react'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { apiConnect } from '../services/apiconnect';
import {forgotpassword } from '../services/apis';
import { setLoading } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useParams } from "react-router-dom";

const ForgotPassword = ({setupdatepasswordToken}) => {
  const dispatch = useDispatch()
  const [emailSent , setEmailSent] = useState(false)
  const [email , setEmail] = useState("")
  

  const { updatepasswordToken } = useParams();
  console.log("Reset Token:", updatepasswordToken);




 async function handleForm(e){
   e.preventDefault()
    console.log(email);
     dispatch(setLoading(true))
    const toastId= toast.loading("Sending reset link...")
    try{

      const response = await apiConnect("POST" , forgotpassword.FORGOTPASS_API , {email})
      console.log(response);
     
      if(response.data.success === true){
        toast.success(response?.data?.message, { id: toastId });
        setupdatepasswordToken(response.data.token)
        setEmailSent(true)
      }
    }
    catch(err){
      console.log(err);
      toast.error(err?.response?.data?.message, { id: toastId });
    }
    finally{
      dispatch(setLoading(false))
    }
    
  }
  return (
    <div className='flex justify-center h-screen text-white bg-[#000814] gap-5 flex-col  items-center'>
     
     <div className=" text-left">
     <p className='text-3xl  font-bold text-white'>
      {!emailSent ? "Reset your password" : "Check email" }
      </p>
      </div>

      <p className='sm:text-lg  text-xs font-semibold text-center text-[#AFB2BF] w-[80vw] sm:w-[40vw] lg:w-[30vw]'>
        {!emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"  : `We have sent the reset email to ${email}`
     }     </p>
     
     <form onSubmit={handleForm}>
     {!emailSent && (
         <div className="email">
         <div className="email  flex flex-col gap-2">
           <label htmlFor="email1" className="text-lg pl- font-[600]">
             Email Address
           </label>
           <input
             type="email"
             id="email1"
            required
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder="Enter email"
             className="md:w-[30vw] max-[300px]:w-full w-[300px] h-[60px] bg-[#161D29] pl-3 placeholder:font-[600]  rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
           />
         </div>
       </div>
     )}

     <div className="btn w-full cursor-pointer">
     <div className={`btn  mt-4 ${emailSent ? "sm:w-[30vw] w-[60vw]" : "w-full"}  flex justify-center rounded-xl hover:scale-95 cursor-pointer transition-all ease-out duration-100 items-center bg-[#FFD60A]`}>
            <button  className="text-black  h-[60px]  cursor-pointer  font-bold">
            {!emailSent ? " Reset Password" : "Resend email"}
            </button>
          </div>
     </div>
     
     <Link to="/login">
     <div className="p mt-3 flex gap-5 ">< FaLongArrowAltLeft className='text-3xl text-white'/> Back to login</div>
     </Link>

</form>

       
      
    </div>
  )
}

export default ForgotPassword


// Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery 