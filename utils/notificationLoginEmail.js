require('dotenv').config();
const nodemailer = require ('nodemailer');

const SERVIDOR_SMTP = 'smtp.office365.com';
const USUARIO_SMPT = 'toledo_javier@outlook.com';
const PASSWORD_SMPT = 'Toledo1008';

exports.notificationLoginEmail = async (nombre, email, token) => {
    try {
        let transporter = nodemailer.createTransport({
            host: SERVIDOR_SMTP,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: USUARIO_SMPT, // generated ethereal user
              pass: PASSWORD_SMPT, // generated ethereal password
            },
        });
        
        let mensaje = `Hello ${nombre}. <br>`;
            mensaje += 'They are logged into their account, ';
            mensaje += 'if you have been, ignore this email, ';
            mensaje += 'if it was not you, log in to your account and change the password. <br>';
            mensaje += 'To log into your account enter the following link.';
            mensaje += ` <a href="http://localhost:5000/login"> ¡Click here! </a> <br> `;

        let info = await transporter.sendMail({
            from: '"Health-Monitoring 👻" <toledo_javier@outlook.com>', // sender address
            to: `${nombre} <${email}>`, // list of receivers
            subject: "Login to your account", // Subject line
            //text: "Hello world?", // plain text body
            html: mensaje, // html body
        });
        
        console.log("Message sent: %s", info.messageId);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};