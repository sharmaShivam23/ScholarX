const Profile = require("../model/Profile");
const user = require("../model/user");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.profile = async (req, res) => {
  try {
    const {firstName , lastName ,  gender, dob, phoneNumber, about } = req.body;
    const { id } = req.body;

    if (!firstName || !lastName || !gender || !dob || !phoneNumber || !about) {
      return res.status(400).json({
        success: false,
        message: "All details are required",
      });
    }
    if(!id) {
      return res.status(400).json({
        success: false,
        message: " user Id is required",
      });
    }

    const userDetails = await user.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    if (!profileDetails) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    profileDetails.gender = gender;
    profileDetails.dob = dob;
    profileDetails.phoneNumber = phoneNumber;
    profileDetails.about = about;
    userDetails.firstName = firstName;
    userDetails.lastName = lastName;

    await profileDetails.save();
    await userDetails.save();

const updatedUser = await user.findById(id).populate("additionalDetails");


    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user : updatedUser
    });
  } catch (err) {
    console.error("Error in profile update:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

//delete account

exports.delteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const userDetails = await user.findById(id);

    if (!userDetails) {
      res.status(400).send({
        success: false,
        message: "userid not found",
      });
    }

    await Profile.findByIdAndUpdate({ _id: userDetails.additionalDetails });
    await user.findByIdAndDelete({ _id: id });

    res.status(200).send({
      success: true,
      message: "profile delete successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "failed to  delete profile",
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.body.id;

    const userDetails = await user.findById(id)
    .populate("additionalDetails")
    .populate({
      path: "courses",
      populate: {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      },
    })
    .exec();
    // const userDetails = await user
    //   .findById(id)
    //   .populate("additionalDetails")
    //   .populate("courses")
    //   .exec();

    return res.status(200).send({
      success: true,
      message: "user details fetched successfully",
      userDetails
    });
  } catch (Err) {
    console.log(Err);
    res.status(500).send({
      success: false,
      message: "error to get information",
    });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    const imageFile = req.files.image;
    const { id } = req.params;

    const response = await uploadImageToCloudinary(imageFile, "ScholarX");

    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    const updateUser = await user.findByIdAndUpdate(
      id,
      { image: response.secure_url },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      updatedImage: response.secure_url,
      user: updateUser
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error to  upload image",
    });
  }
};
