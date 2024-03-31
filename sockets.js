module.exports = function(io) {
    io.on('connect', socket => {
        let username = 'Anónimo';

        // Manejar el evento 'name' enviado por el cliente
        socket.on('name', function(data) {
            console.log(data);
            // Actualizar el nombre de usuario con el nombre recibido del cliente
            username = data || 'Anónimo';
            console.log('Nombre recibido:', username);
        });

        // Manejar el evento 'send message' enviado por el cliente
        socket.on('send message', function(message) {
            // Emitir un nuevo evento 'new message' con el nombre de usuario y el mensaje
            io.emit('new message', { username, message });
            console.log(`Usuario ${username} ha enviado un mensaje: ${message}`);
        });
    });
};
