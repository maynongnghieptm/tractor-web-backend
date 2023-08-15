const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const route = require('./routes');
const { setupWebSocketServer } = require('./configs/websocket.config');
const { MONGO_URI } = require('./constants');
app.use(express.json());
app.use(express.static('public'))
app.use(cors());
app.use(morgan('dev'));
const server = require('http').createServer(app);

const PORT = 8000;

route(app);

app.get('/', (req, res) => {
    res.json({
        message: 'Server is running successfully',
    })
})

setupWebSocketServer(server);

mongoose.set('debug', true);
mongoose.set('debug', { color: true });
mongoose.connect(MONGO_URI, { 
        maxPoolSize: 50 
    })
    .then(result => {
        console.log('Connect to mongodb successfully!');
        server.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    }).catch(err => {
        console.log('Fail to connect to database');
    });
