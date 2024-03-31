module.exports = function(io){

    io.on('connect', socket => {
        console.log('Nuevo usuario conectado');
socket.on('send message', function(data){
io.sockets.emit('new message', data)
})

    });
}