const { Op } = require("sequelize");

const {Message} = require('../models');

exports.listMessages = async (req, res, next) => {
  try {
      const message = await Message.findAll({});
      if(!message) {
          res.tatus(404).json({mensaje: 'No se encontraron mensajes'})
      } else {
      res.json(message);
      }
  } catch (error) {
      console.error(error);
      res.json({ mensaje: 'Error reading Messages' });
      next();
  }
};

// eliminar mensaje
exports.delete = async (req, res, next) => {
  try {
      const message = await Messages.findByPk(req.params.id);
      if (!message) {
          res.status(404).json({ mensaje: 'No se encontró el message. '});
      } else {
          await message.destroy(); // oferta.destroy({ where: {id: req.params.id }});
          res.json({ mensaje: 'El mensaje fue eliminado. ' });
      }
  } catch (error) {
      res.status(503).json({ mensaje: 'Error al eliminar mensaje. ' });
      next();
  }
};