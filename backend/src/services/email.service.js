const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });

 const sendEmail = async function(to,subject,text,html){
    try{
        await transporter.sendMail({
     from: `"Rusume Checking App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
        })
        console.log('Email sent successfully');
    }
    catch(error){
       console.error('Error sending email:', error); 
    }
 }

 async function sendRegistrationEmail(userEmail, name){
    const subject = "Your Account Has Been Successfully Created";

    const text = `Dear ${name},
    
    Welcome to Banking System!
    
    Your account has been successfully created and you can now start using our services.
    
    If this wasn't you, please contact our support team immediately.
    
    Best regards,
    Banking System Team
    `;
    
    const html = `
    <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:40px;">
      <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    
        <div style="background:#0a3d62; color:white; padding:25px; text-align:center;">
          <h1 style="margin:0;">Banking System</h1>
        </div>
    
        <div style="padding:30px; color:#333;">
          <h2 style="color:#0a3d62;">Welcome ${name} 🎉</h2>
    
          <p style="font-size:16px;">
            Your account has been <strong>successfully created</strong>.
            You can now access all banking features and manage your finances securely.
          </p>
    
          <p style="font-size:16px;">
            If this account was not created by you, please contact our support team immediately.
          </p>
    
          <div style="text-align:center; margin:30px 0;">
            <a href="#" style="background:#1e90ff;color:white;padding:12px 25px;text-decoration:none;border-radius:5px;font-size:16px;">
              Login to Your Account
            </a>
          </div>
    
          <p style="font-size:14px; color:#777;">
            Thank you for choosing Banking System.
          </p>
        </div>
    
        <div style="background:#f1f1f1; padding:15px; text-align:center; font-size:13px; color:#777;">
          © 2026 Banking System | Secure Digital Banking
        </div>
    
      </div>
    </div>
    `;
    await sendEmail(userEmail, subject, text, html);
 }

 module.exports = {
  sendRegistrationEmail
}