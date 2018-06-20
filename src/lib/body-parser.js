'use strict';

const url = require('url');
const queryString = require('querystring');

module.exports = function bodyParse(request) {
  return new Promise((resolve, reject) => {
    console.log(request.url, 'BEFORE PARSING');
    request.url = url.parse(request.url);
    request.url.query = queryString.parse(request.url.query);
    console.log(request, 'request');
    console.log(request.url, 'REQUEST.URL');

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
      } catch (err) {
        return reject(err);
      }
    });

    request.on('error', err => reject(err));
    return undefined;
  });
};
