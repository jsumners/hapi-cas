### 0.5.0
+ Hapi [version 15.0.1][hapi1501] made `server.register` a definitively
  asynchronous method. As a result, the test application for `hapi-cas` was
  failing and the documentation for usage was incorrect. This version updates
  the documentation to show a cheap way of avoiding [issue #6][i6].
  
  While this isn't really an issue with `hapi-cas`, it is annoying enough that
  we are bumping the release version so that you know a radical change has
  occurred.

[hapi1501]: https://github.com/hapijs/discuss/issues/349
[i6]: https://github.com/jsumners/hapi-cas/issues/6

### 0.4.0
+ Fixes an issue where the result was being sent to the client instead
  of to the server via a redirect. See [pull request 5][pr5]. Thank you
  to @mpmeyer for the fix.
+ Add a `saveRawCAS` option (default: `false`). When enabled, the parsed-to-js
  result from the remote CAS server will be added to the session as `rawCas`.
  Under normal operation, anything in the CAS response that does not conform
  to the specification is discarded. With `saveRawCAS` enabled you can deal with
  such data as you see fit. See [issue 1][i1] and [pull request 4][pr4].
  Thank you to @mpmeyer for the feature.

[pr5]: https://github.com/jsumners/hapi-cas/pull/5
[i1]: https://github.com/jsumners/hapi-cas/issues/1
[pr4]: https://github.com/jsumners/hapi-cas/pull/4

### 0.3.0
+ Update dependencies
+ Fix bug where the result was not being written to the response

### 0.2.1
+ Update dependencies

### 0.2.0
+ Expose `strictSSL` setting to enable communication with self-signed servers

### 0.1.2
+ Update dependencies
+ Switch session manager to [hapi-easy-session][hes]

[hes]: https://www.npmjs.com/package/hapi-easy-session

### 0.1.1
+ Remove local package references
