const nodemailer = require("nodemailer");

function isMailConfigured() {
    return Boolean(process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS);
}

function createTransport() {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: Number(process.env.EMAIL_PORT) === 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

async function sendWelcomeMail(email, username) {
    if (!isMailConfigured()) {
        const error = new Error("Email service is not configured. Set EMAIL_HOST, EMAIL_USER and EMAIL_PASS in .env");
        error.code = "MAIL_NOT_CONFIGURED";
        throw error;
    }

    const transporter = createTransport();

    return transporter.sendMail({
        from: `"SHSEd Senior High School" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome to SHSEd Senior High School",
        html: `
            <h2>Welcome${username ? `, ${username}` : ""}!</h2>
            <p>Thank you for joining SHSEd Senior High School.</p>
            <p>Your account has been created successfully. Explore our programs and start your journey with us today.</p>
            <p>If you have any questions, feel free to contact our admissions office.</p>
            <p>Best regards,<br/>The SHSEd Team</p>
        `
    });
}

module.exports = { sendWelcomeMail, isMailConfigured };
