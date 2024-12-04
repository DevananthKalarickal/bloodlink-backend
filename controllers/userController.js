const nodemailer = require('nodemailer');

// Set up transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your email service
 port: 587,
    secure: false,
    auth: {
        user: 'bloodlink.care.dev@gmail.com', // Replace with your email
        pass: 'szahohtotyibnhgz', // Replace with your email app password
    },

});

// Define the sendMail function
async function sendMail(to, subject, text, html) {
    try {
        // Define email options
        const mailOptions = {
            from: 'bloodlink.care.dev@gmail.com',
            to,
            subject,
            text,
            html,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// Export the function
module.exports = { sendMail };
