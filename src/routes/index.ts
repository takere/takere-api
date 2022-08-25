import BoardRoute = require("./api/board.route");
import FlowsRoute = require("./api/flows.route");
import NodesRoute = require("./api/nodes.route");
import UsersRoute = require("./api/users.route");
import RouteList = require("./route-list");

class Routes {
  express: any;
  cors: any;
  passport: any;
  _routeList: RouteList[];

  constructor() {
    this.express = require('express');
    this.cors = require('cors');
    this.passport = require('passport');
    this._routeList = [];

    this.buildRoutes();
  }

  private buildRoutes() {
    this._routeList = [
      { path: '/users', module: new UsersRoute(this.express, this.cors, this.passport) },
      { path: '/flows', module: new FlowsRoute(this.express, this.cors, this.passport) },
      { path: '/nodes', module: new NodesRoute(this.express, this.cors, this.passport) },
      { path: '/board', module: new BoardRoute(this.express, this.cors, this.passport) },
    ];
  }
  
  get routeList(): RouteList[] {
    return this._routeList;
  }
}

export = Routes;
