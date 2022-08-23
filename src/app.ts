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
require('./config/passport.config')(passport);

const app = express();
const port = generalConfig.port || '3000'


app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (generalConfig.environment !== 'production') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(cors());
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

const jobConfig = new JobConfig();
jobConfig.run();

const server = http.createServer(app);

server.listen(port);

module.exports = {
  run: () => app
};
