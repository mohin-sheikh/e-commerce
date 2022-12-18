const nodemailer = require("nodemailer");

exports.mail = async (to, subject, text) => {
    const mailTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailDetails = {
        from: process.env.FROM_EMAIL,
        to: to,
        subject: subject,
        html: text,
    };
    await mailTransporter.sendMail(mailDetails, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
};
