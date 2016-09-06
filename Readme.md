# hapi-cas

This module provides a [Hapi framework][hapi] authentication plugin which
implements [CAS][cas] authentication. This module requires a session manger
plugin to be registered with the Hapi server under which the *hapi-cas* plugin
is registered. The [hapi-server-session][hss] is known to work.

The API is fully documented via [jsdoc][jsdoc] in the [doc directory](doc/).

[hapi]: http://hapijs.com/
[cas]: http://jasig.github.io/cas/
[hss]: https://www.npmjs.com/package/hapi-server-session
[jsdoc]: http://usejsdoc.org/

# Install

```bash
$ npm install --save --production hapi-cas
```
 
# Example

A fully working example is provided as test case in the [test directory](test/).

```javascript
const hapi = require('hapi');
const server = new hapi.Server();
server.connection({
  host: 'localhost',
  address: '127.0.0.1',
  port: 8080
});

server.register(require('hapi-cas'), (err) => {
    const options = {
      casServerUrl: 'https://example.com/cas/',
      localAppUrl: 'https://127.0.0.1:8080',
      endPointPath: '/casHandler'
    };
    server.auth.strategy('casauth', 'cas', options);
  }
);

// https://github.com/hapijs/discuss/issues/349
setImmediate(() => {
  server.route({
    method: 'GET',
    path: '/foo',
    handler: function (request, reply) {
      // "username" would have been set from the XML returned by
      // the remote CAS server
      return reply(null, `username = ${request.session.username}`);
    },
    config: {
      auth: {
        strategy: 'casauth'
      }
    }
  });
})
```

# License

[MIT License](http://jsumners.mit-license.org/)
