module.exports = function(io) {
    const connectedUsers = {}; // Objeto para almacenar usuarios conectados

    io.on('connect', socket => {
        let username = '';

        // Asigna un nombre de usuario o genera uno aleatorio si no se proporciona
        username = socket.handshake.query.username || generateRandomUsername();
        connectedUsers[socket.id] = username;

        // Envia la lista de usuarios conectados a todos los clientes
        io.emit('connected users', Object.values(connectedUsers));

        // Maneja la desconexión de un usuario
        socket.on('disconnect', () => {
            delete connectedUsers[socket.id];
            io.emit('connected users', Object.values(connectedUsers));
        });

        // Manejar el evento 'name' enviado por el cliente
        socket.on('name', function(data) {
            username = data || `Anónimo${Math.floor(Math.random() * 1000)}`;
            connectedUsers[socket.id] = username;
            io.emit('connected users', Object.values(connectedUsers));
            console.log('Nombre recibido:', username);
        });

        // Manejar el evento 'send message' enviado por el cliente
        socket.on('send message', function(message) {
            // Emitir un nuevo evento 'new message' con el nombre de usuario y el mensaje
            io.emit('new message', { username, message });
            console.log(`Usuario ${username} ha enviado un mensaje: ${message}`);
        });

        // Genera un nombre de usuario aleatorio
        function generateRandomUsername() {
            return `Anónimo${Math.floor(Math.random() * 1000)}`;
        }
    });
};