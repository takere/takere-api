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
      { path: '/users', module: this.buildApiRoute('users') },
      { path: '/tasks', module: this.buildApiRoute('tasks') },
      { path: '/nodes', module: this.buildApiRoute('nodes') },
      { path: '/board', module: this.buildApiRoute('board') },
    ];
  }

  private buildApiRoute(name: string) {
    const className = require(`./api/${name}.route`);

    return new className(this.express, this.cors, this.passport);
  }

  get routeList(): RouteList[] {
    return this._routeList;
  }
}

export = Routes;
