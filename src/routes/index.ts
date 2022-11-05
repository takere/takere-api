import express from 'express';
import cors from 'cors';
import passport from 'passport';
import BoardRoute from "./api/board.route";
import FlowsRoute from "./api/flows.route";
import NodesRoute from "./api/nodes.route";
import UsersRoute from "./api/users.route";
import AgendaRoute from "./api/agenda.route";
import RouteList from "./route-list";
import ProgressRoute from "./api/progress.route";

class Routes {
  express: any;
  cors: any;
  passport: any;
  _routeList: RouteList[];

  constructor() {
    this.express = express;
    this.cors = cors;
    this.passport = passport;
    this._routeList = [];

    this.buildRoutes();
  }

  private buildRoutes() {
    this._routeList = [
      { path: '/users', module: new UsersRoute(this.express, this.cors, this.passport) },
      { path: '/flows', module: new FlowsRoute(this.express, this.cors, this.passport) },
      { path: '/nodes', module: new NodesRoute(this.express, this.cors, this.passport) },
      { path: '/board', module: new BoardRoute(this.express, this.cors, this.passport) },
      { path: '/agenda', module: new AgendaRoute(this.express, this.cors, this.passport) },
      { path: '/progress', module: new ProgressRoute(this.express, this.cors, this.passport) },
    ];
  }
  
  get routeList(): RouteList[] {
    return this._routeList;
  }
}

export default Routes;
