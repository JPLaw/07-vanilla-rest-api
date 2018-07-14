'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
// const cowsay = require('cowsay');

const apiUrl = 'http://localhost:5000/api';

beforeAll(() => server.start(5000));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('GET api/time', () => {
    it('should response with a status 200', (done) => {
      superagent.get(`${apiUrl}/time`)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toHaveProperty('date');
          done();
        });
    });
  });

  // describe('GET /cowsay', () => {
  //   const mockCow = cowsay.say({ text: 'Howdy Partner' });
  //   const mockHtml = `<section><h3><a href="api/time">Click here for current time</a></h3><pre>${mockCow}</pre></section>`; 
  //   it('should respond with status 200 and return cow HTML', () => {
  //     return superagent.get(`${apiUrl}/cowsay`)
  //       .query({ text: 'Howdy Partner' })
  //       .then((response) => {
  //         expect(response.status).toEqual(200);
  //         expect(response.text).toEqual(mockHtml);
  //       });
  //   });
  // });

  describe('POST /echo', () => {
    it('should return status 200 for successful post', () => {
      return superagent.post(`${apiUrl}/echo`)
        .send({ name: 'jenny' })
        .then((response) => {
          expect(response.body.name).toEqual('jenny');
          expect(response.status).toEqual(200);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
});

describe('INVALID request to the API', () => {
  describe('GET /cowsayPage', () => {
    it('should err out with 400 status code for not sending text in query', () => {
      return superagent.get(`${apiUrl}/cowsay`)
        .query({})
        .catch((error) => {
          expect(error.status).toEqual(400);
          expect(error).toBeTruthy();
        });
    });
  });
});
