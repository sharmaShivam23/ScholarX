// const nodemailer = require('nodemailer')
// require('dotenv').config()

// const mailSender = async(email ,title , body ) => {
//   try{
//   let transporter = nodemailer.createTransport({
//     host : process.env.MAIL_HOST,
//     auth : {
//       user : process.env.MAIL_USER,
//       pass : process.env.MAIL_PASS,
//     }
//   })

//   let info = await transporter.sendMail({
//     from: 'scholarX',
//     to : `${email}`,
//     subject : `${title}`,
//     html : `${body}`
//   })
//   console.log(info);
//   return info
  
//   }catch(err){
//     console.log(err.message);
//     throw err
//   }
// }

// module.exports = mailSender

const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,  
      port: 587,
      secure: false, // use TLS
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({  // ✅ added await
      from: `"ScholarX" <${process.env.MAIL_USER}>`, // ✅ real email address
      to: email,
      subject: title,
      html: body,
    });

    // console.log("Email sent:", info.messageId);
    return info;

  } catch (err) {
    console.error("MailSender error:", err);
    throw err; // ✅ re-throw error so caller knows it failed
  }
};

module.exports = mailSender;
