const nodemailler = require("nodemailer")

const sendEmail = (options) => {
    const trasporter = nodemailler.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_FROM ,
        to: options.to,
        subject: options.subject ,
        html: options.text
    }

    trasporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        }else{
            console.log(info)
        }
    })
}
module.exports = sendEmail