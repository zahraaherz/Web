import nodemailer from 'nodemailer';

//fhhl ngbh pwhi gmxc
//ZahraaHerz1999@Gmail.com


export  const sendVerificationEmail = (token, email, name, id)=>{

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ZahraaHerz1999@Gmail.com', // replace with your Gmail email address
          pass: 'fhhl ngbh pwhi gmxc'   // replace with your Gmail email password
        }
      });

      const mailOptions = {
        from: 'ZahraaHerz1999@Gmail.com',  // replace with your Gmail email address
        to: email,
        subject: 'Email Verification',
        html: `
          <p>Hello ${name},</p>
          <p>Thank you for signing up. Please click the following link to verify your email:</p>
          <a href="http:localhost:3000/email-verify/${token}">Verify Email</a>
          <p>If you did not sign up, please ignore this email.</p>
        `
      };
    
    
        // Send the email
        transporter.sendMail(mailOptions) , function(error, info) {
            if(error){
                console.error('Error sending email:', error);

            } else {
                console.log('Email sent:', info.response);
            }
        };
      
    
}