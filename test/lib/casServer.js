'use strict';

const fs = require('fs');

const failedXml =
  fs.readFileSync(__dirname + '/../fixtures/validateFailure.xml').toString();
const successXml =
  fs.readFileSync(__dirname + '/../fixtures/validateSuccess.xml').toString();

const hapi = require('hapi');
const server = new hapi.Server();
server.connection({
  host: 'localhost',
  address: '127.0.0.1',
  port: 9000
});

server.route({
  method: 'GET',
  path: '/login',
  handler: function (request, reply) {
    const returnUrl = decodeURIComponent(request.query.service);
    const response = reply()
      .redirect(returnUrl + '?ticket=ST-15394')
      .header('cookie', request.headers.cookie);
    return response;
  }
});

server.route({
  method: 'GET',
  path: '/serviceValidate',
  handler: function (request, reply) {
    const returnUrl = decodeURIComponent(request.query.service);
    const ticket = request.query.ticket;
    let response;
    if (ticket !== 'ST-15394') {
      response = reply(failedXml);
    } else {
      response = reply(successXml);
    }

    return response.header('cookie', request.headers.cookie);
  }
});

module.exports = server;