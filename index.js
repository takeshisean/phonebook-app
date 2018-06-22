const express = require('express');
const app = express();
const db = require('./db');

require('dotenv').config();
global.__root = __dirname + '/';

const port = process.env.PORT || 3000;

//Setting up CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.get('/', (req, res) => {
//     res.status(200).send('My phone book app.');
// })

const UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);

const server = app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
