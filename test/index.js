'use strict';

const casServer = require(__dirname + '/lib/casServer');

const hapi = require('hapi');
const server = new hapi.Server();
server.connection({
  host: 'localhost',
  address: '127.0.0.1',
  port: 8080
});

server.register(
  {
    register: require('hapi-easy-session'),
    options: {
      cookie: {
        isSecure: false
      }
    }
  },
  function (err) { if (err) { throw err; } }
);

server.register(require(__dirname + '/../plugin'), (err) => {
    const options = {
      casServerUrl: 'http://127.0.0.1:9000',
      localAppUrl: 'http://127.0.0.1:8080',
      endPointPath: '/casHandler',
      saveRawCAS: true
    };
    server.auth.strategy('casauth', 'cas', options);
  }
);

setImmediate(() => {
  server.route({
    method: 'GET',
    path: '/foo',
    handler: function (request, reply) {
      return reply(request.session);
    },
    config: {
      auth: {
        strategy: 'casauth'
      }
    }
  });
});

function testServerCB() {
  console.log('test server started');
  const request = require('request');
  request(
    {
      url: 'http://127.0.0.1:8080/foo',
      jar: true
    },
    function (error, response, body) {
      casServer.stop(function () {
        console.log('cas server stopped');
      });
      server.stop(function () {
        console.log('test server stopped');
        const assert = require('assert');
        const json = JSON.parse(body);
        assert.equal(json.username, 'foouser');
        assert.equal(json.rawCas['user_uuid'], '1234567-ghsld');
        console.log('test is successful');
      });
    }
  );
}

casServer.start(function() {
  console.log('cas server started');
  server.start(testServerCB);
});
