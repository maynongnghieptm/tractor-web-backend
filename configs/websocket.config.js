const socketIO = require('socket.io');
const { verifyToken } = require('../utils/auth');
const { SECRET_KEY } = require('../constants');
const TractorModel = require('../models/tractor.model');
const LogsModel = require('../models/logs.model');
const UserModel = require('../models/user.model');

let ioInstance;

const connectedTractors = [];

function addTractor(tractorId) {
    connectedTractors.push(tractorId);
}

function removeTractor(tractorId) {
    const indexToRemove = connectedTractors.indexOf(tractorId);
    if(indexToRemove !== -1) {
        connectedTractors.splice(indexToRemove, 1);
    }
}

function getAllConnectedTractors() {
    return connectedTractors;
}

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
            console.log(isTractorExisted);
            if(!isTractorExisted) {
                next(new Error('Authentication for tractor error'));
            }
            socket.tractorId = socket.handshake.headers.tractorid;
            addTractor(socket.tractorId);
            next();
        } else {
            next(new Error('Authentication Error'))
        }
    }).on('connection', (socket) => {
        console.log('Websocket connection is established.');

        socket.on('location', (locationData) => {
            console.log('Received location update: ', locationData);
        });
        console.log(`${socket.tractorId}-logs`)
        socket.on(`${socket.tractorId}-logs`, async (logData) => {
            const jsonLogData = JSON.parse(logData);
            console.log(jsonLogData);
            const tractor = await TractorModel.findOne({ _id: socket.tractorId });
            console.log('TRACTOR: ', tractor);
            if(tractor?.userList) {
                tractor.userList.map((userId) => {
                    console.log(`${socket.tractorId}-${userId}`);
                    ioInstance.emit(`${socket.tractorId}-${userId}`, jsonLogData);
                })
            }

            await LogsModel.create({
                tractorId: socket.tractorId,
                log: jsonLogData.logs,
                missionId: jsonLogData.missionId,
            });
        })

        socket.on('disconnect', () => {
            console.log('Websocket connection closed');
            removeTractor(socket.tractorId);
        });
    })
}

function getIOInstance() {
    return ioInstance;
}

module.exports = {
    setupWebSocketServer, getIOInstance, addTractor, getAllConnectedTractors, removeTractor,
}