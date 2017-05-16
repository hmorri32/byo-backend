const express       = require('express');
const app           = express();
const path          = require('path');
const bodyParser    = require('body-parser');
const favicon       = require('serve-favicon');
const routes        = require('./routes/index');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

const server = app.listen(app.get('port'), () => {
  console.log('Magic happens on port ' + server.address().port);
});

