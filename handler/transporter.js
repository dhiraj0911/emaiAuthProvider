const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS, 
        pass: process.env.EMAIL_PASSWORD, 
    },
});

async function sendOtpEmail(email, otp) {
    await transporter.sendMail({
        from: '"Cojag" fakeauth1100@gmail.com',
        to: email,
        subject: "Otp Verification",
        text: `Your OTP is: ${otp}`,
    });
}

module.exports = {sendOtpEmail};