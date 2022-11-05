/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import express from 'express';
import * as core from 'express-serve-static-core';
import path from 'path';
import http from 'http';
import passport from 'passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import JobConfig from'./config/job.config';
import generalConfig from './config/general.config';
import { jwtStrategy, localStrategy } from './config/passport.config';
import Repositories from './repositories';
import Routes from './routes';
import { successHandler, errorHandler } from './filters/http-exception.filter';
import UserService from './services/user.service';


class App {
  
  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly instance: core.Express;
  private readonly port: string;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.instance = express();
    this.port = this.initializePort();
  }
  

  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  private initializePort(): string {
    return generalConfig.port || '3000';
  }

  public run(): core.Express {
    this.initializeRepositories();
    this.setUp();
    this.runJobs();
    this.runServer();

    return this.instance;
  }

  private initializeRepositories() {
    const repository = new Repositories();
  
    repository.connect();
  }

  private setUp() {
    this.setUpPort();
    this.setUpLogger();
    this.setUpCors();
    this.setUpBodyParser();
    this.setUpCookies();
    this.setUpPublicDirectory();
    this.setUpPassport();
    this.setUpRoutes();
  }

  private setUpPort() {
    this.instance.set('port', this.port);
  }
  
  private setUpLogger() {
    if (generalConfig.environment !== 'production') {
      this.instance.use(successHandler);
      this.instance.use(errorHandler);
    }
  }
  
  private setUpCors() {
    this.instance.use(cors());
  }

  private setUpBodyParser() {
    this.instance.use(bodyParser.json());
    this.instance.use(bodyParser.urlencoded({ extended: false }));
  }
  
  private setUpCookies() {
    this.instance.use(cookieParser());
  }
  
  private setUpPublicDirectory() {
    this.instance.use(express.static(path.join(__dirname, 'public')));
  }

  private setUpPassport() {
    this.instance.use(passport.initialize());
    passport.use('jwt', jwtStrategy);
    passport.use('local', localStrategy);
    passport.serializeUser((user: any, done: any) => done(null, user.id));
    passport.deserializeUser((id: any, done: any) => {
      const userService = new UserService();
  
      return done(null, userService.findById(id));
    });
  }
  
  private setUpRoutes() {
    const route = new Routes();
    const routeList = route.routeList;
  
    for (let route of routeList) {
      this.instance.use(route.path, route.module.build());
    }
  }
  
  private runJobs() {
    new JobConfig().run();
  }
  
  private runServer() {
    const server = http.createServer(this.instance);
    server.listen(this.port);
  }  
}

export default App;
