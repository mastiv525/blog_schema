const dotenv = require('dotenv')
dotenv.config()
module.exports.mail = async (req) => {

    var nodemailer = require('nodemailer')
    var transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }

    })

    var mailOptions = {

        from: 'do.not.reply.netprogs.pl@gmail.com',
        to: 'do.not.reply.netprogs.pl@gmail.com',
        subject: `Email from ${req.body.name}. Email address ${req.body.email}`,
        text: `Subject of the message ${req.body.subject}. Message - ${req.body.message}`

    }

    let info = await transporter.sendMail(mailOptions)

    return info.messageId

}