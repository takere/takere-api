import Repositories = require('./repositories');
import Routes = require('./routes');
import JobConfig = require('./config/job.config');

const generalConfig = require('./config/general.config');
const express = require('express');
const path = require('path');
const http = require('http');
const passport = require('passport');
const morgan = require('./config/morgan.config');

const repository = new Repositories();

repository.connect();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const jQueue = require('./helpers/jobQueue');
require('./helpers/passport')(passport);

const app = express();
const port = generalConfig.port || '3000'
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (generalConfig.environment !== 'production') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// app.use(morgan(function (tokens: any, req: any, res: any) {
//   logger.info([
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms'
//   ].join(' '))
// }))




app.use(cors({
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())

const route = new Routes();
const routeList = route.routeList;

for (let route of routeList) {
  app.use(route.path, route.module.build());
}

// catch 404 and forward to error handler
// app.use(function(req: any, res: any, next: any) {
//   const err = new Error('Not Found');
//   //err.status = 404;
//   err.message = '404'
//   next(err);
// });

//Start cron jobs;
// crons.cronJobs();
const jobConfig = new JobConfig();
jobConfig.run();



// // error handler
// app.use(function(err: any, req: any, res: any, next: any) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const server = http.createServer(app);


server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);


module.exports = {
  run: () => app
};


// function onError(error: any) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }
//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;
//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       logger.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       logger.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// function onListening() {
//   const addr = server.address();
//   const bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//     logger.debug('Booming the server on ' + bind);
// }
