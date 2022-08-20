import RouteList from "./route-list";

const TasksRoute = require("./api/tasks.route");
const UsersRoute = require("./api/users.route");

const express = require('express');
const cors = require('cors');
const passport = require('passport');

const routes: RouteList[] = [
  { path: '/users', module: new UsersRoute(express, cors, passport) },
  { path: '/tasks', module: new TasksRoute(express, cors, passport) },
  { path: '/nodes', module: require('./api/nodes') },
  { path: '/board', module: require('./api/board') },
];

module.exports = routes;
