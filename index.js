const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const route = require('./routes');
const { setupWebSocketServer } = require('./configs/websocket.config');
app.use(express.json());
app.use(express.static('public'))
app.use(cors());

const server = require('http').createServer(app);

const PORT = 8000;

route(app);

app.get('/', (req, res) => {
    res.json({
        message: 'Server is running successfully',
    })
})

setupWebSocketServer(server);

mongoose.connect('mongodb://localhost:27017/tractor').then(result => {
    console.log('Connect to mongodb successfully!');
    server.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    });
}).catch(err => {
    console.log('Fail to connect to database');
});
