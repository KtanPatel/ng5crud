var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    app = express(),
    port = process.env.port || 4000,
    config = require('./config/DB'),
    route = require('./routes/coinRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
    () => {
        console.log('Database Connected');
    },
    err => {
        console.log('Database Not Connected : ERR-' + err);
    }
);

app
    .use(bodyParser.json())
    .use(cors())
    .use('/coins', route)
    .listen(port,function(){
        console.log('Listening on PORT: %d',port);
    });