import nodemailer from 'nodemailer';

async function sendEmail({ to, subject, text }) {
    if (!to || (Array.isArray(to) && to.length === 0) || to.trim?.() === '') {
        console.log('No recipient provided. Skipping email.');
        return;
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to, // string or array
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default sendEmail;
