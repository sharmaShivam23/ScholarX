

import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useForm } from "react-hook-form";
import { CountryCode } from "../Data/CountryCode";
import toast from "react-hot-toast";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      toast.success("Message sent successfully!");
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Form submitted:", data);
    // simulate sending...
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="sm:h-screen h-auto p-5 w-[100%] sm:p-0 flex justify-center  flex-col items-center">
      <div className="txt text-center">
        <h1 className="text-3xl text-white font-[550]">Get in Touch</h1>
        <p className="text-xl text-[#838894] font-[400] mt-2">
          We’d love to here for you, Please fill out this form.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="sm:w-[34vw] w-[90vw] flex justify-center items-center flex-col mt-4">
        {/* First & Last Name */}
        <div className="1 flex justify-center w-[100%] items-center gap-5 mt-8">
          <div className="flex justify-center  flex-col w-1/2">
            <label htmlFor="field1" className="text-lg mb-1.5 font-[600]">
              First Name
            </label>
            <input
              type="text"
              id="field1"
              {...register("firstName", { required: true })}
              placeholder="Enter first name"
              className=" h-[7vh] w-[] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">
                Please enter your first name
              </span>
            )}
          </div>

          <div className="flex justify-center flex-col w-1/2">
            <label htmlFor="field2" className="text-lg mb-1.5 font-[600]">
              Last Name
            </label>
            <input
              type="text"
              id="field2"
              {...register("lastName")}
              placeholder="Enter last name"
              className=" h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
            />
          </div>
        </div>

        {/* Email */}
        <div className="email mt-5 w-[100%]">
          <div className="email flex flex-col gap-2">
            <label htmlFor="email1" className="text-lg font-[600]">
              Email
            </label>
            <input
              type="email"
              id="email1"
              {...register("email", { required: true })}
              placeholder="Enter email"
              className="w-full h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                Please enter your email
              </span>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div className="phnumber w-[100%] mt-5 flex flex-col">
          <div className="mb-1.5">
            <label htmlFor="phone" className="text-lg font-[600]">
              Phone Number
            </label>
          </div>
          <div className="flex gap-7 justify-center items-center text-lg font-bold">
            <div className="nine flex gap-2 bg-[#161D29] shadow-[0px_1px_2px_rgba(255,255,255,0.6)] rounded-2xl p-3 text-lg">
              <select
                name="countryCode"
                id="countryCode"
                className="bg-[#161D29] text-white outline-none border-none w-[60px]"
              >
                {CountryCode.map((item, index) => (
                  <option key={index} value={item.code}>
                    {item.code} - {item.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <input
                type="number"
                id="phone"
                {...register("phoneNumber", { required: true , maxLength : {value : 10 , message : "Invaild mobile number"} })}
                placeholder="Enter phone number"
                className="w-full h-[7vh] bg-[#161D29] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">
                  Please enter your phone number
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="flex w-[100%] justify-center mt-2 flex-col ">
          <label htmlFor="msg" className="text-lg mb-1.5 font-[600]">
            Message
          </label>
          <textarea
            id="msg"
            {...register("message", { required: true })}
            placeholder="Enter your message"
            className=" h-[20vh] bg-[#161D29] p-3  placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
          ></textarea>
          {errors.message && (
            <span className="text-red-500 text-sm">
              Please enter your message
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="btn w-full mt-4 flex justify-center rounded-xl items-center bg-[#FFD60A]">
          <button className="text-black h-[6vh] font-[550]" disabled={loading}>
            {loading ? "Sending..." : "Send message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
