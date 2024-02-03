import nodemailer from 'nodemailer';

//tqlh kkuy kgau pglw
//maaleena7@gmail.com


export  const sendVerificationEmail = (token, email, name, id)=>{

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'maaleena7@gmail.com', // replace with your Gmail email address
          pass: 'tqlh kkuy kgau pglw'   // replace with your Gmail email password
        }
      });

      const mailOptions = {
        from: 'maaleena7@gmail.com',  // replace with your Gmail email address
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