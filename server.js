// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

// Set up CORS Anywhere
var cors_proxy = require('./lib/cors-anywhere');

// Create and start the server
cors_proxy.createServer({
  originBlacklist: [],  // Disable the blacklist (allow all origins)
  originWhitelist: [],  // Disable the whitelist (allow all origins)
  
  // Remove the requirement for 'origin' and 'x-requested-with' headers
  requireHeader: [],

  // Remove headers like cookies to prevent forwarding sensitive information
  removeHeaders: [
    'cookie',
    'cookie2',
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time'
  ],

  // Redirect same-origin requests
  redirectSameOrigin: true,

  httpProxyOptions: {
    xfwd: false,  // Disable forwarding headers (like X-Forwarded-For)
  }
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});
