const socketIO = require('socket.io');
const { verifyToken } = require('../utils/auth');
const { SECRET_KEY } = require('../constants');
const TractorModel = require('../models/tractor.model');
const LogsModel = require('../models/logs.model');
const UserModel = require('../models/user.model');
const { KeyObject } = require('crypto');
const fs = require('fs');
const path = require('path');
let ioInstance;
let count = 0
const connectedTractors = [];
const connectedUsers = [];
let mergedLogs = []
const selectedTractor = []
let logUpdateTimer;
let logCountThreshold = 10;
const logUpdateInterval = 100;

function addTractor(tractorId) {
    connectedTractors.push(tractorId);
}

function removeTractor(tractorId) {
    const indexToRemove = connectedTractors.indexOf(tractorId);
    if (indexToRemove !== -1) {
        connectedTractors.splice(indexToRemove, 1);
    }
}

function getAllConnectedTractors() {
    return connectedTractors;
}

function addUser(userId) {
    if (!connectedUsers.includes(userId)) {

        connectedUsers.push(userId);
    }
    //  connectedUsers.push(userId);
}

function removeUser(userId) {
    const indexToRemove = connectedUsers.indexOf(userId);
    if (indexToRemove !== -1) {
        connectedUsers.splice(indexToRemove, 1);
    }
}

function getAllConnectedUsers() {
    return connectedUsers;
}

function setupWebSocketServer(server) {
    ioInstance = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    ioInstance.use(async function (socket, next) {
        if (socket.handshake.headers.token) {
            const decoded = verifyToken(socket.handshake.headers.token, SECRET_KEY);
            socket.decoded = decoded;
            socket.userId = decoded.userId
            //  console.log( socket.userId)
            addUser(decoded.userId);
            //console.log(connectedUsers)
            next();
        } else if (socket.handshake.headers.tractorid) {
            const isTractorExisted = await TractorModel.findById(socket.handshake.headers.tractorid);
            // console.log(isTractorExisted.tractorId)
            if (!isTractorExisted) {
                next(new Error('Authentication for tractor error'));
            }
            socket.tractorId = socket.handshake.headers.tractorid;
            socket.tractorName = isTractorExisted.tractorId
            addTractor(socket.tractorId);
            next();
        } else {
            next(new Error('Authentication Error'))
        }
    }).on('connection', (socket) => {
        // logDataCount++;
        socket.on('location', (locationData) => {
        });

        socket.on(`${socket.tractorId}-logs`, async (logData) => {
            const jsonLogData = JSON.parse(logData);
            console.log(`${socket.tractorId}-logs`)
            const logs = JSON.parse(jsonLogData.logs);
            const JSON_log = {
                "tractorId": jsonLogData.tractorId,
                "tractorName": socket.tractorName,
                "data": logs
            }
            mergedLogs.push(JSON_log);
            const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
            //  const currentTime = new Date().toISOString().slice(11, 19); // HH:mm:ss
            const fileName = `logs_${currentDate}.json`;
            const filePath = path.join('D:\\Store_logs', fileName);
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '', 'utf8', function (err) {
                    if (err) throw err;
                });
            }

            //  const Logs = mergedLogs.filter(log => log.tractorId.includes(socket.tractorId))
            const jsonString = JSON.stringify(JSON_log);
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }
                const fileContent = data.trim() === '' ? jsonString : `\n${jsonString}`;
                fs.appendFile(filePath, fileContent, (appendErr) => {
                    if (appendErr) {
                        console.error('Error appending to file:', appendErr);
                    } else {
                        console.log('Data appended to file successfully.');
                    }
                });
            });
            const tractor = await TractorModel.findOne({ _id: socket.tractorId });
            // console.log('TRACTOR: ', tractor);
            // console.log(socket.tractorId)
            // count++
            //console.log("," + count);

            //  console.log(`${socket.tractorId}-${userId}`);
            //  console.log(`${socket.tractorId}-${userId}`+ "," + count );
            //console.log(`${socket.tractorId}-${userId}`)
            ioInstance.emit(`${socket.tractorId}`, jsonLogData);


            await LogsModel.create({
                tractorId: socket.tractorId,
                log: jsonLogData.logs,
                missionId: jsonLogData.missionId,
            });
        });

        for (const userId of connectedUsers) {
            for (const tractorId of connectedTractors) {
                socket.on(`${userId}-${tractorId}-ack`, (message) => {
                    //   console.log('Ack message: ', message);
                }
                )
            }
        }
        socket.on(`${socket.userId}-get-logs`, (requestedTractorIds) => {
            const data = {
                "userId": socket.userId,
                "tractor": requestedTractorIds
            }
            if (!selectedTractor.some(item => item.tractorId === data.userId)) {
                selectedTractor.push(data);
            }
            //   console.log(requestedTractorIds);
        });
        socket.on('disconnect', () => {
            removeTractor(socket.tractorId);
        });
    });

    //
    logUpdateTimer = setInterval(() => {
        if (mergedLogs.length > connectedTractors.length - 1) {
            // console.log(selectedTractor.length)
            selectedTractor.forEach(userTractor => {
                const userId = userTractor.userId;
                const tractorIds = userTractor.tractor;
                //console.log(userId)
                //console.log(tractorIds)
                const userLogs = mergedLogs.filter(log => tractorIds.includes(log.tractorId));
                if (userLogs.length > 0) {
                    //  console.log(userLogs)
                    ioInstance.emit(`${userId}-logs`, userLogs);
                    mergedLogs = mergedLogs.filter(log => !tractorIds.includes(log.tractorid));
                }
            });
            ioInstance.emit('logs', mergedLogs);
            mergedLogs.length = 0;
        }
    }, logUpdateInterval);
}

function getIOInstance() {
    return ioInstance;
}

module.exports = {
    setupWebSocketServer,
    getIOInstance,
    addTractor,
    getAllConnectedTractors,
    removeTractor,
    addUser,
    removeUser,
    getAllConnectedUsers,
};
