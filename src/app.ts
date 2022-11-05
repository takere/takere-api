/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Repositories from './repositories';
import Routes from './routes';
import JobConfig from'./config/job.config';

import generalConfig from './config/general.config';
import { jwtStrategy, localStrategy } from './config/passport.config';
import express from 'express';
import path from 'path';
import http from 'http';
import passport from 'passport';
import { successHandler, errorHandler } from './filters/http-exception.filter';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const repository = new Repositories();

repository.connect();


const app = express();
const port = generalConfig.port || '3000'


app.set('port', port);

if (generalConfig.environment !== 'production') {
  app.use(successHandler);
  app.use(errorHandler);
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
passport.use('jwt', jwtStrategy);
passport.use('local', localStrategy);
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

export default app;