'use strict';

const url = require('url');
const queryString = require('querystring');

module.exports = function bodyParse(request) {
  return new Promise((resolve, reject) => {
    request.url = url.parse(request.url);
    request.url.query = queryString.parse(request.url.query);

    if (request.method !== 'POST' && request.method !== 'PUT') {
      return resolve(request);
    }

    let message = ' ';
    request.on('data', (data) => {
      message += data.toString();
    });

    request.on('end', () => {
      try {
        request.body = JSON.parse(message);
        return resolve(request);
      } catch (error) {
        return reject(error);
      }
    });

    request.on('error', error => reject(error));
    return undefined;
  });
};
