const express    = require('express');
const app        = express();
const path       = require('path');
const bodyParser = require('body-parser');
const favicon    = require('serve-favicon');
const routes     = require('./routes/index');
const error      = require('./helpers/error');
// const session       = require('express-session');
// const cookieParser  = require('cookie-parser');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.use(error.notFound);

if (app.get('env') === 'development') {
  app.use(error.developmentErrors);
}

const server = app.listen(app.get('port'), () => {
  console.log(`Magic happens on port ${server.address().port}`);
});