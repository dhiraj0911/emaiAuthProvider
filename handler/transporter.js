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
        from: '"Cojag"',
        to: email,
        subject: "Verification code",
        text: `Your verification code is: ${otp}`,
    });
}

module.exports = {sendOtpEmail};