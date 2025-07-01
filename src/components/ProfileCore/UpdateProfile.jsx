import React from "react";
import YellowBtn from "../cores/Homepage/YellowBtn";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import YellowIconBtn from "../cores/Homepage/YellowIconBtn";
import { BiLogOut } from "react-icons/bi";
import Shadowbtn from "../cores/Homepage/Shadowbtn";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { updateProfileImage } from "../../services/apis";
import axios from "axios";
import { apiConnect } from "../../services/apiconnect";
import { logout, setProfileImage } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { updateUser } from "../../services/apis";
import { setUser } from "../../slices/ProfileSlice";
import { resetpassword } from "../../services/apis";
import { updatePassword } from "../../services/apis";
import { deleteProfile } from "../../services/apis";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../slices/authSlice";
import toast from "react-hot-toast";


const UpdateProfile = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile);
  const id = user?._id;
  const {token} = useSelector((state) => state.auth)
  const { profileImage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    phoneNumber: "",
    about: "",
    id,
  });
  const [passdata , setpassdata] = useState({
    currentPassword : "",
    newPassword : "",
    id : id
  })
  const [fileName, setFileName] = useState("Select");
  const [formData, setFormData] = useState({
    image: null,
  });


  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    const image = event.target.files[0];
    if (image) {
      setFileName(image.name);
    }
  };

  const handleProfileImage = async () => {
    dispatch(setLoading(true))
    console.log(formData);
    
    const toastId =  toast.loading("Loading wait....")
    try {

      const endpoint = updateProfileImage(id).UPDATEIMAGE_API;
      const response = await axios.put(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      dispatch(setProfileImage(response.data.updatedImage));
      toast.success(response.data.message , {id : toastId})
      // localStorage.setItem("profileImage", response.data.updatedImage);
      console.log(response);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message , {id : toastId})
      dispatch(setLoading(false))
    }
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleUpdateUser = async () => {
    dispatch(setLoading(true))
    const toastId =  toast.loading("Submitting data...")
    console.log(passdata);
    try {
      const res = await apiConnect("PUT", updateUser.UPDATEUSER_API, form);
      console.log(res);
      dispatch(setUser(res.data.user));
      toast.success(res.data?.message , {id : toastId})
      if(res.data.success == true){
        clearFields()
      }
      // localStorage.setItem("user", res.data.user);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message , {id : toastId})
     
    }
    finally{
      dispatch(setLoading(false))
    }
  };

  function handlepassChange(e){
    const { name, value } = e.target;
    setpassdata((prev) => ({ ...prev, [name]: value }));
  }

    async function handleForm(e) {
      e.preventDefault();
      console.log(passdata);
      dispatch(setLoading(true))
      const toastId = toast.loading("Password Updating....")
  
      try{
      const response = await apiConnect('PUT' , updatePassword.NEWPASS_API ,passdata)
      toast.success(response.data?.message , {id : toastId})
      console.log(response);
      clearFields()
      
      } catch(Err){
        console.log(Err);
        if(Err?.response?.data?.message){
        toast.error(Err?.response?.data?.message , {id : toastId})
        } else {
          toast.error("Something went wrong")
        }
      }
      finally{
        dispatch(setLoading(false))
      }
      
    }




   async function handleDelete(){
    dispatch(setLoading(true))
    const toastId =  toast.loading("Deleting Account...")
    try{
      const endPoint = deleteProfile(id).DELPROFILE_API
     const response = await apiConnect("DELETE",endPoint)
     toast.success(response?.data?.message , {id : toastId})
     navigate("/login")
     dispatch(logout())
     
     console.log(response);
     
    }
    catch(Err){
      console.log(Err);
      toast.Err(Err?.response?.data?.message , {id : toastId})
    }
    finally{
      dispatch(setLoading(false))
    }
    }
   
    function  clearFields(){
      setForm({
        firstName: "",
        lastName: "",
        dob: "",
        about: "",
        gender: "",
        phoneNumber: ""
      });
      setpassdata({
        currentPassword : "",
        newPassword : "",
      })
    }



  


  return (
    // <div className="p flr items-end">
    <>
      {/* <Sidebar/> */}
      <div className="mt-16 p-10 pb-16 overflow-x-hidden ml-auto bg-[#000814] h-auto">
        <div className="p2 w-full md:max-w-[85vw] ml-auto">
          <div className="p3 relative max-w-[90vw]  sm:max-w-[65vw] m-auto ">
            <h1 className="p-3 text-4xl font-[600] text-white ">
              Edit Profile
            </h1>

            {/* profile image upadate */}
            <div className="div1 mt-12 shadow-[2px_0px_0px_rgba(255,255,255,0.3)]  rounded-lg bg-[#161D29] h-auto p-10">
              <div className="user flex justify-between items-center">
                <div className="i flex flex-col sm:flex-row text-center sm:text-start justify-center items-center gap-5">
                  <img
                    src={profileImage}
                    alt={user?.firstName}
                    className="h-[100px] w-[100px] object-cover rounded-full bg-white"
                  />
                  <div className="details flex flex-col">
                    <p className="text-lg font-bold text-white">
                      Change Profile Picture
                    </p>
                    <div className="p flex justify-center items-center gap-4 mt-4">
                      {/* <Shadowbtn text="select"></Shadowbtn> */}
                      <div className="sm:w-1/2 w-full">
                        <input
                          type="file"
                          // value ={image}
                          id="fileInput"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="fileInput"
                          className="h-[48px]   w-auto px-5 bg-[#161D29] text-white font-semibold flex justify-center items-center  shadow-[0px_1px_2px_rgba(255,255,255,0.6)] cursor-pointer hover:bg-[#1f2738] rounded-md transition-all duration-300"
                        >
                          <span className="mr-2 text-md">{fileName}</span>

                          {fileName == "Select" ? (
                            <div className="text-xl text-violet-800">
                              <FaCloudUploadAlt />
                            </div>
                          ) : (
                            <div className="text-xl text-green-400">
                              <FaCheckCircle />
                            </div>
                          )}
                        </label>
                      </div>
                      <div onClick={handleProfileImage} className="bt">
                        <YellowIconBtn text="Upload" icon={<BiLogOut />} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="div1 mt-10 relative shadow-[2px_0px_0px_rgba(255,255,255,0.3)]  rounded-lg bg-[#161D29] h-auto p-10">
              <div className="user flex flex-col">
                <h1 className="text-2xl mt-10 sm:mt-0 font-[600] text-white">
                  Profile Information
                </h1>

                <div className="pro grid text-white grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
                  <div className="mt-5.5">
                    <div className="name  flex flex-col gap-2">
                      <label htmlFor="name" className="text-lg font-[600]">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        className="w-full h-[7vh]  placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
                      />
                    </div>
                  </div>

                  <div className="lname mt-5.5 text-white">
                    <div className="lname  flex flex-col gap-2">
                      <label
                        htmlFor="lname"
                        className="text-lg text-white font-[600]"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lname"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        className="w-full h-[7vh] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
                      />
                    </div>
                  </div>

                  <div className="dob mt-5.5">
                    <div className="dob  flex flex-col gap-2">
                      <label htmlFor="dob" className="text-lg font-[600]">
                        Date Of Birth
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={form.dob}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        className="w-full h-[7vh]  placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
                      />
                    </div>
                  </div>

                  
                  <div className="Gender mt-5.5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="gender" className="text-lg font-[600]">
                        Gender
                      </label>
                      <select
                        name="gender"
                        id="gender"
                        value={form.gender}
                        onChange={handleInputChange}
                        className="w-full h-[7vh] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)] text-black"
                      >
                        <option value="" disabled>
                          Select gender
                        </option>
                        <option className="bg-black text-white" value="male">
                          Male
                        </option>
                        <option className="bg-black text-white" value="female">
                          Female
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="Contact Number mt-5.5">
                    <div className="Contact Number  flex flex-col gap-2">
                      <label
                        htmlFor="Contact Number"
                        className="text-lg font-[600]"
                      >
                        Contact Number
                      </label>
                      <input
                        type="number"
                        id="Contact Number"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Contact Number"
                        className="w-full h-[7vh]  placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
                      />
                    </div>
                  </div>

                  <div className="About mt-5.5">
                    <div className="About  flex flex-col gap-2">
                      <label htmlFor="About" className="text-lg font-[600]">
                        About
                      </label>
                      <input
                        type="text"
                        id="About"
                        name="about"
                        value={form.about}
                        onChange={handleInputChange}
                        placeholder="Enter Bio Details"
                        className="w-full h-[7vh] placeholder:font-[600]  pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="btn absolute top-4 right-7">
                  <YellowIconBtn
                    text="Edit"
                    icon={<BiLogOut />}
                  ></YellowIconBtn>
                </div>
              </div>
            </div>

            <div className="btn flex absolute -right-10  justify-center items-center m-10 gap-4">
              <div className="btn">
                <button className="w-[100px] text-white flex justify-center items-center rounded-md h-[45px] bg-[#161D29] font-bold text-lg">
                  Cancel
                </button>
              </div>
              <div onClick={handleUpdateUser} className="btn cursor-pointer">
                <button className="w-[100px] flex justify-center items-center rounded-md h-[45px] bg-[#FFD60A] font-bold text-lg">
                  Save
                </button>
              </div>
            </div>

            <div className="div1 mt-32  shadow-[2px_0px_0px_rgba(255,255,255,0.3)]  rounded-lg bg-[#161D29] h-auto p-10">
              <h1 className="text-white font-bold text-2xl">Password</h1>
              <div className="grid text-white grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="mt-5.5">
                  <div className="pass  flex flex-col gap-2">
                    <label htmlFor="pass" className="text-lg font-[600]">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="pass"
                      name="currentPassword"
                      value={passdata.currentPassword}
                      onChange={handlepassChange}
                      placeholder="Enter current password"
                      className="w-full h-[7vh]  placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
                    />
                  </div>
                </div>

                <div className="cpass mt-5.5 text-white">
                  <div className="cpass  flex flex-col gap-2">
                    <label
                      htmlFor="cpass"
                      className="text-lg text-white font-[600]"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="cpass"
                      name="newPassword"
                      value={passdata.newPassword}
                      onChange={handlepassChange}
                      placeholder="Enter new password"
                      className="w-full h-[7vh] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="btn flex absolute -right-10  justify-center items-center m-10 gap-4">
              <div className="btn">
                <button className="w-[100px] text-white flex justify-center items-center rounded-md h-[45px] bg-[#161D29] font-bold text-lg">
                  Cancel
                </button>
              </div>
              <div onClick={handleForm} className="btn">
                <button className="w-[100px] flex justify-center items-center rounded-md h-[45px] bg-[#FFD60A] font-bold text-lg">
                  Update
                </button>
              </div>
            </div>

            {/* delete account */}
            <div className="div1 mt-32   border-2 border-[#691432] rounded-lg bg-[#340019] h-auto p-10">
              <div className="flex flex-col sm:flex-row">
                <div className="icon w-[80px] m-10  mt-0 h-[80px] bg-[#691432] rounded-full flex justify-center items-center">
                  <RiDeleteBin5Fill className="text-5xl text-[#EF476F]" />
                </div>
                <div className="txt">
                  <h1 className="text-xl font-semibold text-white">
                    Delete Account
                  </h1>
                  <p className="txt mt-2 text-white text-md font-[400]">
                    Would you like to delete account? <br /> This account
                    contains Paid Courses. Deleting your account will remove all
                    the <br /> contain associated with it.
                  </p>
                  <p onClick={handleDelete} className="red mt-2 cursor-pointer text-lg italic text-[#D43D63]">
                    I want to delete my account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
