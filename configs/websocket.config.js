const socketIO = require('socket.io');
const { verifyToken } = require('../utils/auth');
const { SECRET_KEY } = require('../constants');
const TractorModel = require('../models/tractor.model')

let ioInstance;

function setupWebSocketServer(server) {
    ioInstance = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    ioInstance.use(async function (socket, next) {
        if(socket.handshake.headers.token) {
            const decoded = verifyToken(socket.handshake.headers.token, SECRET_KEY);
            socket.decoded = decoded;
            next();
        } else if(socket.handshake.headers.tractorid) {
            // Check if tractor id exist in database
            const isTractorExisted = await TractorModel.findById(socket.handshake.headers.tractorid);
            if(!isTractorExisted) {
                next(new Error('Authentication for tractor error'));
            }
            socket.tractorId = socket.handshake.headers.tractorid;
            next();
        } else {
            next(new Error('Authentication Error'))
        }
    }).on('connection', (socket) => {
        console.log('Websocket connection is established.');

        socket.on('location', (locationData) => {
            console.log('Received location update: ', locationData);
        });

        socket.on('logs', (logData) => {
            console.log('log data: ', logData);
            ioInstance.emit('clientLogs', logData);
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