
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

exports.listadmin = async (req, res, next) => {
    try {
        let roleadmin = `manager`;
        // extraer la lista de usuarios
        const user = await User.findAll({
            where: {area: req.user.area , role: roleadmin },
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error reading users' });
        next();
    }
};

exports.update = async (req, res, next) => {
    try {
        // obtener el registro del videojuego desde la bd
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ mensaje: 'The user was not found.'});
        } else {
                // actualizar en la bd
                // generate new product
                let newUser = req.body;
                // if new image
                if(req.file && req.file.filename) {
                    newUser.avatar = req.file.filename;
                } else {
                    const user = await User.findByPk(req.params.id);
                    newUser.avatar = user.avatar;
                }
                // cifrar la contraseña
                const salt = await bcrypt.genSalt(10);
                newUser.password = await bcrypt.hash(newUser.password, salt);
                
            // procesar las propiedades que viene en body
            Object.keys(newUser).forEach((propiedad) => {
                user[propiedad] = newUser[propiedad];
            });
            // guaradar cambios
            await user.save();
            res.json({ mensaje: 'The record was updated.' });
        }
    } catch (error) {
        res.status(503).json({ mensaje: 'Failed to update user.' });
        next();
        }
};

exports.updateUserArea = async (req, res, next) => {
    try {
        // obtener el registro del videojuego desde la bd
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ mensaje: 'The user was not found.'});
        } else {
                // actualizar en la bd
                // generate new user
                let newUser = req.body;
                user.area = newUser.area;
            // guaradar cambios
            await user.save();
            res.json({ mensaje: 'The user was updated from area.' });
        }
    } catch (error) {
        res.status(503).json({ mensaje: 'Failed to update user from area.' });
    }
};

// delete User
exports.delete = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ mensaje: 'The user was not found.'});
        } else {
            await user.destroy(); // user.destroy({ where: {id: req.params.id }});
            res.json({ mensaje: 'User was deleted.' });
        }
    } catch (error) {
        res.status(503).json({ mensaje: 'Failed to delete user. ' });
    }
};