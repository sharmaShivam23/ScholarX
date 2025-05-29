require("dotenv").config();
const user = require("../model/user");
const bcrypt = require("bcrypt"); 
const mailSender = require("../utils/mailSender");
const crypto = require("crypto")
const mongoose = require('mongoose')

// Generate and send password reset token
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const existEmail = await user.findOne({ email });
    if (!existEmail) {
      return res.status(400).json({
        success: false,
        message: "No user found with this email",
      });
    }

    // Generate token
    const token = crypto.randomUUID();

    // Update user with token and expiry
    await user.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000, // 5 mins
      },
      { new: true }
    );

    const url = `http://localhost:5174/updatepassword/${token}`
     // ✅ Fixed URL (was https:localhost)

    // Send email
    await mailSender(email, "Password Reset Link", `Click to reset your password: ${url}`);

    return res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
      token : token
    });
  } catch (err) {
    console.error("Error in resetPasswordToken:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send password reset email",
    });
  }
};

// Reset password using token
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token not found",
      });
    }

    const userDetails = await user.findOne({ token });

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token has expired",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.findOneAndUpdate(
      { token },
      {
        password: hashedPassword,
        token: undefined,
        resetPasswordExpires: undefined,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("Error in resetPassword:", err);
    res.status(500).json({
      success: false,
      message: "Error resetting password. Please try again.",
    });
  }
}





exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, id } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current and new passwords are required',
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

  

    // Find user by ID
    const foundUser = await user.findById(id);
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect current password',
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await user.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (err) {
    console.error('Error in updatePassword:', err);
    return res.status(500).json({
      success: false,
      message: `Error updating password: ${err.message}`,
    });
  }
};