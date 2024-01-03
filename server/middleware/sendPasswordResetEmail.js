import nodemailer from 'nodemailer';

//fhhl ngbh pwhi gmxc
//ZahraaHerz1999@Gmail.com


// Async function to send a password reset email
export const sendPasswordResetEmail = (token, email, name) => {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ZahraaHerz1999@Gmail.com', // replace with your Gmail email address
      pass: 'fhhl ngbh pwhi gmxcs'   // replace with your Gmail email password
    }
  });

  // Compose the email
  const mailOptions = {
    from: 'your_email@gmail.com',  // replace with your Gmail email address
    to: email,
    subject: 'Password Reset',
    html: `
      <p>Hello ${name},</p>
      <p>We received a request to reset your password. Please click the following link to reset your password:</p>
      <a href="http://localhost:3000/password-reset/${token}">Reset Password</a>
      <p>If you did not request a password reset, please ignore this email.</p>
    `
  };

  transporter.sendMail(mailOptions) , function(error, info) {
    if(error){
        console.error('Error sending email:', error);

    } else {
        console.log('Email sent:', info.response);
    }
};
};
