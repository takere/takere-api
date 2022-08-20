import Route from "./route";

const routes: Route[] = [
  { path: '/', module: require('./api') },
  { path: '/users', module: require('./api/users.route') },
  { path: '/tasks', module: require('./api/tasks') },
  { path: '/nodes', module: require('./api/nodes') },
  { path: '/board', module: require('./api/board') },
];

module.exports = routes;
