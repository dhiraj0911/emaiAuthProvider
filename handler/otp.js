const { sendOtpEmail } = require('./transporter');

const otpStore = {};


function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

function cleanExpiredOtps() {
    const now = Date.now();
    for (const email in otpStore) {
        if (otpStore[email].expires < now) {
            delete otpStore[email];
        }
    }
}

const sendotp = async (req, res) => {
    const { email } = req.body;
    if (!email || !validateEmail(email)) {
        return res.status(400).send({ message: 'Invalid email' });
    }

    // Generate OTP and store it with a 5-minute expiration
    const otp = generateOTP();
    otpStore[email] = { otp, expires: Date.now() + 300000 }; // 5 minutes in milliseconds

    // Send the OTP via email
    sendOtpEmail(email, otp).then(() => {
        res.send({ message: 'Verification code sent successfully' });
    }).catch(error => {
        res.status(500).send({ message: 'Failed to send Verification code', error: error.message });
    });
};

const verifyotp = (req, res) => {
    const { email, otp } = req.body;
    const record = otpStore[email];
    if (!record || record.otp !== otp || Date.now() > record.expires) {
        return res.status(400).send({ message: 'Invalid or expired Verification code' });
    }

    // OTP is valid
    delete otpStore[email]; // Remove OTP from store
    res.send({ message: 'Verification code verified successfully' });
};

setInterval(cleanExpiredOtps, 60000);

module.exports = {sendotp, verifyotp};