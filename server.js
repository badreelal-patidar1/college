var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
const logger = require('morgan');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true)
    next();
});
app.use(express.static('./public'));
const routes = require('./Routes/routes');

//  Connect all our routes to our application
app.use('/', routes);

app.listen(3000, function () {
    console.log('Application listening on port 3000!');
});