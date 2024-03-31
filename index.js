const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//settings
app.set('port', process.env.PORT || 3001 )


require('./sockets.js')(io)
// console.log(path.join(__dirname,'public'));
app.use(express.static(path.join(__dirname,'public')));

// Levanta el servidor
server.listen(app.get('port'), () => {
    console.log('Servidor en funcionamiento en el puerto ',app.get('port'));
});