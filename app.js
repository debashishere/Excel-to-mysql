const path = require('path');
const env = process.env.NODE_ENV || 'development';

if (env == 'development') {
    require('dotenv').config({ path: path.resolve(__dirname, './src/config/config.env') });
}

const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const apiRoute = require('./src/routes/api');
const indexRoute = require('./src/routes/index');
const db = require("./src/models");
db.sequelize.sync();

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'handlebars');
//public
app.use(express.static(path.join(__dirname, '/resources/public')));
app.engine('handlebars', exphbs({
    helpers: {}
}));

global.__basedir = __dirname;


app.use('/', indexRoute)
app.use('/api', apiRoute);




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server at port ${port}`)
})