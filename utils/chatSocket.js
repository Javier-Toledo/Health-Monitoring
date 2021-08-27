const {tokenAuth} = require ('../controllers/sesionController');
const models = require ('../controllers/socketsController');
const { sendPushNotification } = require('../utils/pushNotifications');

exports.chatSocket = (socket) =>
async (request, response, next) => {

  id = request.user.id

  if ( !valido ) {
    console.log('socket no identificado');
    return socket.disconnect();
  }

  models.userConnected( id );

   // Unir al usuario a una sala de socket.io
   socket.join( id );

   // Validar el JWT 
   // Si el token no es válido, desconectar
   // Saber que usuario está activo mediante el id
  // saber que usuario esta activo mediante el id
  // emitir a los usuarios conectados
  this.io.emit( 'list-users',  models.getUsers() )
 //Socket join, id
 
// cuando se reciba un mensaje desde un cliente
socket.on('message', async (msg) => {
  const message =  models.recordMessage( msg );
  this.io.to( msg.UserIdEnvio ).emit( 'message', message);
  this.io.to( msg.UserIdRecibido ).emit( 'message', message);
});
  
 // Disconnect
// Marcar en la BD que el usuario se desconecto
// Emitir todos los usuarios conectados
socket.on('disconnect', async() => {
    models.userDisconnected( id );
    this.io.emit( 'list-users',  models.getUsers() )
});

}


