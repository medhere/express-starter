


exports.connection = (socket) => {
    console.log('A user connected!');

    socket.on('someEvent', (data) => {
        console.log('Received data:', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
}


