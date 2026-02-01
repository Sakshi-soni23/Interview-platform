import nodemailer from "nodemailer"

export const sendotpEmail = async (email,otp)=>{
    const transpoter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
        
    })
    await transpoter.sendMail({
        from: `"Secure App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Login OTP",
        html: `<h2>Your OTP is: <b>${otp}</b></h2><p>Valid for 5 minutes</p>`,
    });
}