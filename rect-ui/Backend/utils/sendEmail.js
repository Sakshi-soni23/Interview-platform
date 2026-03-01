import nodemailer from "nodemailer"

export const sendotpEmail = async (email,otp)=>{
    const transpoter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
        
    })

    const emailtemplate = ` <div style="
      max-width: 500px;
      margin: auto;
      padding: 24px;
      font-family: Arial, Helvetica, sans-serif;
      background-color: #0f172a;
      border-radius: 12px;
      color: #ffffff;
    ">
      <h2 style="color: #a855f7; text-align: center;">
        🔐 Verify Your Login
      </h2>

      <p>Hello,</p>

      <p>
        Use the OTP below to complete your login.
        This code is valid for <b>5 minutes</b>.
      </p>

      <div style="
        margin: 24px 0;
        padding: 16px;
        background-color: #1e293b;
        text-align: center;
        font-size: 32px;
        letter-spacing: 6px;
        border-radius: 8px;
        font-weight: bold;
        color: #facc15;
      ">
        ${otp}
      </div>

      <p style="color: #f87171;">
        ⚠️ Do not share this OTP with anyone.
      </p>

      <hr style="border: 1px solid #334155; margin: 24px 0;" />

      <p style="font-size: 12px; color: #94a3b8;">
        If you did not request this login, you can safely ignore this email.
      </p>

      <p style="margin-top: 16px;">
        — Talkto AI
      </p>
    </div>`
    await transpoter.sendMail({
        from: `"Talkto AI " <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Login OTP",
        html: emailtemplate ,
    });
}