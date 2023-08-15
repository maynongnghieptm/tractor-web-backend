const socketIO = require('socket.io');

let ioInstance;

function setupWebSocketServer(server) {
    ioInstance = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    ioInstance.on('connection', (socket) => {
        console.log('Websocket connection is established.');

        socket.on('location', (locationData) => {
            console.log('Received location update: ', locationData);
        })

        socket.on('disconnect', () => {
            console.log('Websocket connection closed');
        });
    })
}

function getIOInstance() {
    return ioInstance;
}

module.exports = {
    setupWebSocketServer, getIOInstance
}