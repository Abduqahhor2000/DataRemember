const nodemailler = require("nodemailer");

const sendEmail = (options) => {
    const transporter = nodemailler.createTransport({
        host: 'smtp.gmail.com',
        service: "gmail",
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from: `<b>Data Remember`,
        to: options.to,
        subject: options.subject ,
        html: options.text
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        }else{
            console.log(info) 
        }
    })
}
module.exports = sendEmail