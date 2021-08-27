const { Op } = require("sequelize");

const {Message} = require('../models');

exports.listMessages = async (req, res, next) => {
  try {
      const message = await Message.findAll({});
      if(!message) {
          res.tatus(404).json({message: 'No se encontraron mensajes'})
      } else {
      res.json(message);
      }
  } catch (error) {
      console.error(error);
      res.json({ message: 'Error reading Messages' });
      next();
  }
};

// eliminar mensaje
exports.delete = async (req, res, next) => {
  try {
      const messages = await Message.findByPk(req.params.id);
      if (!messages) {
          res.status(404).json({ error: true, message: 'No se encontró el message. '});
      } else {
          await messages.destroy(); // oferta.destroy({ where: {id: req.params.id }});
          res.json({ message: 'El mensaje fue eliminado. ' });
      }
  } catch (error) {
      res.status(503).json({ message: 'Error al eliminar mensaje. ' });
      next();
  }
};