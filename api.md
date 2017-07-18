## Functions

<dl>
<dt><a href="#casPlugin">casPlugin(server, options)</a> ⇒ <code>object</code></dt>
<dd><p>Provides an authentication plugin for the Hapi framework that implements
CAS authentication. Due to the nature of the CAS protocol, this plugin
requires that a session manager plugin be registered with Hapi. This plugin
does not provide a session manager on its own. The &#39;hapi-server-session&#39;
plugin is known to work. But any plugin that provides
<tt>request.session</tt> will work.</p>

<p>This plugin is known to work with authentication modes &#39;required&#39; and
&#39;try&#39;.</p></dd>
<dt><a href="#register">register(server, options, next)</a> ⇒ <code>function</code></dt>
<dd><p>Standard Hapi plugin registration method. It registers <a href="#casPlugin">casPlugin</a>
with the scheme name &#39;cas&#39;.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#PluginOptions">PluginOptions</a> : <code>object</code></dt>
<dd><p>Defines the possible options for the plugin.</p></dd>
</dl>

<a name="casPlugin"></a>

## casPlugin(server, options) ⇒ <code>object</code>
<p>Provides an authentication plugin for the Hapi framework that implements
CAS authentication. Due to the nature of the CAS protocol, this plugin
requires that a session manager plugin be registered with Hapi. This plugin
does not provide a session manager on its own. The 'hapi-server-session'
plugin is known to work. But any plugin that provides
<tt>request.session</tt> will work.</p>

<p>This plugin is known to work with authentication modes 'required' and
'try'.</p>

**Kind**: global function  
**Returns**: <code>object</code> - A Hapi authentication scheme object.  
**Throws**:

- <code>AssertionError</code> When an invalid options object is provided or if
 there isn't a session manager registered with the Hapi server.


| Param | Type | Description |
| --- | --- | --- |
| server | <code>object</code> | A Hapi server instance. |
| options | <code>[PluginOptions](#PluginOptions)</code> | The options for the CAS authentication plugin. |

<a name="register"></a>

## register(server, options, next) ⇒ <code>function</code>
Standard Hapi plugin registration method. It registers [casPlugin](#casPlugin)
with the scheme name 'cas'.

**Kind**: global function  
**Returns**: <code>function</code> - The registration finished callback function.  

| Param | Type | Description |
| --- | --- | --- |
| server | <code>object</code> | A Hapi server instance. |
| options | <code>object</code> | A Hapi plugin registration options object. |
| next | <code>function</code> | The Hapi registration finished callback function. |

<a name="PluginOptions"></a>

## PluginOptions : <code>object</code>
<p>Defines the possible options for the plugin.</p>

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| casServerUrl | <code>string</code> |  | The URL for the remote CAS server. It  <em>should</em> be an HTTPS URL. But it <em>can</em> be HTTP if the remote  server isn't fully protocol compliant.  Example: <tt>https://example.com/cas/</tt> |
| casProtocolVersion | <code>number</code> | <code>2.0</code> | The version of the CAS protocol  that the remote server implements. |
| casRequestMethod | <code>string</code> | <code>&quot;GET&quot;</code> | The HTTP method that the remote  CAS server should use to communicate with the local CAS handler end point.  <strong>NOTE:</strong> only <em>GET</em> is currently supported. |
| casAsGateway | <code>boolean</code> | <code>false</code> | Indicates if the remote CAS server  should use its gateway method of operation. |
| localAppUrl | <code>string</code> |  | The base URL for your local applications. It  <em>should</em> be an HTTPS URL. But it <em>can</em> be HTTP if the remote  server isn't fully protocol compliant.  Example: <tt>https://app.example.com/</tt> |
| endPointPath | <code>string</code> |  | The URI path where your application will  listen for incoming CAS protocol messages. Example: <tt>/casHandler</tt> |
| includeHeaders | <code>array</code> | <code>[&#x27;cookie&#x27;]</code> | The headers to include in  redirections. This list <em>must</em> include the header your session  manager uses for tracking session identifiers. |
| strictSSL | <code>boolean</code> | <code>true</code> | Determines if the client will require  valid remote SSL certificates or not. |
| saveRawCAS | <code>boolean</code> | <code>false</code> | If true the CAS result will be  saved into session.rawCas |
| sessionCredentialsMappings | <code>Array</code> |  | An array of arrays where the values of the attribute of <code>request.session</code> listed in <code>array[0]</code> will be mapped to the attribute of <code>request.auth.credentials</code> listed in <code>array[1]</code>.  For example, if <code>sessionCredentialsMappings</code> contains <code>['foo.bar', 'baz']</code> then <code>request.auth.credentials.baz</code> will contain the same data as <code>request.session.foo.bar</code>. <strong>NOTE</strong>: dot notation in the array elements is supported. |
| logger | <code>object</code> |  | An instance of a logger that conforms  to the Log4j interface. We recommend [https://npm.im/pino](https://npm.im/pino) |

