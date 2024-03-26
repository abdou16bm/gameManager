const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
// const cors = require('cors')




const app = express();

app.use(session({
secret: 'secret',
resave: true,
saveUninitialized: true
}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// app.use(cors());

// all environments
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// add views types and path
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../docDyn')));

// include ROUTES && API

const print_api = require('./routes/print_api');
app.use('/api', print_api);

console.log('http://localhost:6601');
app.listen(6601);
