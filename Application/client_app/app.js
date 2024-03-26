const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')


const app = express();
app.use(session({
secret: 'secret',
resave: true,
saveUninitialized: true
}));

// all environments
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// add views types and path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../../docDyn/public')));




// include ROUTES && API

const home_router = require('./routes/home');
app.use('/', home_router);

const order_client_router = require('./routes/order_client');
app.use('/', order_client_router);


const order_client_api = require('./routes/order_client_api');
app.use('/api', order_client_api);


const print_api = require('./routes/print_api');
app.use('/api', print_api);


const api = require('./routes/api');
app.use('/api', api);

// include ROUTES

/*const category_router = require('./routes/category');
app.use('/', category_router);


const option_router = require('./routes/option');
app.use('/', option_router);


const option_cat_router = require('./routes/option_cat');
app.use('/', option_cat_router);


const order_client_router = require('./routes/order_client');
app.use('/', order_client_router);


const privilege_router = require('./routes/privilege');
app.use('/', privilege_router);


const product_router = require('./routes/product');
app.use('/', product_router);


const product_detail_router = require('./routes/product_detail');
app.use('/', product_detail_router);


const product_option_router = require('./routes/product_option');
app.use('/', product_option_router);


const user_router = require('./routes/user');
app.use('/', user_router);

const waiting_router = require('./routes/waiting');
app.use('/', waiting_router);


const user_default_router = require('./routes/user_default');
app.use('/', user_default_router);*/


// include APIs


/*
const category_api = require('./routes/category_api');
app.use('/api', category_api);


const option_api = require('./routes/option_api');
app.use('/api', option_api);


const option_cat_api = require('./routes/option_cat_api');
app.use('/api', option_cat_api);


const order_client_api = require('./routes/order_client_api');
app.use('/api', order_client_api);


const privilege_api = require('./routes/privilege_api');
app.use('/api', privilege_api);


const product_api = require('./routes/product_api');
app.use('/api', product_api);


const product_detail_api = require('./routes/product_detail_api');
app.use('/api', product_detail_api);


const product_option_api = require('./routes/product_option_api');
app.use('/api', product_option_api);


const user_api = require('./routes/user_api');
app.use('/api', user_api);


const waiting_api = require('./routes/waiting_api');
app.use('/api', waiting_api);


const user_default_api = require('./routes/user_default_api');
app.use('/', user_default_api);
*/

console.log('http://localhost:5810');
app.listen(5810);
