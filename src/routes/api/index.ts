/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import UsersRoute from './users.route';
import FlowsRoute from './flows.route';
import NodesRoute from './nodes.route';
import BoardRoute from './board.route';
import AgendaRoute from './agenda.route';
import ProgressRoute from './progress.route';


const apiRoutes = [
  { path: '/agenda', module: new AgendaRoute() },
  { path: '/board', module: new BoardRoute() },
  { path: '/flows', module: new FlowsRoute() },
  { path: '/nodes', module: new NodesRoute() },
  { path: '/progress', module: new ProgressRoute() },
  { path: '/users', module: new UsersRoute() },
];

export default apiRoutes;
