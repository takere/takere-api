const generalConfig = require('./config/general.config');
const express = require('express');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const passport = require('passport');
const winston = require('./helpers/logger');
// const mongoose = require('./db/mongoose');
const Repository = require('./repositories');

Repository.connect();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jQueue = require('./helpers/jobQueue');
require('./helpers/passport')(passport);

const app = express();
const port = generalConfig.port || '3000'
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan(function (tokens, req, res) {
  winston.info([
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' '))
}))
app.use(cors({
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users/users'));
app.use('/tasks', require('./routes/tasks/tasks'));
app.use('/nodes', require('./routes/nodes/nodes'));
app.use('/board', require('./routes/board/board'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Start cron jobs;
// crons.cronJobs();
jQueue.jobQueue();


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


module.exports = {
  run: () => app
};


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      winston.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      winston.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    winston.debug('Booming the server on ' + bind);
}
