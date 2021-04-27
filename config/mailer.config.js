const nodemailer = require("nodemailer");
const { generateTemplate} = require("./mailTemplate")

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASSWORD
    }
});


module.exports.sendActivationEmail = (email, token) => {
    transporter.sendMail({
        from: `Teammate <${process.env.NM_USER}>`,
        to: email,
        subject: "Thank you for signing up for Teammate",
        html: generateTemplate(token),
    })
}