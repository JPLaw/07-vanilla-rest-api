'use strict';

const server = module.exports = {};

const http = require('http');
const cowsay = require('cowsay');
const bodyParser = require('./body-parser.js');

// const server = module.exports = {};

const app = http.createServer((request, response) => {
  bodyParser(request)
    .then((parsedRequest) => {
        console.log('parsedRequest', parsedRequest)
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({
          date: new Date(),
        }));
        response.end();
        return undefined;
      }

      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/api/cowsay') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        const cowsayText = cowsay.say({ 
          text: parsedRequest.url.query.text,
        });
        response.write(`<section><h3><a href="api/time">Click here for current time</a></h3><pre>${cowsayText}</pre></section>`);
        response.end();
        return undefined;
      }

      if (parsedRequest.method === 'POST' && parsedRequest.url.pathname === '/api/cowsay') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(parsedRequest.body));
        response.end();
        return undefined;
      }
    
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.write('NOT FOUND');
      response.end();
      return undefined;
    })
    .catch((err) => {
      response.writeHead(400, { 'Content-Type': 'text/plain' });
      console.log(err);
      response.write('BAD REQUEST');
      response.end();
      return undefined;
    });
});
    
    
server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
