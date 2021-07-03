require('dotenv').config();
const nodemailer = require ('nodemailer');

const SERVIDOR_SMTP = 'smtp.office365.com';
const USUARIO_SMPT = 'toledo_javier@outlook.com';
const PASSWORD_SMPT = 'Toledo1008';

exports.passwordEmail = async (nombre, email, token) => {
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
        
        let mensaje = `Hello ${nombre} <br>`;
            mensaje += 'You have requested to reset your password, ';
            mensaje += ` <a href="http://localhost:5000/recover-password/${token}"> Click here </a> <br> `;
            mensaje += 'The link is valid only for one hour from its submission.';

        let info = await transporter.sendMail({
            from: '"Javier Toledo 👻" <toledo_javier@outlook.com>', // sender address
            to: `${nombre} <${email}>`, // list of receivers
            subject: "Password recovery", // Subject line
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