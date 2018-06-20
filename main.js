'use strict';

const server = require('./src/lib/server.js');
const logger = require('./src/lib/logger');

server.start(process.env.PORT || 3000, () => logger.log(logger.INFO, `Listening on port ${process.env.PORT || 3000}`));
