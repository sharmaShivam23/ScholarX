import React from "react";
import YellowBtn from "../cores/Homepage/YellowBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const { profileImage } = useSelector((state) => state.auth);

  return (
    // <div className="p flr items-end">
    <div className=" w-full pt-16 ml-auto bg-[#000814]  h-screen">
      <div className="p2 w-full md:max-w-[85vw] md:ml-auto">
        <div className="p3 sm:max-w-[65vw] max-w-[90vw]  m-auto ">
          <h1 className="p-3 text-4xl  font-[600] text-white ">My Profile</h1>

          <div className="div1  mt-12 shadow-[2px_0px_0px_rgba(255,255,255,0.3)]  rounded-lg bg-[#161D29] h-auto p-10">
            <div className="user flex   justify-center items-center">
              <div className="i flex max-[500px]:flex-col text-center justify-center w-full items-center gap-5">
               
               {/* img */}
                <div className="img w-full flex justify-center sm:justify-start items-center">
                <img
                  src={profileImage}
                  alt={user?.firstName}
                  className="h-[100px] object-cover w-[100px] rounded-full bg-white"
                />
                </div>
               
               {/* detales */}
                <div className="details w-full justify-start text-white flex flex-col">
                  <p className="text-lg font-bold">{user?.firstName}</p>
                  <p className="text-md">{user?.email}</p>
                </div>

               {/* Edit */}
              <div
                onClick={() => navigate("/dashboard/settings")}
                className="btn  flex sm:justify-end justify-center w-full"
              >
                <YellowBtn text="Edit" />
              </div>
               </div>
            </div>
          </div>

          <div className="div1 mt-10 relative shadow-[2px_0px_0px_rgba(255,255,255,0.3)]  rounded-lg bg-[#161D29] h-auto p-10">
            <div className="user flex flex-col">
              <h1 className="text-2xl font-[600] text-white">
                Personal Details
              </h1>

              <div className="pro grid sm:grid-cols-2 grid-cols-1 gap-5 mt-4">
                <div className="1">
                  <p className="text-[#424854] text-md">First Name</p>
                  <p className="text-white text-md">{user?.firstName}</p>
                </div>

                <div className="1">
                  <p className="text-[#424854] text-md">Last Name</p>
                  <p className="text-white text-md">{user?.lastName}</p>
                </div>

                <div className="1">
                  <p className="text-[#424854] text-md">email</p>
                  <p className="text-white text-md">{user?.email}</p>
                </div>

                <div className="1">
                  <p className="text-[#424854] text-md">Phone number</p>
                  <p className="text-white text-md">
                    {user?.additionalDetails?.phoneNumber ?? "Add phone number"}
                  </p>
                </div>
                <div className="1">
                  <p className="text-[#424854] text-md">Gender</p>
                  <p className="text-white text-md">
                    {user?.additionalDetails?.gender ?? "Add gender"}
                  </p>
                </div>
                <div className="1">
                  <p className="text-[#424854] text-md">Date Of Birth</p>
                  <p className="text-white text-md">
                    {user?.additionalDetails?.dob
                      ? new Date(user.additionalDetails.dob).toLocaleDateString(
                          "en-GB"
                        )
                      : "Add date of birth"}
                  </p>
                </div>
              </div>

              <div
                onClick={() => navigate("/dashboard/settings")}
                className="btn absolute top-4 right-7"
              >
                <YellowBtn text="Edit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
