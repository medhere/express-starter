

module.exports = (io, socket) => {

    if (socket.recovered) {
        // recovery was successful: socket.id, socket.rooms and socket.data were restored
    } else {
        // new or unrecoverable session
        console.log('A user connected!: ' + socket.id);
    }

    socket.on("disconnect", (reason) => {
        console.log(`disconnected due to ${reason}`);
    });

    const message = (data, callback) => {
        console.log('Received data:', data);
        socket.emit('foo', 'got it lol')
        callback('test callback')
    }

    //get emitted event
    socket.on('message', message);


    //send
    // socket.emit("hello", "world", (response) => {
    //   console.log(response); // "got it"
    // });

    //recieve
    // socket.on("hello", (arg, callback) => {
    //   console.log(arg); // "world"
    //   callback("got it");
    // });

    //to set user socket id
    // socket.userId = 1;

    //disconnect user
    // socket.disconnect(true);

    //join room
    // socket.join("room1");

    //check room
    // console.log(socket.rooms);

    //broadcast
    // socket.to("some room").emit("some event");

    //store arbitrary data
    // socket.data.username = "alice";

    // to all connected clients
    //   io.emit("hello", "world");
    // to all connected clients in the "news" room
    //   io.to("news").emit("hello", "world");
    // to all in a namespace
    //   io.of("/the-namespace").timeout(5000).emit("hello", "world", (err, responses) => {
    //     
    //   });
    //   io.to("room1").to("room2").to("room3").emit("some event");
    //   io.except("some room").emit("some event");


}