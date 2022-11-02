/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Repositories = require('./repositories');
import Routes = require('./routes');
import JobConfig = require('./config/job.config');

const generalConfig = require('./config/general.config');
const passportConfig = require('./config/passport.config');
const express = require('express');
const path = require('path');
const http = require('http');
const passport = require('passport');
const httpExceptionFilter = require('./filters/http-exception.filter');

const repository = new Repositories();

repository.connect();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//require('./config/passport.config')(passport);

const app = express();
const port = generalConfig.port || '3000'


app.set('port', port);

if (generalConfig.environment !== 'production') {
  app.use(httpExceptionFilter.successHandler);
  app.use(httpExceptionFilter.errorHandler);
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
passport.use('jwt', passportConfig.jwtStrategy);
passport.use('local', passportConfig.localStrategy);
passport.serializeUser((user: any, done: any) => done(null, user.id));
passport.deserializeUser((id: any, done: any) => {
  const UserServiceClass = require("./services/user.service");
  const userService = new UserServiceClass();
  return done(null, userService.findById(id));
});




const route = new Routes();
const routeList = route.routeList;

for (let route of routeList) {
  app.use(route.path, route.module.build());
}


new JobConfig().run();

const server = http.createServer(app);

server.listen(port);

module.exports = {
  run: () => app
};
