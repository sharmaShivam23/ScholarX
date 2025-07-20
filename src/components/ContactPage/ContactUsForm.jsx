import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnect } from "../../services/apiconnect";
import { ContactApi } from "../../services/apis";
import toast from "react-hot-toast";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data , e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await apiConnect("POST", ContactApi.CONTACT_API, data);
      // console.log(res);
      if (res?.data?.success == true) {
        toast.success("Message sent successfully");
      }
    } catch (error) {
      // console.log("ERROR MESSAGE - ", error);
      toast.error(error?.response?.data?.message);
    }
    finally{
      setLoading(false)
    }
  };

  

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  // Common Input Style
  const inputClass =
    "h-[60px] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl text-white shadow-[0px_1px_2px_rgba(255,255,255,0.6)]";

  const labelClass = "text-lg mb-1.5 font-[600]";

  return (
    <form
      className="flex h-auto  flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className={labelClass}>
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className={inputClass}
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-red-500">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className={labelClass}>
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className={inputClass}
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelClass}>
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className={inputClass}
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-red-500">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className={labelClass}>
          Phone Number
        </label>
        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              name="countrycode"
              id="countrycode"
              className={inputClass}
              {...register("countrycode", { required: true })}
            >
              <option value="+91">+91</option>

              {/* Add more as needed */}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="Enter Phone Number"
              className={inputClass}
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-red-500">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="bg-[#161D29] text-white placeholder:font-[600] pl-3 pt-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-red-500 text-[12px] ">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md cursor-pointer bg-yellow-500 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
       {loading ? "Submitting........" : "Send Message"} 
      </button>
    </form>
  );
};

export default ContactUsForm;
