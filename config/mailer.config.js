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


module.exports.contactUsEmail = (email, subject) => {
	transporter.sendMail({
		from: `"Teammate" <${process.env.NM_USER}>`,
		to: email,
		subject: "Your Comment has arrived",
		text: "You will receive your reply shortly.",
		html: `
				<h1>¡Thank you for contacting us!</h1>
				<p>We have received your message about ${subject}</p>
				<p>We will contact you as soon as possible</p>
			`
	})
};



module.exports.confirmInscription = (email) => {
	transporter.sendMail({
		from: `"Teammate" <${process.env.NM_USER}>`,
		to: email,
		subject: "Enrollment confirmation",
		text: "These are the details of your reservation",
		html: `<h1>You have signed up for the game</h1>
                <p>You are subscribed to the following event</p>
                <p></p>
                <p></p>`
	})
};


module.exports.confirmUnsubscribe = (email) => {
	transporter.sendMail({
		from: `"Teammate" <${process.env.NM_USER}>`,
		to: email,
		subject: "Enrollment confirmation",
		text: "These are the details of your reservation",
		html: `<h1>You have signed up for the game</h1>
                <p> </p>
                <p></p>
`
	})
};