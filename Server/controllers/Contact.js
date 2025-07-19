const Contact = require("../model/Contact")


const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const isValidPhone = (phone) =>
  /^\d{10,12}$/.test(phone)

exports.submitContactForm = async (req, res) => {
  try {
    const { email, firstname, lastname, message, phoneNo } = req.body


    if (!email || !firstname || !message || !phoneNo) {
      return res.status(400).json({
        success: false,
        message: "All required fields (email, firstname, message, phoneNo) must be filled.",
      })
    }


    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      })
    }

  
    if (!isValidPhone(phoneNo)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number. Must be 10-12 digits.",
      })
    }

    
    if (message.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Message is too short. Minimum 5 characters required.",
      })
    }

    
    const contact = await Contact.create({
      email,
      firstname,
      lastname,
      message,
      phoneNo,
    })

    return res.status(200).json({
      success: true,
      message: "Message submitted successfully.",
      data: contact,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    })
  }
}
