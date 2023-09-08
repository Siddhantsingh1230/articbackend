import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

//Send Cookies
export const sendCookie = (
  remember = false,
  user,
  res,
  message,
  statusCode = 200
) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  let timeout = 15;
  if(remember){
    timeout = 60 ;
  }
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: timeout * 60 * 1000,
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      message,
      user,
    });
};

// Sends mail on successful registration
export const sendRegMail = (name, date, from, pass, recipient, sub) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: from,
      pass: pass,
    },
  });

  // Compile the EJS template
  const emailTemplatePath = path.join(
    path.resolve(),
    "/views/Registration_mail.ejs"
  );

  // Define the email content and recipient
  const mailOptions = {
    from: from,
    to: recipient,
    subject: sub,
  };

  // Data to be passed into the EJS template
  const data = {
    name,
    date,
  };

  // Render the EJS template
  ejs.renderFile(emailTemplatePath, data, (err, html) => {
    if (err) {
      console.error("Error rendering EJS template:", err);
      return;
    }

    // Set the HTML content of the email
    mailOptions.html = html;

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });
};
