const express    = require('express');
const app        = module.exports = express();
const path       = require('path');
const bodyParser = require('body-parser');
const favicon    = require('serve-favicon');
const routes     = require('./routes/index');
const error      = require('./helpers/error');
const config     = require('dotenv').config().parsed;

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('secretKey', process.env.CLIENT_SECRET || config.CLIENT_SECRET);

app.use('/', routes);
app.use(error.notFound);

app.use(error.devErrors);

app.listen(app.get('port'));


