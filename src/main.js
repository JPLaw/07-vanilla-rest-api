'use strict';

const server = require('./lib/server.js');
const logger = require('./lib/logger');

server.start(process.env.PORT || 3000, () => logger.log(logger.INFO, `Listening on port ${process.env.PORT || 3000}`));
