
const bcrypt = require ('bcrypt');
const {User} = require('../models');

const multer = require('multer');
const multerConfig = require('../middlewares/multerConfigUsers');
const { authAccountEmail } = require('../utils/authAccountEmail');
// set multer config and model field
const upload = multer(multerConfig).single('avatar');

// file upload
exports.fileUpload = (req, res, next) => {
    //console.log("confi");
    upload(req, res, function(error) {
      if (error) {
        console.log(error);
        res.json({ message: error });
        
      }
      return next();
    });
  };
  
exports.add = async (req, res, next) => {
    try {
        // validar que venga la contraseña
        if (!req.body.password) {
            res.status(400).json({ menssage: 'The password and email are required.' });
            next();
        }
        
        // si si trae la contraseña y el email, proceder al registro
        const userData = {...req.body};

        if(req.file && req.file.filename) {
          userData.avatar = req.file.filename;
        }

        // cifrar la contraseña
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        //generar el token de recuperación de contraseña
        let token = await bcrypt.hash(userData.email + Date.now().toString(), 10);
        token = token.replace(/\//g, "l");
        //guardar el token
        userData.accountAuthToken = token;
        userData.accountAuthExpire = Date.now() + 3600000;

        // guardar el usuario
        const usuario = await User.create(userData);

        // evitar enviar la contraseña en la respuesta
        usuario.password = null;

        //enviar el email
        const resultadoEmail = await authAccountEmail(
            `${usuario.firtsName} ${usuario.lastNames}`,
            usuario.email,
            token
        );
        if (resultadoEmail) {
            res.json({ message: 'The user has been registered and a verification message has been sent to the email provided',usuario});
        }else {
            res.status(503).json({ error: true, message: 'An error occurred while sending the verification email',})
        }
        //res.json({ menssage: 'El usuario a sido registrado.', usuario});
    } catch (error) {
        console.log(error);

        let errores = [];
        if (error.errors) {
            errores = error.errors.map( errorItem => ({
                campo: errorItem.path,
                error: errorItem.message,
            }));
        }
        res.json({ error: true, mensaje: 'Register Error User.' , errores });
    }
};

// listar los usuarios
exports.listArea = async (req, res, next) => {
    try {
        // extraer la lista de usuarios
        const user = await User.findAll({
            where: {area: req.user.area , workstation: req.user.workstation, id: {[Op.not]: `${req.user.id}`}},
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error reading users' });
        next();
    }
};
